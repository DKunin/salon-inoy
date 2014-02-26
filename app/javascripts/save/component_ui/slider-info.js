define(['flight/lib/component', 'text!temp/slider-info.htm'],function (defineComponent, infoTemplate) {
  'use strict';
  
  
  function SliderInfo() {
    this.defaultAttrs({
      template: _.template(infoTemplate)
    });
    
    this.initCrumbs = function(e,d){      

      // this.$node.addClass('slideUp');

    };

    this.updateInfo= function(e, d){
      this.render(this.attr.template(d))
    };
    this.render = function(d)
    {
      this.node.innerHTML = d;
     }
    


    this.after('initialize', function () {
      this.attr.sliderid = this.node.dataset.sliderid;
      var slId = this.attr.sliderid;
      // console.log("info", slId )
 
      this.on(document, "sliderLoaded"+slId, this.updateInfo)
      this.on(document,"sliderSet"+slId,this.updateInfo)
   
   });
  }
  
  return defineComponent(SliderInfo);

});

