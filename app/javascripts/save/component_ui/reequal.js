define(['flight/lib/component'],function (defineComponent) {
  'use strict';

  function Reequal() {
    this.collectHeight = function(a,l){
      var heights = {};
      var row = 0; 
      var newrow = 0; 
      for(var i=0;i<l;i++) {
        if(row>=3) {
          newrow++;
          row = 0;
        };
        row++;
        if(!heights[newrow]) {
          heights[newrow] = [];
        }
        heights[newrow].push(a[i].offsetHeight);
      };
      var maxes = {};
      for(var el in heights) {
        maxes[el] = _.max(heights[el]); 
      };      
      //this.attr.maxh = _.max(heights);
      this.reequal(a,l,maxes);
    };

    this.reequal = function(a,l,maxes){    
      var row = 0; 
      var newrow = 0; 

      for(var i=0;i<l;i++) {
        if(row>=3) {
          newrow++;
          row = 0;
        };
        row++;        
        a[i].style.height = maxes[newrow] + "px";
      };


    };

    this.after('initialize', function () {
      this.attr.anchors = this.$node.find('a.f-link-arrow');
      var l = this.attr.anchors.length;
      var a = this.attr.anchors;
      this.collectHeight(a,l);
   
   });
  }
  
  return defineComponent(Reequal);

});

