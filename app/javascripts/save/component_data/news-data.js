define(['flight/lib/component','mixins/requestData','mixins/serializer'],function (defineComponent,withRequest, Serialize) {
  'use strict';
  function Block() {

    this.defaultAttrs({
      'thisAppendBlock':'.widget-append-block',
      'mediaobjects': '.media-body'
    });
// :2013-10-18
// pub-finish-date:2013-10-21

    this.nextPage = function(e){
      e&&e.preventDefault();
      var p = this.form('page_num');
      this.form('page_num',++p);
      this.dataRequested();
    };

    this.form = function(name,value) {
      var obj = this.attr.data[name];
      if(!value) {
        return obj
      } else {
        this.attr.data[name] = value;
        return obj;
      };
    };
    //2013-10-21
    this.checkLength = function(showbtn){
      var l = this.select('mediaobjects').length;
      
      if(l>=this.form('eventCount')||l<5||(!_.isUndefined(window.NEWS_AMOUNT)&&NEWS_AMOUNT<5)) {
        this.select('thisAppendBlock').hide();
      } else {
        this.select('thisAppendBlock').show();
      }
      if(showbtn) {
        this.select('thisAppendBlock').show();
      }
    };
    this.dateUpdate = function(e,d){      
      this.form('publish-date',d.day);
      this.form('page_num',1);
      this.form('eventCount',d.eventsCount)
      this.dataRequested(true);
    };
    this.targetUpdate = function(e,d){
      this.form('target',d);
      this.form('page_num',1);
      this.form('eventCount',' ');
      this.dataRequested(true, true);
    };
    this.cleanUpdate = function(e,d){      
      this.form('publish-date',' ');
      this.form('page_num',1);
      this.form('eventCount',' ');
      this.dataRequested(true, true);
    };
    this.setDirectionFilter = function(e,d){
      e&&e.preventDefault();
      if(d.targ.indexOf('filter')==-1) return false;
      this.targetUpdate(null,d.targ.replace('filter_',''))
    };
    this.dataRequested = function(renew, showbtn) {
      var that = this;
      var dest;
      if(this.select('thisAppendBlock').data('dtype') == "media"){
        dest = '?'
      }else{
        dest = '/press_center?'
      }
      //this.makeCleanRequest('?'+this.serialize(this.attr.data)).done(function(d){
      //this.makeCleanRequest('/press_center?'+this.serialize(this.attr.data)).done(function(d){
      this.makeCleanRequest(dest+this.serialize(this.attr.data)).done(function(d){
        if(renew) {
          that.select('mediaobjects').remove();
        };
        that.select('thisAppendBlock').before(d);
        that.checkLength(showbtn);
      });
    };    
    this.after('initialize', function () {
      var type = this.node.id.substr(0,3);
      this.attr.data = {
        page_num: 1,
        type: type,
        'publish-date':'',
        target:''
      };
      //Дополнительный параметр
      if(window.TAG_ID) {
        this.form('tag_id',window.TAG_ID)
      };
      if(!_.isUndefined(window.NEWS_AMOUNT)) {
        if(window.NEWS_AMOUNT<5) {
          this.select('thisAppendBlock').hide();
        }
      };
      console.log(window.NEWS_AMOUNT)
      //this.on(document, 'fetchNextPage'+this.attr.type, this.nextPage);
      this.on(document,'newsWidgetDateUpdate'+ type, this.dateUpdate);
      this.on(document,'newsDateCleared'+ type, this.cleanUpdate);
      this.on(this.$node, 'click', {
        'thisAppendBlock': this.nextPage
      });
      
      if(this.select('thisAppendBlock').data('objectstype')) {
        this.attr.mediaobjects = this.select('thisAppendBlock').data('objectstype');
      };

      this.on(document,'linkClicked',this.setDirectionFilter);
      
   });
  }
  return defineComponent(Block,withRequest,Serialize);

});

