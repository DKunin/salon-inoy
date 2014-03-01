define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function PlayerStatsData() {
    this.defaultAttrs({
      experience: 0,
      polite:0,
      helpful: 0,
      apropriate: 0,
      satisfaction: 0,
      moneyspent: 0,
      clients: 0,
      loyalty: 1,
      happyclients: 0,
      unhappyclients: 0,
      status: "Новичок"
   	});
    var levelStatuses = ["Новичок","Знаток","Пора на повышение"]
    this.parseScore = function(e, data){
      var exp = this.attr.experience;      
      for(var el in data) {
        if(this.attr[el]||this.attr[el]===0) {
          this.attr[el] = this.attr[el] + parseInt(data[el]);
          if(el!='moneyspent') exp = exp + Math.ceil((parseInt(data[el])*2));
        };
      };
      this.attr.experience = exp;
      this.analizeExperiece();
      this.trigger('updatePlayerStatsUI', this.attr);
    };

    this.analizeExperiece = function(){
      var e = this.attr.experience;
      var number = e<50?0:e>=50&&e<150?1:2;
      this.attr.status = levelStatuses[number];
    };


  this.after('initialize', function () {
      this.on(document,"updatePlayerStats", this.parseScore);
      this.on(document,"processSaleResult", this.parseScore);
  });

  }
  return defineComponent(PlayerStatsData);
});

