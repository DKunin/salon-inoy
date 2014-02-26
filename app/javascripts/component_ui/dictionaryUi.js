define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function DictionaryUi() {
    this.defaultAttrs({
    	currentCase:1,
      "pickAnswer":".answers li", 
      "pickInfo":".answers .phoneimage-holder", 
    	"lookUp":".dict-list li",
      "newLook":".additional-list li",
      "filter":".filter-products"
   	});

    this.loadPhoneInfo = function(e, obj){
      e&&e.preventDefault();
      this.trigger(document,'getQuickPhoneInfo',{code:obj.el.dataset.code})
    };

    this.drawQuickInfo = function(e,obj){
      this.$node.find('.showPhoneInfo').empty().append(obj.html);
    };
    this.drawDictionary = function(e,obj){
      e&&e.preventDefault();
      this.$node.empty().append(obj.html);
    };
    this.drawTechdata = function(e,obj){
      e&&e.preventDefault();
      this.$node.find('.tech').empty().append(obj.html);
      
    };
    this.drawDictionaryList = function(e,obj){
      e&&e.preventDefault();
      this.$node.find('.modellist').empty().append(obj.html);
      
    };
    this.drawTechForm = function(e,obj){
      e&&e.preventDefault();
      this.$node.find('.tech').empty().append(obj.html);
    };
    this.processClick = function(e, obj){
      this.attr.curTab&&this.attr.curTab.removeClass('currentTab');
      $(e.target).addClass('currentTab');
      this.attr.curTab = $(e.target);
      this.trigger(document,'makeSuggestion',{code:obj.el.dataset.code, price:obj.el.dataset.price, modelname:obj.el.dataset.modelname});
      this.attr.lastModal = {href:".cases-holder", inline:true};
      this.trigger(document, 'openModal' ,this.attr.lastModal);      
    };
    this.loadTabInfo = function(e, obj) {
      this.attr.curTab&&this.attr.curTab.removeClass('currentTab');
      $(e.target).addClass('currentTab');
      this.attr.curTab = $(e.target);      
      var code = obj.el.dataset.code;
      this.trigger(document,'loadTechInfo', {code: code});
    };
    this.formWrongUpdate = function(e,d) {
      var f = this.$node.find('.tech form');
      f.find('label').removeClass('wrong')
      for(var i=0,l=d.fields.length;i<l;i++){
        f.find('label[for='+d.fields[i]+']').addClass('wrong')
      };
    };
    this.applyFilter = function(e,d){
      this.trigger(document,"filterDictionary",{query:d.el.value});
    };
    this.after('initialize', function () {
      this.on(this.$node, 'click',{
        'pickAnswer': this.processClick,
        'lookUp': this.loadTabInfo,
        'pickInfo': this.loadPhoneInfo,
        'newLook': this.loadTabInfo
      });
      this.on(this.$node, 'keyup',{
        'filter': this.applyFilter
      });
      this.on(document, 'drawDictionary', this.drawDictionary);
      this.on(document, 'drawTechdata', this.drawTechdata);
      this.on(document, 'drawTechForm', this.drawTechForm);
    	this.on(document, 'drawDictionaryList', this.drawDictionaryList);
      this.on(document,"formWrongUpdate",this.formWrongUpdate);
      this.on(document,"drawQuickInfo",this.drawQuickInfo);
   });

  }
  return defineComponent(DictionaryUi);
});

