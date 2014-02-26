define(['flight/lib/component', "lib/bower/mousetrap/mousetrap.min"],function (defineComponent, Mousetrap) {
  'use strict';
  
  function keyBoardBind() {
    this.defaultAttrs({
    });

    var moveMatrix = {
      39:"movingRight",
      37:"movingLeft",
      38:"movingUp",
      40:"movingDown"
    };

    this.after('initialize', function () {
      var that = this;
      this.$node.on('keydown',function(e){
        var $key = e.which;
        var dir = moveMatrix[$key];
        that.trigger('moveChar',{direction:dir});
      });
      
      Mousetrap.bind('1', function() {
        that.trigger(document, "loadCustomer", {id:"customer", coord:[5,5]});
      });
      Mousetrap.bind('2', function() {
        that.trigger(document, "loadCustomer", {id:"customer2", coord:[8,6]});
      });      
      Mousetrap.bind('esc', function() { 
        that.trigger(document, "remoteAction", {action:"openPlayerStats"});
      }, 'keyup');



    });

  }
  return defineComponent(keyBoardBind);
});

