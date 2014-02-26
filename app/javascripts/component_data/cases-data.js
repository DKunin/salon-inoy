define(['flight/lib/component','settings/cases','text!templates/cases.htm'],function (defineComponent,cases,template) {
  'use strict';
  
  function CasesData() {
    this.defaultAttrs({
  		template: _.template(template)  
   	});


    this.renderNpcTalk = function(e,obj){      
      this.attr.curCustomer = this.attr.NPCs[obj.customer];
      if(!this.attr.curCustomer) return false;
      this.attr.curCustomer.codesAnswered = [];
      var allPool = shuffle(this.attr.respPool.questions);
      this.attr.curCustomer.pool = allPool.slice(0);
      this.processPlayerResponces();
      var obj = {id:"", question: "..." ,answers:shuffle(this.attr.respPool.greetings),code: this.attr.curCustomer.code, customer:this.attr.curCustomer};
      var tem = this.attr.template(obj); 
      this.trigger(document, 'holdCustomerPationce',{code: this.attr.curCustomer.code});
      this.trigger(document, 'drawCase',{html:tem});      
    };

    this.processPlayerResponces = function(goodbuy){
      for(var i=0,l=this.attr.curCustomer.pool.length;i<l;i++){
        var curCode = this.attr.curCustomer.pool[i].code;
        if((this.attr.curCustomer.options[curCode]||this.attr.curCustomer.codesAnswered.indexOf(curCode)!=-1||goodbuy)&&curCode!="choosemodel") {
          this.attr.curCustomer.pool[i].hidden = true;
        } else {
          this.attr.curCustomer.pool[i].hidden = undefined;
        };        
      };
    };
 
    this.processNPCDialog = function(e,obj){
      var question = this.attr.curCustomer.responces[obj.code];
      var choosingModel = obj.code==="choosemodel";
      if(!question) {
        question = {};
        question.text = "Я не могу ответить на этот вопрос";
      };

      if(choosingModel) {
         this.trigger(document, "remoteAction",{action:"openDictionary"});
      };
      
      this.attr.curCustomer.codesAnswered.push(obj.code);
      this.processPlayerResponces(obj.goodbuy);
      //Обработка оценки клиента
      var caseStats = _.extend({}, question, {code:this.attr.curCustomer.code});
      this.trigger(document,"updateCaseStats", caseStats);
      //Обработка оценки менеджера
      var resScore = _.find(this.attr.curCustomer.pool ,function(c){return c.code === obj.code});
      if(resScore&&resScore.score) {
        this.trigger(document,"updatePlayerStats", _.extend({},resScore.score,caseStats.score));
      };
      
      if(obj.code.indexOf('farewell')!=-1) {
        this.finishTalkUp();
        return false;
      };

      var objRend = {};
      if(obj.goodbuy||this.attr.goodbuy) {
        obj.goodbuy = true;
        objRend.actions = [
        {
          action: "processOrder",
          text: "Продать товар"
        }];
        this.attr.curCustomer.pool = shuffle(this.attr.respPool.propositions);
      };
      this.attr.goodbuy = obj.goodbuy;
      var newobjRend = _.extend({},objRend,{id:"", question:question.text, answers:this.attr.curCustomer.pool,code: this.attr.curCustomer.code, customer:this.attr.curCustomer});
      var tem = this.attr.template(newobjRend);
      this.trigger(document, 'drawCase',{html:tem});
      var clSaid = choosingModel?"":question.text;
      this.logToCustomer({custsaid: clSaid , yousaid: resScore?resScore.text: obj.mansaid});
    };

    this.logToCustomer = function(text){
      if(!this.attr.curCustomer.logs) {
        this.attr.curCustomer.logs = [];
      };
      this.attr.curCustomer.logs.push(text);
    };

    this.stormOut = function(e,data){
      var client = this.attr.curCustomer;
      var tem = this.attr.template({code:data.code, 
        question: client.responces.badbuy.text, 
          answers:[], 
          customer:client,
          actions:[{
          action: "closeModal",
          text: "вернуться к делам",
      }]});
      this.trigger(document, "noSaleAtAll", {customer:client});
      this.trigger(document,"updatePlayerStats", {unhappyclients:1});
      setTimeout(function(){
        this.trigger(document, 'drawCase',{html:tem ,width:"90%",height:"90%"});
      }.bind(this),200);
    };

    this.finishTalkUp = function(){
      this.trigger(document,'closeModal');
      this.trigger(document,"addClientToLog",this.attr.curCustomer);
      this.removeCurrentNPC();
    };
    this.lastFarewell = function(e) {
        var question = {};
        question.text = "Большое спасибо, до свиданья!";
        var objToRend = {id:"", question:question.text, answers:shuffle(this.attr.respPool.farewells),code:this.attr.curCustomer.code, customer:this.attr.curCustomer};
        var tem = this.attr.template(objToRend);
        this.attr.goodbuy = false;
        this.trigger(document,"updatePlayerStats", {happyclients:1});
        this.trigger(document, 'remoteAction',{action:"finishtTalk"});      
        this.trigger(document, 'drawCase',{html:tem});
    };

    this.processSuggestion = function(e,obj) {
      var code = obj.code;
      var acceptable = this.attr.curCustomer.options.acceptablemodels[code];
      if(acceptable) {
        this.processNPCDialog(null,{code: "goodbuy", goodbuy: true, mansaid:obj.modelname});
        this.trigger(document,"processSaleResult", _.extend({},acceptable,{moneyspent:obj.price},{clients:1}));
      } else {
        this.processNPCDialog(null,{code: "nono",mansaid:obj.modelname});
      };

    };
    this.removeCurrentNPC = function(){
      this.trigger(document,"removeNPCFromMap",{code:this.attr.curCustomer.code});
    };

    this.after('initialize', function () {
      this.attr.NPCs = cases.npc;
      this.attr.respPool = cases.respPool;
      for(var i=0,l=this.attr.respPool.greetings.length;i<l;i++) {
        this.attr.respPool.greetings[i].link = '';
        this.attr.respPool.greetings[i].code = 'greetingResponces';
      };
      this.on(document,'makeSuggestion', this.processSuggestion);
      this.on(document, 'loadCase', this.renderNpcTalk);
      this.on(document, 'processNPCDialog', this.processNPCDialog);
      this.on(document, 'removeCurrentNPC', this.removeCurrentNPC);
      this.on(document, 'processingOrderFinished', this.lastFarewell);
      this.on(document, 'stormOutDialogCall', this.stormOut);
      //this.on(document,"restartCases",this.firsCase);
   });

  }
  return defineComponent(CasesData);
});

