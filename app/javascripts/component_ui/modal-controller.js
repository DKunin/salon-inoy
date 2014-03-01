define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function ModalController() {
    this.defaultAttrs({
    modaloptions: {
      width: "90%",
      height: "80%",
      opacity: 0.5,
      closeButton: false,
      scrolling: false,
      escKey: false
    } 
  });


    this.callModal = function(e, data){
      this.trigger(document,"restartCases");
      this.restoreModal(null, data);
    };    
    this.closeModal = function(){
      $.colorbox.close();
    };
    this.restoreModal = function(e, data){
      var opts = _.extend({},this.attr.modaloptions,data);
      $.colorbox(opts);
    };

    this.after('initialize', function () {
      // this.on(this.$node, 'click',{
      //   'actionButton': this.callAction
      // });    	
    this.on(document, 'restoreModal', this.restoreModal);
    this.on(document, 'openModal', this.callModal);
    this.on(document, 'closeModal', this.closeModal);
    this.on(document,'cbox_closed', function(){ 
       //console.log("closed")
    });
  });

  }
  return defineComponent(ModalController);
});

