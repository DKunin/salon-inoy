define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  
  function SliderController() {
    this.defaultAttrs({
      temp: "<li>•</li>",
      lis: "li"
    });
    
    this.initCrumbs = function(e,d){      
      var that = this;
      for(var i=0;i<d.slides;i++){
        that.$node.append(this.attr.temp)
      };
      this.setCurrent(d.curActive);
      // this.$node.addClass('slideUp');

    };
    this.setCurrent = function(i){
      this.attr.selected&&this.attr.selected.removeClass("active");
      this.attr.selected = this.$node.find('li').eq(i).addClass("active");
    };
    this.changeCurrent= function(e, t){
      var i =  $(t.el).index()
      this.setCurrent(i);
      this.trigger(document,"controllerChangedSlide"+this.attr.sliderid,{number:i})
    };
    
    this.externalUpdate = function(e,d){      
      this.setCurrent(d.curActive);
    }
    this.after('initialize', function () {
      this.attr.sliderid = this.node.dataset.sliderid;
      var slId = this.attr.sliderid;
      this.on(document, "sliderLoaded"+slId, this.initCrumbs)
      this.on(this.$node,"click",{
        "lis":this.changeCurrent
      });
      this.on(document,"sliderSet"+slId,this.externalUpdate)
   
   });
  }
  
  return defineComponent(SliderController);

});

