define(['flight/lib/component','mixins/requestData'],function (defineComponent,withRequest) {
  'use strict';
  function Block() {

    this.defaultAttrs({
       'links':'.widget-append-block'
    });

    this.callData = function(e,t){
      e&&e.preventDefault();
    };

    this.dataRequested = function(targ, where) {
      var that = this;
      this.makeCleanRequest(targ).done(function(d){
        $(where).before(d)
      });
    };
    this.after('initialize', function () {
      this.on(this.$node, 'click', {
        'links':this.callData
      });
   });
  }
  return defineComponent(Block,withRequest);

});

