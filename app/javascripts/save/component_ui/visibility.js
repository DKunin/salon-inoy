define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  
  function Visibility() {
    this.defaultAttrs({
      
    });

    this.triggerVisibility = function(e,status) {
      if(status.status) {
        this.$node.removeClass('collapsed-widget')
      } else {
        this.$node.addClass('collapsed-widget')
      }
      //this.$node.toggeClass('',status.stat)
    }


    this.after('initialize', function () {
     var initStatus = this.$node.find('li').length>0;
     //this.on(document, 'triggerVisibility:'+this.node.dataset.visible ,this.triggerVisibility);
     this.triggerVisibility(null,{status:initStatus});
   
   });
  }
  
  return defineComponent(Visibility);

});

