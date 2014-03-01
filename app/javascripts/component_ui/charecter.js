define(['flight/lib/component','settings/map','settings/cases'],function (defineComponent,map, NPC) {
  'use strict';
  
  function Charecter() {
    this.defaultAttrs({
      characters:[],
      curChar:'',
      'characterDom':'.char'
    });
      var char = {
        width: 32,
        height: 45,
        step: 32,
        bg: "images/manager-sprite.png",
        speed: 170,
        paused: false,
        goAway: function(storm){
            var cod = this.id;
            $(document).trigger('removeNPCFromMap',{code:cod});
            if(storm) {
               $(document).trigger("remoteAction",{action:"stormOut",code:this.id});
            };
        },
        timer: function(){
          if(!this.patience) {
            this.patience = 45;
          };
          this.patience--;
          if(this.patience<=0) {
            this.goAway();
          };
        },
        init: function(){
          this.setTimer();
        },  
        setTimer: function(){
          this.paused = false;
          //this.interval = setInterval(this.timer.bind(this),1000);
        },
        pause: function(){
          clearInterval(this.interval);
          this.paused = true;
        },
        finish: function(){
          this.pause();
          delete this;
        },
        checkOnMyself: function(){
          if(this.patience<0) {
            this.goAway(true);
          }
        }
      };
      this.curChar = function(){
        return this.attr.curChar;
      };
      this.$char = function(){
        return this.attr.curChar.$char;
      };
      this.$positionY = function(){
        return this.attr.curChar.posY;
      };
      this.$positionX = function(){
        return this.attr.curChar.posX;
      };
      
      this.selectCur = function(e){
        var s = e.target.dataset&&e.target.dataset.id;             
        this.attr.curChar = _.find(this.attr.characters,function(c){return c.id===s});
        this.attr.curChar.$char.addClass('curChar');               
      };

      this.createDom = function(id,pos,bg){
          var opts = NPC.npc[id]?NPC.npc[id].options:{};
          var newGuy = _.extend({},char,{position: pos,id:id},{bg:bg||'images/manager-sprite.png'},opts);
          this.$node.append('<div class="char" data-id="'+id+'"></div>');
          var isMain = (id==="main")
          newGuy.$char = $('.char[data-id=\''+id+'\']');
          newGuy.posX = isMain?pos[0]:0;//pos[0];
          newGuy.posY = isMain?pos[1]:7;//pos[1];          
          //char.position = pos;   
          var that = this;
          newGuy.$char.css({
                  'width': newGuy.width,
                  'height': newGuy.height,
                  'position': 'absolute',
                  'left': newGuy.step * newGuy.posX,
                  'top': newGuy.step * newGuy.posY,
                  'marginTop': -newGuy.height + (map.slotSize / 2),
                  'backgroundImage': 'url(' + newGuy.bg + ')'
                });
          this.attr.characters.push(newGuy);
          this.removeAllChecked();
          if(id==="main") {
            this.attr.curChar = newGuy;
            map.colision[pos[1]][pos[0]] = id;    
            this.updateZone(id, [pos[1],pos[0]]);  
          } else {
            this.autoMove(null,{coords:{x:pos[0],y:pos[1]}},newGuy);         
            newGuy.init(id);
          };
      };

      this.removeAllChecked = function(){
        var ar = this.attr.characters;
        var l = ar.length;
        for(var i =0;i<l;i++) {
          ar[i].$char.removeClass('curChar');
        };

      };
      function charPosition() {
        // for (var $i = 0; $i < map.colision.length; $i++) {
        //   for (var $j = 0; $j < map.colision[0].length; $j++) {
        //     if (map.colision[$i][$j] == '*') {
        //       //$('.char-position').html("[ Y: " + $i + " ]" + "[ X: " + $j + " ]");
        //       //console.log({x:$j,y:$i})
        //       // emitter.emit('save-charecter-position',{x:$j,y:$i});
        //     }
        //   }
        // }    
      };
      // //charPosition();

      this.charSprite = function(spriteY, charMove) {
        var that = this;
        var $char = charMove.$char;
        $char.css({
          'backgroundPosition': '-96px ' + spriteY,
        });
        setTimeout(function() {
          $char.css({
            'backgroundPosition': '-64px ' + spriteY,
          });
        }, 50);
        setTimeout(function() {
          $char.css({
            'backgroundPosition': '-32px ' + spriteY,
          });
        }, 100);
        setTimeout(function() {
          $char.css({
            'backgroundPosition': '-0px ' + spriteY,
          });
        }, 150);
      };
      var Right = {
        
      };

      this.clearZone = function(charId) {
         var l = map.zone.length;
        for(var i=0;i<l;i++) {
            for(var ii=0,ll=map.zone[i].length;ii<ll;ii++) {
              var ind = map.zone[i][ii].indexOf(charId);
              if(ind!=-1) {
                map.zone[i][ii].splice(ind,1);
              };
            };
          };
      };
      this.clearCollision = function(charId) {
         var l = map.colision.length;
        for(var i=0;i<l;i++) {
            for(var ii=0,ll=map.colision[i].length;ii<ll;ii++) {
              if(map.colision[i][ii]===charId) {
                map.colision[i][ii] = 0;
              };
            };
          };

      };      
      this.updateZone = function(charId, coord) {
        var l = map.zone.length;
        var x = coord[0];
        var y = coord[1];
        //Clear zone;
        this.clearZone(charId);
        var updateCell = function(x,y) {
          if(map.zone[x][y]==0) {
            map.zone[x][y].push(charId);
          };
        };
        updateCell(x,y);
        for(var i=1;i<2;i++) {
          updateCell(x,y);
          updateCell(x-i,y);
          updateCell(x+i,y);
          for(var ii=1;ii<2;ii++) {
            updateCell(x,y-ii);
            updateCell(x-i,y-ii);
            updateCell(x-i,y+ii);

            updateCell(x+i,y-ii);
            updateCell(x+i,y+ii);
            updateCell(x,y+ii);
          };
        };

        //Debugging for map
        for(var i=0,l=map.zone.length;i<l;i++) {
          //console.log(map.zone[i].join(' '))
        };
      };

      var t;
      this.checkZoneCollision = function(id,x,y) {
        this.trigger(document, 'remoteAction',{'action':'disengage'})
        var z = map.zone[x][y];
        if((z.length>1||z[0]!=0)&&id==="main") {          
          t&&clearTimeout(t);
          var that = this;
          t = setTimeout(function(){
            that.trigger(document,"zoneCollision",{chars:z});
          },500);
        };
        // var l = map.zone.length;
        // for(var i=0;i<l;i++) {
        //   console.log(map.zone[i].join(' '))
        // };
      };

      this.movingRight = function(charMove){
        var deferred = $.Deferred();
        var x = charMove.posX;
        var y = charMove.posY;
        if (map.colision[y][x + 1] === 0) {
          map.colision[y][x] = 0;
          charMove.posX = ++x;
          map.colision[y][x] = charMove.id;
          this.checkZoneCollision(charMove.id,y,x);
          
          this.updateZone(charMove.id,[y,x]);
          charMove.$char.animate({
            'left': '-=' + -char.step,
          }, charMove.speed, function(){

            //charPosition();
            
          });
          this.charSprite('-98px',charMove);
          deferred.resolve(true);
        }  else {
          deferred.resolve(false);
        }
        return deferred.promise();
      };

      this.movingLeft = function(charMove){
        var deferred = $.Deferred();
        var x = charMove.posX;
        var y = charMove.posY;
        var that = this;
        if (map.colision[y][x - 1] === 0) {
          map.colision[y][x] = 0;
          charMove.posX = --x;
          map.colision[y][x] = charMove.id;
          this.updateZone(charMove.id,[y,x]);
          this.checkZoneCollision(charMove.id,y,x);
          this.charSprite('-50px',charMove);
          charMove.$char.animate({
            'left': '+=' + -char.step,
          }, charMove.speed, function(){

            deferred.resolve(true);
            
          });
          //charPosition();
        } else {
          deferred.resolve(false);
        }
        return deferred.promise();
      };
      this.movingDown = function(charMove){
        var deferred = $.Deferred();
        var x = charMove.posX;
        var y = charMove.posY;
        var that = this;
        if (map.colision[y + 1][x] === 0) {
          map.colision[y][x] = 0;
          charMove.posY = ++y;
          map.colision[y][x] = charMove.id;
          this.updateZone(charMove.id,[y,x]);
          this.checkZoneCollision(charMove.id,y,x);
          this.charSprite('0px',charMove);
          charMove.$char.animate({
            'top': '-=' + -char.step,
          }, charMove.speed, function(){

            deferred.resolve(true);
            
          });
          //charPosition();
        } else {
          deferred.resolve(false);
        }
        return deferred.promise();
      };
      this.movingUp = function(charMove){
        var deferred = $.Deferred();
        var x = charMove.posX;
        var y = charMove.posY;
        var that = this;
        if (map.colision[y - 1][x] === 0) {
          map.colision[y][x] = 0;
          charMove.posY = --y;
          map.colision[y][x] = charMove.id;
          this.updateZone(charMove.id,[y,x]);
          this.checkZoneCollision(charMove.id,y,x);
          this.charSprite('-146px',charMove);
          charMove.$char.animate({
            'top': '+=' + -char.step,
          }, charMove.speed, function(){

            deferred.resolve(true);
            
          });
          //charPosition();
        } else {
          deferred.resolve(false);
        }
        return deferred.promise();
      };




    this.selfMove = function(){
        var ar = this.attr.characters;
        var l = ar.length;
        var that = this;
        for(var i =0;i<l;i++) {
          that["movingRight"](ar[i]);
        };
    };

    this.autoMove = function(e,d,char){
      var dest = [d.coords.x-1, d.coords.y-1];
      var curChar = char||this.attr.curChar;   
      if(curChar.charDeff) {
        return false;
      };
      curChar.charDeff = $.Deferred();
      var finishMove = function(ret){
        if(ret) {
          moveCycle(dest,curChar); 
        };
      };  
      function moveCycle(destAr,cC){
        if(!destAr||!cC) {
          return false;
        };
        var matrix = map.colision;
        var grid = new PF.Grid(matrix[0].length,matrix.length, matrix);
        var path = Finder.findPath(cC.posX,cC.posY,destAr[0], destAr[1], grid);
        if(path.length>=2) {
          var xDiff = path[0][0] - path[1][0];
          var yDiff = path[0][1] - path[1][1];
          if(xDiff<0) {this['movingRight'](cC).done(finishMove.bind(this));}
          if(xDiff>0) {this['movingLeft'](cC).done(finishMove.bind(this));}
          if(yDiff<0) {this['movingDown'](cC).done(finishMove.bind(this));}
          if(yDiff>0) {this['movingUp'](cC).done(finishMove.bind(this));}

        } else {
          curChar.charDeff.resolve(true);
          curChar.charDeff = undefined;
        };
      };
      var moveCycle = moveCycle.bind(this); 
      moveCycle(dest,curChar);
      return curChar.charDeff?curChar.charDeff.promise():{done:function(cb){cb()}};
    };

    this.movePath = function(e,obj) {
      var c = obj.code;      
      var chara = _.find(this.attr.characters,function(r){return r.id===c});
      this.autoMove(null,{coords:{x:obj.x,y:obj.y}},chara);
    };
    this.holdCustomer = function(e,obj){
      var c = obj.code;
      var chara = _.find(this.attr.characters,function(r){return r.id===c});      
      chara.pause();
    };
    this.selectTile = function(num) {
      this.attr.tiles.eq((num[0]*20)+num[1]).css("opacity",".2");
    };
    this.restoreTimers = function(){
      for(var i=0,l=this.attr.characters.length;i<l;i++) {
        if(this.attr.characters[i].paused) {
          this.attr.characters[i].setTimer();
        };
      };
    };
    this.removeChar = function(e,obj){
      var c = obj.code;
      var chara = _.find(this.attr.characters,function(r){return r.id===c});
      this.autoMove(null,{coords:{x:1,y:11}},chara).done(function(){
        chara.$char.remove();
        var ind = this.attr.characters.indexOf(chara);
        this.attr.characters.splice(ind,1);
        this.clearZone(chara.id);
        this.clearCollision(chara.id);
        chara.finish();
        chara = null;
      }.bind(this));
      //Добавить очистку зон;
    };
    this.everyBodyFlee = function(){
      for(var i=0,l=this.attr.characters.length;i<l;i++) {
        if(this.attr.characters[i].id!='main') {
          this.removeChar(null, {code: this.attr.characters[i].id});
        };
      };

    };
    this.updateClientState = function(e, data){
      var matters = ["patience","anger","loyalty"];
      var c = data.code;
      var sc = data.score;
      var chara = _.find(this.attr.characters,function(r){return r.id===c});
      if(!chara||!sc) return false;
      for(var i=0,l=matters.length;i<l;i++) {
        if(sc[matters[i]]) {
          if(!chara[matters[i]]) {
            chara[matters[i]] = 0;
          };
          chara[matters[i]] = chara[matters[i]] + sc[matters[i]];
        };
      };
      chara.checkOnMyself();
    };
    this.after('initialize', function () {
      var that = this;
      this.on(document,'moveChar',function(e, obj){
          if(that.$char().is(':animated')||!obj.direction) {
            return false;
          };        
          this[obj.direction](this.attr.curChar);
        });
      this.on(document,'createChar',function(e, obj){
        this.createDom(obj.id,obj.pos,obj.bg);
      });
      var that = this;
      this.on(document,'moveThis', this.selfMove);
      this.on(document,'charecter-move', this.autoMove);
      this.on(document,"removeNPCFromMap",this.removeChar);
      this.on(document,"NPCMove",this.movePath);
      this.on(document,'holdCustomerPationce',this.holdCustomer);
      this.on(document,'cbox_closed',this.restoreTimers);
      this.on(document,"updateCaseStats", this.updateClientState);
   });

  }
  return defineComponent(Charecter);
});

