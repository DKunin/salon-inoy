define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function Toggle() {
    this.defaultAttrs({
      toggleClass:'hidden'
    });
    this.caretInvert = function(status){
      if(!this.attr.caret) return false;
      var cn = this.attr.caret.className;
      this.attr.caret.className = status?cn.replace("inverted"):cn + " inverted";
    }

    this.formToggled = function(e,targ) {
      e.preventDefault();
      var cn = this.attr.objectToToggle.className;
      this.attr.objectToToggle.className = !this.attr.status?cn.replace(this.attr.toggleClass,''):cn + " " + this.attr.toggleClass;
      this.caretInvert(!this.attr.status);
      this.attr.status = this.checkStatus();
    }
    this.checkStatus = function(){
      return this.attr.objectToToggle.className.indexOf(this.attr.toggleClass)===-1;
    }

    this.after('initialize', function () {
     this.attr.toggleClass = this.node.dataset.toggleclass;     
     this.attr.objectToToggle = document.getElementById(this.node.dataset.toggle);
     this.attr.status = this.checkStatus();
     this.attr.caret = this.$node.find('.caret')[0];

     this.on(this.$node, "click", this.formToggled);
   });
  }
  return defineComponent(Toggle);
});

