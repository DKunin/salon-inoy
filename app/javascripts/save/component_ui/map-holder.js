define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function MapHolder() {

    this.defaultAttrs({
      'theLink': 'g',
      'resized': false
    });

    this.holderToggled = function(e,d){
      e&&e.preventDefault();
      var that = this;//||that.attr.resized
      if(!d.status) return false;
        that.zoom(d.status);
        that.$node.hide();
        
          that.$node.fadeIn(that.attr.resized?0:300);
        
        that.attr.resized = true;    
    };

    this.selectFromList = function(e,targ) {
      var tar = this.$node.find('#'+targ.targ);
      this.switchClasses(tar);
    };

    this.switchClasses = function(d) {
      this.attr.selectedDistrict&&this.attr.selectedDistrict.removeSvgClass('selected')
      this.attr.selectedDistrict = d.addSvgClass('selected');
    };

    this.noDistrictSelected = function(){
      this.switchClasses($());
    };
    this.zoom = function(force){  
      if(force||this.$node.is('visible')){
        this.$node.find('svg').zoomToSelf();
      }
    }

    this.groupClicked = function(e,targ){
      e&&e.preventDefault();
      var name = targ.el.id;
      this.trigger(document,"districtChosen",{targ:name});
      this.switchClasses($(targ.el));
    };

    this.after('initialize', function () {  
      this.on(document,"classToggleFinished",this.holderToggled)
      this.on(document,"dictrictChosenList",this.selectFromList);
      this.on(document,'noDistrictSelected', this.noDistrictSelected);
     this.on(this.$node, "click", {
       'theLink': this.groupClicked
     });
     this.zoom();
     this.on(document,'windowResize',this.zoom)


   });
  }
  return defineComponent(MapHolder);

});

