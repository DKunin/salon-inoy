define(function (require) {
  'use strict';
      function prepareList() {
      // $('#expList').find('li:has(ol)').unbind('click').click(function(event) {
      //   if(this == event.target) {
      //     $(this).toggleClass('expanded');
      //     $(this).children('ol').toggle('medium');
      //   }
      //   return false;
      // }).addClass('collapsed').removeClass('expanded').children('ol').hide();

      //Hack to add links inside the cv
      // $('a[rel=nofollow]').on('click',function(e){
      //   return false()
      //   // e.preventDefault();
      //   console.log(this);
      // })
      $("#organisations-list").sortable({
        update: function ( event, ui ) {
          serialized = $("#organisations-list").sortable("serialize");
          $.post('organisations/reorder?', serialized, function(data){
          });
        }
      });

      $("#directions-list").sortable({
        update: function ( event, ui ) {
          serialized = $("#directions-list").sortable("serialize");
          $.post('directions/reorder?', serialized, function(data){
          });
        }
      });

      $('#expList').on('click','li:has(ol)',function(event){
        if(this == event.target) {
          $(this).toggleClass('expanded');
          $(this).children('ol').toggle('medium');
        }
      });
      $('#expList li:has(ol)').addClass('collapsed').removeClass('expanded').children('ol').hide();
      createSortable();
    }
    
    function createSortable(){
      $('ol.sortable').nestedSortable({
        start: function (e, ui) {
          //ui.item.show().addClass('sortable-source-highlight');
        },
      stop: function(e, ui){
        //$('.ui-state-highlight').removeClass('ui-state-highlight');
        //ui.item.removeClass('sortable-source-highlight');
      },
      disableNesting: 'no-nest',
      forcePlaceholderSize: true,
      handle: 'div',
      helper: 'clone',
      items: 'li',
      opacity: .6,
      placeholder: 'placeholder',
      revert: 250,
      tabSize: 25,
      tolerance: 'pointer',
      toleranceElement: '> div',
      isTree: true,
      startCollapsed: true,
      update: function ( event, ui ) {
        var serialized = $('ol.sortable').nestedSortable('serialize');
        $.post('pages/reorder?id=' + ui.item.attr("page"), serialized, function(data){
          //page = ui.item.attr("page"); 
          //alert($.grep(arr, function(e){ return e.id == page; }));
        });
      }
    });
      
    }
    prepareList();
});

