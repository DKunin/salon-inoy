define(['flight/lib/component','flight/lib/utils'],function (defineComponent, utils) {
  'use strict';
  function FoldersList() {
    this.defaultAttrs({
      'defaultStickClass':'stuck',
      'defaultPosition':'before',
      'wait':500
    });
    this.bruteForceRepaintForStupidAssShitSafari = function(){
      document.body.style.display='none';
      document.body.offsetHeight; // no need to store this anywhere, the reference is enough
      document.body.style.display='block';
    }

    this.toggleClass = function(yes) {
      var cl = this.attr.defaultStickClass;
      var attr = this.attr;
      if(yes) {
        this.$node.addClass(cl);
        attr.$stickel.addClass(cl);
        //this.bruteForceRepaintForStupidAssShitSafari();
        setTimeout(function(){
          attr.objToToggle&&attr.objToToggle.addClass('shown');
        },500)
        this.trigger(document, 'scrolledFromTop');
      } else {
        this.$node.removeClass(cl); 
        attr.$stickel.removeClass(cl);

        // 
        attr.objToToggle&&attr.objToToggle.removeClass('shown');
      }
    }; 

    // this.slug = utils.throttle(function(dun){
    //   // this.off(document, 'scrollstop');
    //   // this.on(document, 'scrollstop', function(){
    //   //   this.off(document, 'scrollstop');
    //     this.toggleClass(dun);
    //   // });
    //   // console.log('slug', dun);
    // },10);

    this.slug = function(dun){
        this.toggleClass(dun);
    }


    this.initStickiness = function(){
      this.$node[this.attr.defaultPosition]('<div class=\'sticky-widget-trigger\' id=\''+this.attr.elId+'\'></div>');
      this.attr.$stickel = $('#'+this.attr.elId);
      var cl = this.attr.defaultStickClass;
      var $node = this.$node;
      var attr = this.attr;
      var that = this;


      this.attr.$stickel.waypoint({handler:function(direction) {
        if(direction==="up"&&$('body').scrollTop()===0){
          that.bruteForceRepaintForStupidAssShitSafari();

        }
      },offset:0});



      this.attr.$stickel.waypoint({handler:function(direction) {
        if(direction==="down"){
            that.slug(true)
        } else {
            that.slug()
        }
      },offset:-80});

      this.attr.$stickel.waypoint({handler:function(direction) {
        if(direction==="down"){
            that.$node.addClass("slidedown");
            attr.$stickel.addClass("slidedown");
          } else {
            that.$node.removeClass("slidedown"); 
            attr.$stickel.removeClass("slidedown");
        }
      },offset: -160});  
      // this.attr.$stickel.waypoint({handler:function(direction) {
      //   if(direction==="up"){

      //     } 
      // },offset: -250});  

    };

    this.after('initialize', function () {
      this.attr.elId = this.node.id+"-sticky-trigger";
      this.attr.defaultPosition = this.node.dataset.stickpos||this.attr.defaultPosition;
      this.attr.objToToggle = $(this.node.dataset.scrollertrigger);
      
      if(!$(".visually_impared_version").length) {
        this.initStickiness();
      };
   });
  }
  return defineComponent(FoldersList);

});

