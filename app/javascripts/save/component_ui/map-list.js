define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function MapList() {

    this.defaultAttrs({
      'theLink': 'a.maptrigger',
      'closebtn':'.close-btn',
      'statsGo': 'button',
      'regLink':'reg-link'
    });
    this.openPage = function(e,targ) {
      e.preventDefault();
      e.stopPropagation();
      console.log('clicked')
      var link = targ.el.dataset.link;
      window.open(link,'_blank');      
    };
    this.folderClicked = function(e,targ) {
      e.preventDefault();
      var tar = targ.el
      this.attr.curopened.addClass('closed')
      this.attr.curopened = $(tar).closest('li.man.closed').removeClass('closed');
      var href = tar.getAttribute('href');
      this.trigger(document,"dictrictChosenList",{targ:href});
    };
    this.folderClose = function(e, targ) {
      $(targ.el).closest('li.man').addClass('closed');
      this.trigger(document,'noDistrictSelected');
    };
    this.clickFolder = function(e,d) {
      var find = this.$node.find('[href='+d.targ+']')
      find.click();
    };

    this.after('initialize', function () {  
     this.attr.curopened = this.$node.find('li.man:not(.closed)');
     this.on(this.$node, "click", {
       'theLink': this.folderClicked,
       'closebtn' :this.folderClose,
       'statsGo': this.openPage,
       'regLink': this.openPage
     });
     this.on(document,"districtChosen",this.clickFolder)
   });
  }
  return defineComponent(MapList);

});

