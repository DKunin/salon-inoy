define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function DayResults() {
    this.defaultAttrs({
      'moneyspent':'.moneyspent',
      'experience':'.experience',
      'clients':'.happyClients',
      'unhappyClients':'.unhappyClients',
      stats: {
        experience: 0,
        moneyspent: 0,
        clients: 0
        }
   	});

    this.updateUI = function(e,d){
      for(var el in d) {
        var stToUpd = this.select(el);
        if(stToUpd) {
          stToUpd.text(d[el]);
        };

      };
    };

    this.parseScore = function(e, data){
      var exp = this.attr.stats.experience;      
      for(var el in data) {
        if(this.attr.stats[el]||this.attr.stats[el]===0) {
          this.attr.stats[el] = this.attr.stats[el] + parseInt(data[el]);
          if(parseInt(data[el])<100){
            exp = exp + Math.ceil((parseInt(data[el])/10));
          }
        };
      };
      this.attr.stats.experience = exp;
      this.updateUI(null, this.attr.stats);
      this.trigger(document,"updateMoney", this.attr.stats);
    };

    this.zeroScore = function(){
        this.attr.stats.experience =  0;
        this.attr.stats.moneyspent =  0;
        this.attr.stats.clients =  0;
    };


    this.after('initialize', function () {
      this.on(document,"updatePlayerStats", this.parseScore);
      this.on(document,"processSaleResult", this.parseScore);
      this.on(document,"levelStart", this.zeroScore);


    	//this.on(document, 'drawDictionary', this.drawDictionary);
   });

  }
  return defineComponent(DayResults);
});

