define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function TopMenu() {
    this.defaultAttrs({
    	'timer':'.timer',
    	'moneyspent':'.moneyspent'
    });

    this.timerUpdate = function(e,d){
      var t = d.timer;
      this.select('timer').empty().append(t);
    };   

    this.updateUI = function(e,d){
      for(var el in d) {
        var stToUpd = this.select(el);
        if(stToUpd) {
          stToUpd.text(d[el]);
        };

      };
    };
    
    this.after('initialize', function () {
    	this.on(document,'levelTimer',this.timerUpdate);
    	this.on(document,"updateMoney", this.updateUI);
    });

  }
  return defineComponent(TopMenu);
});

