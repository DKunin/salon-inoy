define(['flight/lib/component','mixins/requestData'],function (defineComponent,withRequest) {
  'use strict';

  function SliderData() {
    

    this.dataRequested = function(e,d) {
      var that = this;
      // this.makeCleanRequest(window.location.href+"&news_item_id="+d.newsid).done(function(json){     
      this.makeCleanRequest("/media/index?locale=ru&news_item_id="+d.newsid).done(function(json){     
        
        that.trigger(document, "SliderDataUpdate"+d.modalid, {photos:json, empty:true, cs: d.curs});
        // that.trigger(document, d.modalid +"modalOpen");
      });

    };
    this.dataUpdateRequest = function(e,d){
      this.trigger(document, "SliderDataUpdate"+d.modalid, {photos:dataJSON, empty:false});
    }
    this.after('initialize', function () {
      this.on("slliderDataRequest", this.dataRequested);
   });
  }
  return defineComponent(SliderData,withRequest);

});