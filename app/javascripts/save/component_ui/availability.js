define(['flight/lib/component'],function (defineComponent) {
  'use strict';

  
  function FormToggle() {
    this.defaultAttrs({
      
    });

    this.triggerVisibility = function(e,status) {
      if(status.status) {
        this.$node
          .removeAttr('disabled')
          .removeClass('disabled');
      } else {
        this.$node
          .addClass('disabled')
          .attr('disabled','disabled')
          .empty();
      }
    }

    this.after('initialize', function () {
     var initStatus = document.getElementById(this.node.dataset.visible).checked;
     this.on(document, 'triggerVisibility:'+this.node.dataset.visible ,this.triggerVisibility);
     this.triggerVisibility(null,{status:initStatus});
   
   });
  }
  
  return defineComponent(FormToggle);

});

