define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function CasesUI() {
    this.defaultAttrs({
    	currentCase:1,
    	"pickAnswer":".nextsentence", 
      "showInfo":".showInfo img"
   	});

    this.drawCase = function(e,obj){
    	e&&e.preventDefault();
      if(!this.$node.html()) {
    	 this.$node.empty().append(obj.html);
      } else {
        var $html = $(obj.html);
        this.$node.find('.logoholder img').attr('src',$html.find('.logoholder img').attr('src'))
        this.$node.find('.clienttalk').empty().append($html.find('.clienttalk').html())
        this.$node.find('.answers').empty().append($html.find('.answers').html())
      }
    };

    this.processClick = function(e, obj){
    	var dataset = obj.el.dataset;
    	this.callForCase(dataset, obj.el.innerHTML);
    };
    this.hoverOver = function() {
      this.$node.find('.clienttalk').addClass("show-info")
    }
    
    
    this.hoverOut = function() {
      this.$node.find('.clienttalk').removeClass("show-info")
    }
    this.callForCase = function(dataset, mansaid){
      this.trigger('processNPCDialog',{code:dataset.code, score: dataset, mansaid:mansaid});
    };

    this.after('initialize', function () {
      this.on(this.$node, 'click',{
        'pickAnswer': this.processClick
      });
      this.on(this.$node, 'mousedown',{
        'showInfo': this.hoverOver
      });
      this.on(this.$node, 'mouseup',{
        'showInfo': this.hoverOut
      });

    	this.on(document, 'drawCase', this.drawCase);
   });

  }
  return defineComponent(CasesUI);
});

