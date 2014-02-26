define(['flight/lib/component','mixins/scrollerController'],function (defineComponent,scrollerController) {
  'use strict';
  

  function Folders_data() {
    this.defaultAttrs({
      more: '.f-btn'
    });

    this.dataUpdate = function(e,targ) {
      this.fiddleWithScrollHandler('.document');
      if(targ.update) {
        var newData = $(targ.data).find('.found').remove().end();
        this.node.innerHTML = this.node.innerHTML + newData.html();;      
      } else {
        this.node.innerHTML = targ.data;      
      };
      this.checkMoreButton();
      this.scrollDown();
    };


    this.checkMoreButton = function(){
      // console.log(this.foundCount()<=this.count())
      if(this.foundCount()<=this.count()) { 
        this.trigger(document,"hideMoreButton");
      } else {
        this.trigger(document,"showMoreButton");
      }
    };

    this.foundCount = function(){
      return parseInt(this.$node.find('.count-number').text())
    };
    this.count = function(){
      return parseInt(this.$node.find('.document').length);
    };
    
    this.loadingStateChange = function(){
      //this.node.innerHTML = "<div class=\"universal-12 details text-center mtl ptl\">Загрузка</div>";      
    };
    this.fetchMore = function(){
      this.trigger(document,'nextdocPage');
    };

    this.after('initialize', function () {
      this.on(document, 'folderDataRecieved',this.dataUpdate);
      this.on(document, 'folderChanged',this.loadingStateChange)
      this.on(document, 'searchFormRequest',this.loadingStateChange)
      this.checkMoreButton();
      this.on(this.$node,'click',{
        'more':this.fetchMore
      });
   });
  }
  return defineComponent(Folders_data,scrollerController);

});

