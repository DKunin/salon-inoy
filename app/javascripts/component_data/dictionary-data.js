define(['flight/lib/component','text!templates/dictionary.htm','text!templates/dictionary-edit.htm','text!templates/techdata.htm','text!templates/techform.htm','text!templates/modellist.htm','text!templates/techdata_noimage.htm'],function (defineComponent,template,templateed, templtech, tempform, modellist, techdatanoimage) {
  'use strict';
  
  function Dictionary() {
    this.defaultAttrs({
      template: _.template(template),
      templateed: _.template(templateed),
      templtech: _.template(templtech),
      tempform: _.template(tempform),
      modellist: _.template(modellist),
  		techdatanoimage: _.template(techdatanoimage)
   	});
    var questions = [{
      code:"intmemory",
      text: "Какой объем внутренней памяти?",
      type: "text"
    },{
      code:"os",
      text: "Операционная система",
      type: "choice"
    },{
      code:"sim",
      text: "Какой тип СИМ-карты используется в телефоне",
      type: "choice"
    },{
      code:"price",
      text: "Какова примерная цена телефона (можно допустить ошибку в пределах 1000 рублей) ",
      type: "range"
    }];


//http://market.yandex.ru/compare.xml?hid=91491&CAT_ID=160043&CMD=-CMP=10491965,10495486,9281443,10548283
    var merchandise = [{
      text: "HTC One 32Gb",
      known: true,
      code: "htc",
      techdata: [
      {
        icon:'fa-phone',
        code: "price",
        name:"Цена",
        value: 19207
      },{
        icon:'fa-phone',
        code: "type",
        name:"Тип",
        value:"смартфон"
      },{
        icon:'fa-phone',
        code: "os",
        name:"Операционная система",
        value:"Android"
      },{
        icon:'fa-phone',
        code: "intmemory",
        name:"Внутренняя память",
        value:"32Gb"
      },{
        icon:'fa-phone',
        code: "material",
        name:"Материал",
        value:"алюминий"
      },{
        icon:'fa-phone',
        code: "diagonal",
        name:"Диагональ",
        value:"4.7 дюймов"
      },{
        icon:'fa-phone',
        code: "weight",
        name:"вес",
        value:"143 г."
      },{
        icon:'fa-phone',
        code: "camera",
        name:"камера",
        value:"4 Mpx"
      },{
        icon:'fa-phone',
        code: "processor",
        name:"процессор",
        value:"Qualcomm Snapdragon 600 APQ8064T, 1700 МГц"
      },{
        icon:'fa-phone',
        code: "sim",
        name:"тип SIM карты",
        value:"micro SIM"
      },{
        icon:'fa-phone',
        code: "additional",
        name:"дополнительно",
        value:"мощный, яркий, молодежный, отличное звучание музыки, HD качество видео, подходит для молодых, продвинутых людей, гиков"
      }]
    },{
      icon:'fa-ticket',
      text: "Apple iPhone 5S",
      known: true,
      code: "iphone",
      techdata: [{
        icon:'fa-phone',
        code: "price",
        name:"Цена",
        value: 30000
      },{
        icon:'fa-phone',
        code: "type",
        name:"Тип",
        value:"смартфон"
      },{
        icon:'fa-phone',
        code: "os",
        name:"Операционная система",
        value:"iOs"
      },{
        icon:'fa-phone',
        code: "intmemory",
        name:"Внутренняя память",
        value:"32Gb"
      },{
        icon:'fa-phone',
        code: "material",
        name:"Материал",
        value:"алюминий"
      },{
        icon:'fa-phone',
        code: "diagonal",
        name:"Диагональ",
        value:"4.7 дюймов"
      },{
        icon:'fa-phone',
        code: "weight",
        name:"вес",
        value:"143 г."
      },{
        icon:'fa-phone',
        code: "camera",
        name:"камера",
        value:"4 Mpx"
      },{
        icon:'fa-phone',
        code: "processor",
        name:"процессор",
        value:"Apple A7"
      },{
        icon:'fa-phone',
        code: "sim",
        name:"тип SIM карты",
        value:"nano SIM"
      },{
        icon:'fa-phone',
        code: "additional",
        name:"дополнительно",
        value:"доступен в трех цветах: сером, белом и золотистом; сопроцессор - Apple M7; коннектор - Lightning; режим замедленной съемки - 120 кадров в секунду, подходит всем"
      }]
    },{
      text: "Nokia Lumia 1520",
      known: true,
      code: "nokia",
      techdata: [{
        icon:'fa-phone',
        code: "price",
        name:"Цена",
        value: 21640
      },{
        icon:'fa-phone',
        code: "type",
        name:"Тип",
        value:"смартфон"
      },{
        icon:'fa-phone',
        code: "os",
        name:"Операционная система",
        value:"Windows Phone"
      },{
        icon:'fa-phone',
        code: "intmemory",
        name:"Внутренняя память",
        value:"32Gb"
      },{
        icon:'fa-phone',
        code: "material",
        name:"Материал",
        value:"алюминий"
      },{
        icon:'fa-phone',
        code: "diagonal",
        name:"Диагональ",
        value:"4.7 дюймов"
      },{
        icon:'fa-phone',
        code: "weight",
        name:"вес",
        value:"143 г."
      },{
        icon:'fa-phone',
        code: "camera",
        name:"камера",
        value:"4 Mpx"
      },{
        icon:'fa-phone',
        code: "processor",
        name:"процессор",
        value:"Qualcomm Snapdragon 600 APQ8064T, 1700 МГц"
      },{
        icon:'fa-phone',
        code: "sim",
        name:"тип SIM карты",
        value:"nano SIM"
      },{
        icon:'fa-phone',
        code: "additional",
        name:"дополнительно",
        value:"бесплатное облачное хранилище: 7 ГБ, отличный выбор для бизнесмена"
      }]
    },{
      text: "Sony Xperia Z1",
      known: false,
      code: "sony",
      techdata: [{
        icon:'fa-phone',
        code: "price",
        name:"Цена",
        value: 21216
      },{
        icon:'fa-phone',
        code: "type",
        name:"Тип",
        value:"смартфон"
      },{
        icon:'fa-phone',
        code: "os",
        name:"Операционная система",
        value:"Android"
      },{
        icon:'fa-phone',
        code: "intmemory",
        name:"Внутренняя память",
        value:"32Gb"
      },{
        icon:'fa-phone',
        code: "material",
        name:"Материал",
        value:"алюминий"
      },{
        icon:'fa-phone',
        code: "diagonal",
        name:"Диагональ",
        value:"4.7 дюймов"
      },{
        icon:'fa-phone',
        code: "weight",
        name:"вес",
        value:"143 г."
      },{
        icon:'fa-phone',
        code: "camera",
        name:"камера",
        value:"4 Mpx"
      },{
        icon:'fa-phone',
        code: "processor",
        name:"процессор",
        value:"Qualcomm Snapdragon 600 APQ8064T, 1700 МГц"
      },{
        icon:'fa-phone',
        code: "sim",
        name:"тип SIM карты",
        value:"micro SIM"
      },{
        icon:'fa-phone',
        code: "additional",
        name:"дополнительно",
        value:"степень защиты - IPX5, IPX8, IP5X, выбор меломана"
      }]
    }];    

    this.renderDictionary = function(e,obj){
      var tem = this.attr.template({merchandise:merchandise}); 
      this.trigger('drawDictionary',{html:tem});
    };
    this.renderDictionaryEditor = function(e,filter){
      var list = this.attr.modellist({merchandise:merchandise});  
      var tem = this.attr.templateed({modellist:list}); 

      this.trigger('drawDictionary',{html:tem});
      this.trigger('drawDictionaryList',{html:list});
      this.$node.find('.dict-list li').eq(0).click();
    };
    this.renderDictionaryList = function(e,filter){
      var data = {};
      if(filter) {
        data = _.filter(merchandise, function(o){return o.text.toLowerCase().indexOf(filter.toLowerCase())!=-1});
      } else {
        data = merchandise;
      };      
      var list = this.attr.modellist({merchandise:data});
      this.trigger('drawDictionaryList',{html:list});      
    };
    this.filterDictionary = function(e,d ){
      if(d.query) {
        this.renderDictionaryList(null,d.query);
      } else {
        this.renderDictionaryList(null)
      }

    };
    this.findProd = function(code){
      return _.find(merchandise,function(o){return o.code===code;});
    };
    this.countKnownUnknown = function(){
      var kn = _.filter(merchandise,function(o){return o.known});
      return kn.length+"/"+merchandise.length;
    };

    this.renderTechData = function(e,d){
      var prod = this.findProd(d.code);
      var tem = this.attr.templtech(prod);
      this.trigger('drawTechdata',{html:tem}); 
    };
    this.getQuickPhoneInfo = function(e,d){
      var prod = this.findProd(d.code);
      var tem = this.attr.techdatanoimage(prod);
      this.trigger('drawQuickInfo',{html:tem}); 
    };
    this.renderTechDataForm = function(e,d){
      var prod = this.findProd(d.code);
      var tem = this.attr.tempform(_.extend({},{questions:questions},prod,{merchandise:merchandise}));
      this.trigger('drawTechForm',{html:tem});       
    };
    this.validateForm = function(e,data) {
      var f = data.form;
      var ob = {};
      for(var i = 0,l=f.length;i<l;i++) {
        ob[f[i].name] = f[i].value;
      };
      var prod = this.findProd(ob.code);
      var incorr = [];
      _.each(prod.techdata, function(d){
        var corv = d.value;
        if(ob[d.code]&&corv!==ob[d.code]&&parseInt(corv)!==parseInt(ob[d.code])) {
          if(d.code==="price") {
            var stPrice = parseInt(ob[d.code]);
            if(Math.abs(stPrice-corv)>1000) {
              incorr.push(d.code);
            }
          } else {
            incorr.push(d.code);
          }
        };
      });
      

      this.trigger(document,"formWrongUpdate",{fields:incorr});
      if(incorr.length===0) {
        toastr.success('Отлично! Вы добавили новый продукт к своему списку!');
        prod.known = true;
        this.renderDictionaryEditor();
        this.trigger(document,'updateProductKnowledge',{productknowledge:this.countKnownUnknown()})
      } else {
        toastr.warning('К сожалению не все вопросы отвечены верно!');
      };
    };

    this.after('initialize', function () {
      this.on('loadDictionary', this.renderDictionary);
      this.on('loadDictionaryEditor', this.renderDictionaryEditor);
      this.on('loadTechInfo', this.renderTechData);
      this.on('loadProductForm', this.renderTechDataForm);
      this.on('validateTechFrom', this.validateForm);
      this.on('filterDictionary', this.filterDictionary);
      this.on('getQuickPhoneInfo', this.getQuickPhoneInfo);
      //this.on(document, 'processNPCDialog', this.processNPCDialog);
      //this.on(document,"restartCases",this.firsCase);
   });

  }
  return defineComponent(Dictionary);
});

