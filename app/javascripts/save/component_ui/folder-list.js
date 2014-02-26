define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function FoldersList() {
    this.defaultAttrs({
      thelink: 'a',
      selected: '',
      filterName: 'doctype'
    });

    this.folderClicked = function(e,targ) {
      e.preventDefault();
      var href = targ.el.getAttribute('href')
      var typeId = targ.el.dataset.typeid;
      var filterName = targ.el.dataset.filtername;
      this.removeSelection();
      targ.el.className += " selected"; 
      this.attr.selected = targ.el;
      this.trigger('folderChanged',{href:href, typeid:typeId, filtername:filterName||this.attr.filterName})
    }
    
    this.removeSelection = function(){
      if(this.attr.selected){
        this.attr.selected.className = this.attr.selected.className.replace("selected","") 
      }
    }

    this.after('initialize', function () {
      
     this.on(this.$node, "click", {
       'thelink': this.folderClicked
     });

   });
  }
  return defineComponent(FoldersList);

});

