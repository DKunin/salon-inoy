define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function ModalToggle() {
    
    this.defaultAttrs({
      'button':'.widget-modal-toggle'
    });
    this.modalOpen = function(e, tar){
      e&&e.preventDefault();
      // this.trigger(document, this.attr.modid +"modalOpen");

      var modid = tar.el.dataset.modalid;
      var newsid = tar.el.dataset.newsid;
      var sliderid = tar.el.dataset.sliderid;
      var imageindex = tar.el.dataset.imageindex;    
          
      var that = this;
          that.trigger(document, modid +"modalOpen");
      if(newsid&&sliderid) {
        this.trigger(document, "slliderDataRequest", {newsid:newsid, modalid: sliderid,curs:(imageindex||0)});
      };
    }

    this.after('initialize', function () {
      // this.attr.modid = this.node.dataset.modalid;
      // this.attr.newsid = this.node.dataset.newsid;
      // this.attr.sliderid = this.node.dataset.sliderid;
      // this.attr.imageindex = this.node.dataset.imageindex;
      this.on(document,'click', {
        'button': this.modalOpen
      })

   });
  }
  return defineComponent(ModalToggle);
});

