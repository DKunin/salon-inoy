define(['flight/lib/component','text!templates/clientlist.htm','text!templates/dialoglist.htm'],function (defineComponent, clientList, dialogList) {
  'use strict';
  
  function ClientLogs() {
    this.defaultAttrs({
      clientlisttemp: _.template(clientList),
      dialogsTemp: _.template(dialogList),
   	  log:[]
    });
  this.addClientToLog = function(e,d) {
    this.attr.log.push(d);
    
  };
  this.returnLogs = function(){
    var html = this.attr.clientlisttemp({clients:this.attr.log});
    this.trigger("drawClientLog",{html:html});
  };
  this.returnDialog = function(e,obj){
    var dialog = _.find(this.attr.log,function(o){return o.code === obj.code});
    var html = this.attr.dialogsTemp({dialog:dialog});
    this.trigger("drawDialog",{html:html});

  };

  this.after('initialize', function () {
      this.on("addClientToLog", this.addClientToLog);
      this.on("fetchLogsData", this.returnLogs);
      this.on("fetchDialogsData", this.returnDialog);
  });

  }
  return defineComponent(ClientLogs);
});

