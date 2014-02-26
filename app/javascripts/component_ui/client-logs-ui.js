define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function ClientLogsUi() {
    this.defaultAttrs({
      'client':'li'
    });
  this.loadClientLog = function(){
    this.trigger(document,'fetchLogsData');
  };
  this.drawClientLog = function(e, obj){
    this.$node.find('.clientlist').empty().append(obj.html);
  };
  this.drawDiaLog = function(e, obj){
    this.$node.find('.dialog').empty().append(obj.html);
  };
  this.loadDialog = function(e, obj){
    var code = obj.el.dataset.code;
    this.trigger(document,'fetchDialogsData', {code:code});

  };
  this.after('initialize', function () {
    this.on(document,"loadClientLog", this.loadClientLog);
    this.on(document,"drawClientLog", this.drawClientLog);
    this.on(document,"drawDialog", this.drawDiaLog);
    this.on(this.$node,'click',{
      'client': this.loadDialog
    })
  });

  }
  return defineComponent(ClientLogsUi);
});

