define(['flight/lib/component'],function (defineComponent) {
  'use strict';
 
  function LoaderMorer() {
    this.defaultAttrs({
       'checkinputs':'input'
    });

    this.loadMore = function(e,targ) {
      e.preventDefault();
      this.trigger(document, 'nextdocPage');
    };
    this.hideMe = function(){
      this.node.style.display = "none";
    };
    this.showMe = function(){
      this.node.style.display = "block";
    };

    this.after('initialize', function () {
     // this.attr.aim = this.node.dataset.trigger;     
     this.on(this.$node, "click", this.loadMore);
     this.on(document,"hideMoreButton", this.hideMe);
     this.on(document,"showMoreButton", this.showMe);
   });
  }

  return defineComponent(LoaderMorer);
});

