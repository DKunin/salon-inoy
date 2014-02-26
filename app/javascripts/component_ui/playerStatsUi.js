define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function PlayerStatsUi() {
    this.defaultAttrs({
      'experience': '.experience',
      'moneyspent': '.moneyspent',
      'clients': '.clients',
      'productknowledge':'.productknowledge',
      'loyalty': '.loyalty',
      'happyclients':'.happyclients',
      'status':'.status',
      'unhappyclients':'.unhappyclients'
    });

    this.updateUI = function(e,d){
      for(var el in d) {
        var stToUpd = this.select(el);
        if(stToUpd) {
          stToUpd.text(d[el]);
        };

      };
    };

    this.after('initialize', function () {
      this.on(document,'updatePlayerStatsUI', this.updateUI)
      this.on(document,'updateProductKnowledge', this.updateUI)

   });

  }
  return defineComponent(PlayerStatsUi);
});

