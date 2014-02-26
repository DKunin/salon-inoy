define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function ProgressBar() {
    this.defaultAttrs({

   	});


    this.updateBar = function(e,d) {
      var comp = this;
      var w = d.name;
      var $ob = $('.'+w+' span');
      var n = d.percent;
      var pers = n>=100?100:n<=0?0:n;
      var color = (pers>=80)?'#00520b':((pers<=79)&&(pers>=30))?'#d1a700':'#d10000';
      $ob.animate({
        'width':  pers+"%"
      },d.speed||10).animate('background-color',color,function(){
        if(pers===100) {
          comp.trigger(document, d.type);
        };
      });
    };

    this.setLoadTimer = function(e,d) {
      var speed = d&&d.speed?d.speed:50;
      var type = d&&d.type?d.type:'processingOrderFinished';
      var self = this;
      var getThat = function(ap) {
          self.updateBar(null,{name:"global", percent: 10*ap, speed:speed, type:type});
      };
      for(var i=0;i<11;i++) {
          var az = i;
          getThat(az);
      };
    };

    this.after('initialize', function () {
      this.on(document, 'setLoadTimer', this.setLoadTimer);
      //this.on(document, 'processNPCDialog', this.processNPCDialog);
      //this.on(document,"restartCases",this.firsCase);
   });

  }
  return defineComponent(ProgressBar);
});

