define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function Toggle() {
    
    this.defaultAttrs({
      link: 'a'
    });

    this.itemToggled = function(e,targ) {
      e&&e.preventDefault();
      var that = this;
      this.attr.$linker.toggleClass(this.attr.classtotoggle);
      var status = this.attr.$linker.hasClass(this.attr.classtotoggle);
      this.trigger(document, 'classToggled', {status:status})
      clearTimeout(this.attr.to)
      this.attr.to = setTimeout(function(){
        that.trigger(document, 'classToggleFinished', {status:status})
      },1500)

      // var target = targ.el.getAttribute("href");
      // if(target.indexOf("#")===-1) {
      //   return true;
      // };
      // this.toggleBlock(null,{t:target});
    };

    this.after('initialize', function () {
    this.attr.$linker = $(this.node.dataset.toggle);
    this.attr.classtotoggle = this.node.dataset.toggleclass;
    this.on(this.$node, "click", this.itemToggled);


   });
  }
  return defineComponent(Toggle);
});

