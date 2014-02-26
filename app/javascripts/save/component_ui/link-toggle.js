define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function Toggle() {
    
    this.defaultAttrs({
      link: 'a'
    });

    this.itemToggled = function(e,targ) {
      var target = targ.el.getAttribute("href");
      if(target.indexOf("#")===-1) {
        return true;
      };
      e&&e.preventDefault();
      this.toggleBlock(null,{t:target});
    };

    this.toggleBlock = function(e,obj){
      var d = obj.t,
          that = this;
      //setTimeout(function(){
        that.changeActiveStatus(d);
        that.trigger(document,'linkClicked',{targ:d});
      //},300);
    }

    this.changeActiveStatus = function(targ){
      var t = this.$node.find("[href="+targ+"]");
      this.attr.curSelected.removeClass('active-tab');
      this.attr.curSelected = $(t).parent();
      this.attr.curSelected.addClass('active-tab');
    };


    this.after('initialize', function () {
     this.attr.curSelected = this.$node.find('.active-tab');
     this.on(this.$node, "click", {
       'link':this.itemToggled
     });
     this.itemToggled(null,{el:this.$node.find('.active-tab a')[0]})
     this.on(document,'externallinkClicked',this.toggleBlock);

   });
  }
  return defineComponent(Toggle);
});

