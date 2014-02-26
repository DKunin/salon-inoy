define(['flight/lib/component','mixins/requestData'],function (defineComponent,withRequest) {
  'use strict';
  function Folders_data() {
    this.dataRequested = function(e,targ) {
      var that = this;
      this.makeRequest(targ.href).done(function(d){
        that.trigger('folderDataRecieved',{data:d, update:targ.update})
      });

    };
    this.after('initialize', function () {
      this.on('searchFormRequest',this.dataRequested)
   });
  }
  return defineComponent(Folders_data,withRequest);

});

