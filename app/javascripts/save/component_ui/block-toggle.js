define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  
  function blockToggler() {
    this.defaultAttrs({
      link: 'a'
    });

    this.toggleBlock = function(e,data) {
      e.preventDefault();
      data.targ = data.targ.replace("#","");
      if(this.attr.objidss.indexOf(data.targ)===-1) return false;
      this.attr.objcs.forEach(function(o){
        o.className = o.className.indexOf('hidden')!=-1?o.className:o.className+" hidden"; 
      });
      var op = this.objectToToggle(data.targ);
      op.className = op.className.replace('hidden','')
    };
    
    this.objectToToggle = function(id){
      return this.attr.objcs.filter(function(o){return o.id===id;})[0]
    };

    this.updateObjects = function(){
      var ar =  this.attr.objids;
      var objAr = [];
      for(var i=0;i<ar.length;i++) {
        var o = document.getElementById(ar[i].trim());
        objAr.push(o);
      };
      this.attr.objcs = objAr; 
    };

    this.after('initialize', function () {
     var st = this.attr.objidss =  this.node.dataset.toggleids;
     this.attr.objids = st.split(',');
     this.updateObjects();
     this.on(document,'linkClicked',this.toggleBlock);
   });

  }
  return defineComponent(blockToggler);
});

