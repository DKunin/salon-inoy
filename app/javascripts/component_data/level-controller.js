define(['flight/lib/component'],function (defineComponent,template) {
  'use strict';
  
  function LevelController() {
    this.defaultAttrs({

   	});
    this.finishLevel =  function(){
      clearInterval(this.attr.timer);
      this.trigger(document, 'finishedLevel');

    };
    this.enterCustomer = function(name,pos){
      this.trigger(document, 'createChar',{id: name , pos:pos, bg: 'images/customer-sprite.png'});
    };
    var times=[];
    var minutes = ["00","10","20","30","40","50"];
    for(var i=9,l=18;i<l;i++) {
      for(var ii=0,ll=minutes.length;ii<ll;ii++) {
        times.push(i+":"+minutes[ii]);
      }
    };

    this.levelCycle = function(){
      if(!this.attr.second){
        this.attr.second = 0;
        this.attr.timeshown = 1;
      }; 
      this.attr.second++;
      this.attr.curLevel.events[this.attr.second]&&this.attr.curLevel.events[this.attr.second].bind(this)();
      if(this.attr.second===15) {
        this.attr.second = 1;
        if(!times[this.attr.timeshown]) {
          this.attr.timeshown = 1;  
        }
        this.trigger(document,'levelTimer',{timer: times[this.attr.timeshown]});
        this.attr.timeshown++;
      };
    };

    this.startLevelTimer = function(){
      this.attr.timer = setInterval(this.levelCycle.bind(this),1000);

    };
    this.initLevel = function(e,obj) {      
      var levelTostart = levels[obj.level];
      this.attr.curLevel = levelTostart;
      this.startLevelTimer();
    };
    this.loadCustomer = function(e, obj){
      this.enterCustomer(obj.id,obj.coord);
    };
    var levels = [
      {},{
        name: "Level1",
        namer: "1-ый день",
        events: {
          //1: function(){this.enterCustomer('customer',[5,5])},
          6000: this.finishLevel
        }

      }
    ];

    this.after('initialize', function () {
      this.on('startLevel', this.initLevel);
      this.on(document, 'loadCustomer', this.loadCustomer)

   });

  }
  return defineComponent(LevelController);
});

