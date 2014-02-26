// define(
//   [
//     'component_ui/link-toggle',
//     'component_ui/toggle',
//     'component_data/folder-data',
//     'component_ui/folder-list',
//     'component_ui/folder-holder',
//     'component_ui/document-search-form',
//     'component_ui/pickadate',
//     'component_ui/block-toggle',
//     'component_ui/form-toggle',
//     'component_ui/availability',
//     'component_ui/sticky',
//     'component_ui/main-search',
//     'component_ui/visibility',
//     'component_ui/modal-window',
//     'component_ui/modal-toggle',
//     'component_data/block-data',
//     'component_ui/load-more',
//     'bower/bootstrap/dist/js/bootstrap.min'
//   ]
//   ,function (linkToggler,ToggleButton,FolderData,FolderList,FolderHolder,SearchForm,PickaDate,blockToggler,formToggler,Availability, Sticky, MainSearch, Visibility,  ModalWindow, ModalToggle, BlockData, LoadMore) {
//   'use strict';
  
//   return function () {

//         FolderData.attachTo(document);
//         LoadMore.attachTo('.loadmore');
//         ToggleButton.attachTo('.widget-toggle');
//         FolderList.attachTo('.widget-doc-folders')
//         FolderHolder.attachTo('.folder-doc-list-holder')
//         SearchForm.attachTo('.widget-search-form')
//         PickaDate.attachTo('.widget-pickdate')
//         blockToggler.attachTo('.widget-block-toggler')
//         linkToggler.attachTo('.widget-tabs-simple')
//         linkToggler.attachTo('.widget-tabs')
//         linkToggler.attachTo('.widget-link-tabs')

//         formToggler.attachTo('.widget-form-toggler')
//         Availability.attachTo('.widget-availability')

//         Sticky.attachTo('.widget-sticky')
        
//         MainSearch.attachTo('.widget-main-search')
        
//         Visibility.attachTo('.widget-visibility');

//         ModalWindow.attachTo('.widget-modal');

//         ModalToggle.attachTo(document);


//           //  //Костыль - потом разнести
//           $("a[rel~=popover], .has-popover").popover();
//           $("a[rel~=tooltip], .has-tooltip").tooltip();
//           $("a[rel~=nofollow]").tooltip();

//           /*if(!$.cookie('sawBeta')) {
//             $.cookie('sawBeta', true, { path: '/' });
//             $("#beta-modal").trigger("openModal",{url:"beta-info"});
            
//           };*/
//           //Суровый костыль
//           $('.universal-4.prl .widget-news .f-btn-pad').remove();


            
//           // $('.loadmore').on('click',function(){
//           //   $(document).trigger('nextdocPage');
//           // });
//           $('.external-link').on('click',function(){
//             // window.location.href = this.dataset.link
//             window.open(
//               this.dataset.link,
//               '_blank' 
//               );
//           });

//           var lisSl = $('.slider-container li'); 


//           $(window).on('resize',function(){
//             lisSl.width($('.slider-container').width());
//             $('.slider-controller li').eq(0).click();
//           });
//           //Еще более суровые костыли - фуфуфу

//           lisSl.width($('.slider-container').width());


//           $('video').mediaelementplayer();
//           $('.mobile-menu-icon').on('click',function(e){
//             e&&e.preventDefault();
//             $('body').toggleClass('opened-mobile-menu')
//           });
//           setTimeout(function(){
//             NProgress.done();
//           },8000)
//           // $(document).trigger('scrollstop');
//   }

// });
