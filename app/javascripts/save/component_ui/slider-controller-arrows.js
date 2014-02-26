define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  
  function SliderController() {
    this.defaultAttrs({
      "trigger":"a"
    });
    this.adjustArrows = function(e,d){
      if(d.curActive===0) {
        this.$node.addClass('first-slide');
      } else {
        this.$node.removeClass('first-slide');
      }
      if(d.curActive===(d.slides-1)) {
        this.$node.addClass('last-slide');
      } else {
        this.$node.removeClass('last-slide');
      }
    }
    this.adustVisibility = function(e,d){
      if(d.count<=1) {
        this.node.style.display = "none";
      } else {
        this.node.style.display = "block";
      }
    }
    this.moveSlider= function(e, t){
      e&e.preventDefault();
      e&e.stopPropagation();
      var dir = (t.el.getAttribute('href')==="#next");
      this.trigger(document, "sliderUpdateMove"+ this.attr.sliderid , {dir:dir})
    };

    this.after('initialize', function () {
      this.attr.sliderid = this.node.dataset.sliderid;
      var slId = this.attr.sliderid;
      this.on(document, "sliderLoaded"+slId, this.adjustArrows)
      this.on(document,'sliderNumberOfPhotos',this.adustVisibility);
      this.on(this.$node,"click",{
        "trigger":this.moveSlider
      });
      this.on(document,"sliderSet"+slId,this.adjustArrows)
   
   });
  }
  
  return defineComponent(SliderController);

});

