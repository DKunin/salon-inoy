define(['flight/lib/component'],function (defineComponent) {
  'use strict';
 
  function ModalWindow() {
    this.defaultAttrs({
      "close-btn":".close",
      "thisNode": ".widget-modal-close",
      "close-btn-opt":".close-modal",
      "data":".data-holder"
    });  
    this.openWindow = function(e,d){
      e&&e.preventDefault();
      if(d) {
        this.analizeAndLoad(d)
      }
      this.$node
        .css({opacity: 0})    
        .show()
        .animate({opacity: 1});    
    };
    this.analizeAndLoad = function(d) {
      if(d&&d.data) {
        this.renderData(d.data);
      } else if(d&&d.url) {
        this.externalData(d.url);
      };
    };
    this.renderData = function(d) {
        this.select("data").empty().append(d);
    };
    this.closeWindow = function(e){
      e&&e.preventDefault();
      var node = this.$node; 
      node.animate({opacity: 0},500,function(){
        node.hide();
      });    
    };
    this.externalData = function(url){      
      var that = this;
      require(["text!temp/"+url+".htm"], function(modaldata) {
        that.renderData(modaldata);
       });
    };


    this.after('initialize', function () {
      this.on(this.$node,'click', {
        "close-btn": this.closeWindow,
        "close-btn-opt": this.closeWindow,
        "thisNode": this.closeWindow
      });
      this.attr.modid = this.node.id;      
      this.attr.moddata = this.node.dataset.temp;
      if(this.attr.moddata) {
        this.externalData(this.attr.moddata);
      };
      
      this.on(document, this.attr.modid +"modalOpen" , this.openWindow)
      this.on("openModal" , this.openWindow);

   });
  }

  return defineComponent(ModalWindow);
});

