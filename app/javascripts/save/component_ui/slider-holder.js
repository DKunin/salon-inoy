define(['flight/lib/component', 'text!temp/slide.htm'],function (defineComponent, sliderTemp) {
  'use strict';
  function SliderHolder() {
    this.defaultAttrs({
      'container':'.',
      'thisHolder': 'widget-modal-slider',
      template: _.template(sliderTemp)
    });

    this.setSlideController = function(e,d){
      this.setSlide(d.number);
    };
    this.serializeData = function(){
      var curStD = this.$node.find('li').eq(this.attr.curStep)[0]
      var dataset = {};
      if(curStD) {
        dataset = curStD.dataset
      } else {
        dataset = this.$node.find('li').eq(0)[0];
        this.setSlide(0);
      };
      return {slides:this.attr.slidesAmount, curActive:this.attr.curStep,data:dataset};
    };
    this.setSlide = function(inc){
      var i = parseInt(inc);
      var w = this.$node.find('li').eq(i).width();
      var change = (w*i*-1);
      this.$node
        .css("-webkit-transform","translateX("+change+"px)")
        .css("-moz-transform","translateX("+change+"px)")
        .css("-ms-transform","translateX("+change+"px)")
        .css("-o-transform","translateX("+change+"px)")
        .css("transform","translateX("+change+"px)");
      this.attr.curStep = i;
      if(i==(this.attr.slidesAmount-2)||i==(this.attr.slidesAmount-1)||i==0) {
        this.trigger(document,"sliderDataUpdateRequest",{modalid:this.attr.sliderid});
      }
      this.trigger(document,"sliderSet"+this.attr.sliderid,this.serializeData());
    };
    this.stopProp = function(e){
      e&&e.stopPropagation();
    }
    this.incrementSlide = function(e,d) {
      var curStep = this.attr.curStep;
      var amount = this.attr.slidesAmount;
      curStep = d.dir?(curStep+1) % amount: (((curStep--) <= 0)?(amount - 1):curStep);
      this.setSlide(curStep);
    };

    this.updateData = function(e,d){
      var line = "";
      var numOfPhotos = d.photos.images.length;
      for(var i=0;i<numOfPhotos;i++) {
        line+=this.attr.template(_.extend({},d.photos.images[i],{date:d.photos.date}));
      };
      
      this.trigger(document,'sliderNumberOfPhotos',{count:numOfPhotos});

      $('.modal-slider-title').empty().append(d.photos.title);
      if(d.empty){
        this.$node.empty()
      }
      this.$node.append(line);
      this.renderSlider(d.empty,d.cs);
    };
    this.checkIfINeedToUpdate = function(e,d){
      if(d.gotoSlide) {
        this.setSlide(d.gotoSlide);
      }
    }
    this.renderSlider = function(e,s){
      this.attr.slidesAmount = this.$node.find('li').length;
      this.trigger(document,"sliderLoaded"+this.attr.sliderid,this.serializeData());
      var that = this;
      this.attr.gotoSlide = s;
      if(s){
        setTimeout(
          function(){
            that.setSlide(parseInt(s));
          },500)
      }
    };
    this.emptyHolder = function(){
      this.$node.empty()
    };

    this.after('initialize', function () {
      this.attr.sliderid = this.node.dataset.sliderid;
      var slId = this.attr.sliderid;
      this.attr.curStep = 0;
      this.renderSlider();
      this.on(document, "controllerChangedSlide"+slId, this.setSlideController);
      this.on(document, "sliderUpdateMove"+ slId , this.incrementSlide);
      this.on(document, "SliderDataUpdate"+slId, this.updateData);
      // this.on(document,"sliderLoaded"+slId,this.checkIfINeedToUpdate);
      this.on(this.$node,"click", this.stopProp);

      this.on(document, "slliderDataRequest", this.emptyHolder);
   });
  }
  
  return defineComponent(SliderHolder);

});
