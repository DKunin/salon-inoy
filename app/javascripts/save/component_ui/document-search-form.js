define(['flight/lib/component'],function (defineComponent) {
  'use strict';
 
  function DocumentsSearch() {
    this.defaultAttrs({
      thelink: 'input[type=submit]',
      selected: '',
      template: '<input type="hidden" name="{{name}}" value="{{value}}">',
      pageNum: 1
    });

    this.docRequested = function(e) {
      e&&e.preventDefault();
      this.setField('pagenum',1);
      this.attr.pageNum = 1;
      this.load();
    };
    this.pageUpdate = function(e) {
      this.attr.pageNum = this.attr.pageNum + 1;
      this.setField('pagenum',this.attr.pageNum);
      this.load(true);

    };
    this.load = function(update){
      this.attr.urlRequest = this.node.getAttribute('action')+"&"+this.$node.serialize();
      this.trigger('searchFormRequest', {href:this.attr.urlRequest,update:update});
    }

    this.addField = function(name,value){
      this.$node.append(this.attr.template.replace('{{name}}',name).replace('{{value}}',value));
      return this.findField(name); 
    };
    this.findField = function(name){
      return this.$node.find('[name='+name+']');
    };

    this.removeField = function(name){
      var s = this.findField(name);
      s.remove();
    };
    this.setField = function(name,value){
      var s = this.findField(name);
      if(s.length===0) {
        s = this.addField(name,value);        
      }
      s.val(value);
    };

    this.updateFolderFilter = function(e, data){
      var fn = data.filtername;
      var tI = data.typeid;
      this.setField(data.filtername, data.typeid);
      this.docRequested();
    };


    this.after('initialize', function () {
     this.on(this.$node, "click", {
       'thelink': this.docRequested
     });
     this.on(document,'folderChanged',this.updateFolderFilter);
     this.on(document, 'nextdocPage',this.pageUpdate)   
     this.setField('pagenum',1);

   });
  }

  return defineComponent(DocumentsSearch);
});

