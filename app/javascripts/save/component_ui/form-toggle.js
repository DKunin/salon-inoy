define(['flight/lib/component'],function (defineComponent) {
  'use strict';
 
  function FormToggle() {
    this.defaultAttrs({
      'checkinputs':'input'
    });

    this.formToggled = function(e,targ) {
      //e.preventDefault();
      this.trigger(document, 'triggerVisibility:'+this.attr.aim, {status:this.$node.find('#'+this.attr.aim)[0].checked})
    }


    this.after('initialize', function () {
     this.attr.aim = this.node.dataset.trigger;     
     this.on(this.$node, "click", {
       'checkinputs':this.formToggled
     });
   });
  }

  return defineComponent(FormToggle);
});

