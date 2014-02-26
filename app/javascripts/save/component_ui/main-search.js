define(['flight/lib/component'],function (defineComponent) {
  'use strict';
  function MainSearch() {
    this.defaultAttrs({
      // 'defaultStickClass':'stuck'
    });

    this.toggleSearchBox = function(e){
      e&&e.preventDefault();
      $('.main-menu, .search-button').toggleClass('hidden');
      $('.big-search').toggleClass('hidden').toggleClass('click-trap').find('input').focus();

    }

    this.after('initialize', function () {
     var self = this;
     this.on(document,'search-form-open',this.toggleSearchBox)
     this.on(this.$node,'click',this.toggleSearchBox)
     $('.big-search')
     .off()
     .on('click','span',this.toggleSearchBox)
     .focusout(function(){
       self.toggleSearchBox();
     })
   });
  }
  return defineComponent(MainSearch);

});

