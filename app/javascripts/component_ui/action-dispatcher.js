define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function ActionDispatcher() {
    this.defaultAttrs({
      "actionButton":"a.action",
      "actionForm":"form.action",
      "charPieces":"div.char",
    	"engPieces":"div.char.engaged"
   	});

    this.restart = function(){
    	this.trigger(document,"restartCases");
    };
    this.closeModal = function(){
      this.trigger(document,'closeModal');
    };
    this.restoreModal = function(){
      this.trigger(document, 'loadCase',this.attr.lastCase);
      this.trigger(document, 'openModal' ,this.attr.lastModal);
    };

    this.initFinishLevelSequence = function(){     
      var modaldata = {href:".level-result", inline:true,closeButton:true};
      this.trigger(document, 'openModal',modaldata);        
    };

    this.talkToClient = function(adddata){
      this.attr.lastCase = {index: 1, customer: adddata.customer};
      this.attr.lastModal = {href:".cases-holder", inline:true};
      this.trigger(document, 'loadCase',this.attr.lastCase);
      this.trigger(document, 'openModal' ,this.attr.lastModal);
    };

    this.processOrder = function(adddata){
      this.trigger(document,"remoteAction",{action:"launchProgressBar"});
      this.trigger(document,"happyClient");
    };

    this.rudlyLeaveClient = function(){
      this.trigger(document, 'closeModal');
    };
    this.openSettings = function(){
     this.trigger(document, 'openModal',{href:".theSettings", closeButton:true, inline:true});
    };

    this.openWelcomeScreen = function(){
     this.trigger(document, 'openModal',{href:".welcomeDisplay", inline:true, height: "270px"});
    };

    this.startGame = function(){
     this.trigger(document, 'openModal',{href:".startDisplay", inline:true, height: "400px"});
    };

    this.beginGame = function(){
     this.trigger(document, 'closeModal');
     var name = $('[name=username]').val();
     $('.playerData .name').empty().append(name);
     toastr.info(name+', добро пожаловть в салон связи "Иной Сеть"');
     this.trigger(document,'startLevel', {level:1});
    };    
    
    this.openPlayerStats = function(){
     this.trigger(document, 'openModal',{href:".playerStats", closeButton:true, inline:true, width: "60%", height: "80%"});
    };       

    this.dissmissClient = function(){
     var html = "<h2>Вы правда хотите бросить клиента?</h2><a href='#0' data-action='rudlyLeaveClient' class='action pure-button pure-button-primary'>да</a><a href='#0' data-action='restoreModal' class='action pure-button button-error'>нет</a>";
     this.trigger(document, 'openModal',{html:html, closeButton:true});      
    };    

    this.launchProgressBar = function(obj, type){
     var html = "<div></div><div class=\"progress global\"><span></span></div>";
     this.trigger(document, 'openModal',{html:html, width: "390px", height: "100px"});  
     this.trigger(document, 'setLoadTimer',{type:type});
    };

    this.openDictionary = function(){
     this.trigger(document, 'loadDictionary');
     this.trigger(document, 'openModal',{href:".dictionary-holder", inline:true});      
    };

    this.merchendize = function(){
    if(this.attr.organized) {
     var html = "<h3>Сегодня Вы уже приводили витрину в порядок, попробуйте позднее.</h3>";
     this.trigger(document, 'openModal',{closeButton:true, html:html, width: "60%", height: "150px"}); 
     return false;
    };
     this.launchProgressBar(null,'congratulateOnFinishingMerch');
     this.attr.organized = true;   
    };  


    this.congratulateOnFinishingMerch = function(e){      
      toastr.success('Витрина приведена в идеальный порядок');
      this.closeModal();
    };    

    this.learnDevice = function(e){      
     this.trigger(document, 'loadProductForm', e);
    };    

    this.editDictionary = function(){
     this.trigger(document, 'loadDictionaryEditor');
     this.trigger(document, 'openModal',{href:".dictionary-holder", inline:true, closeButton:true });      
    };

    this.openClientLog = function(){
     this.trigger(document, 'loadClientLog');
     this.trigger(document, 'openModal',{href:".clientlog-holder", inline:true, closeButton:true });      
    };

    this.closeDictionary = function(){
      this.restoreModal();
    };    
    this.submitForm = function(data){
      this.trigger(document, "validateTechFrom", {form: data.form});
    };

    this.callAction = function(e,obj){
      e&&e.preventDefault();
      var form = $(obj.el).serializeArray();
      this[obj.el.dataset.action](_.extend({},obj.el.dataset,{form:form}));
    };
    this.remoteAction = function(e, obj){
      this[obj.action](obj);
    };
    var prevEngaged;
    this.disengage = function(){
      prevEngaged&&prevEngaged.removeClass('engaged');
    };
    this.dispatchZone = function(e,obj){
      // console.log("Entered zone" + obj.code);
      
    };
    this.stormOut = function(obj){
      this.trigger(document, 'stormOutDialogCall', {code:obj.code});
    };
    this.dispatchCollision = function(e,obj){
      prevEngaged&&prevEngaged.removeClass('engaged');
      var engagedCustomer = _.filter(this.select('charPieces'),function(a){return obj.chars.indexOf(a.dataset.id) != -1 && a.dataset.id!="main" });
      if(obj.chars[0]!=0) {
        this.trigger(document, 'enteredZone', {code:obj.chars[0]});
      } else {
        this.trigger(document, 'enteredZone', {code:0});
      };
      prevEngaged = $(engagedCustomer);
      prevEngaged.addClass('engaged');
    };
    this.startTalk = function(e,obj){
      this.attr.lastCase = {index: 1, customer: obj.el.dataset.id};
      this.attr.lastModal = {href:".cases-holder", inline:true};
      this.trigger(document, 'loadCase',this.attr.lastCase);
      this.trigger(document, 'openModal' ,this.attr.lastModal);      
    };
    this.finishtTalk = function(e,obj){
      this.attr.lastModal = {href:".cases-holder", inline:true};
      this.trigger(document, 'openModal' ,this.attr.lastModal);      
    };
    this.after('initialize', function () {

      this.on(this.$node, 'click',{
        'actionButton': this.callAction,
        'engPieces': this.startTalk
      });      
      this.on(this.$node, 'submit',{
        'actionForm': this.callAction
      });
      this.on(document,'loadPseudoDialog', function(){
        this.attr.lastCase = {index: 1, customer: 'customer'};
        this.attr.lastModal = {href:".cases-holder", inline:true};
        this.trigger(document, 'loadCase',this.attr.lastCase);
        this.trigger(document, 'openModal' ,this.attr.lastModal); 
      })
      this.on(document, 'enteredZone', this.dispatchZone)
      this.on(document,"zoneCollision",this.dispatchCollision);
      this.on(document,"remoteAction",this.remoteAction);
      this.on(document, 'finishedLevel', this.initFinishLevelSequence);
      this.on(document, 'congratulateOnFinishingMerch', this.congratulateOnFinishingMerch);

   });

  }
  return defineComponent(ActionDispatcher);
});

