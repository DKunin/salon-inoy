// define([
//   'bower/bootstrap/dist/js/bootstrap.min',
//   'bower/select2/select2.min',
//   'lib/jquery.ui.core',
//   'lib/jquery.ui.widget',
//   'lib/jquery.ui.mouse',
//   'lib/jquery.ui.spinner',
//   'lib/jquery.ui.sortable',
//   'lib/jquery.ui.datepicker',
//   'lib/jquery-timepicker',
//   'lib/jquery-timepicker-ru',
//   'lib/jquery.mjs.nestedSortable',
//   'lib/nested-form',
//   'component_ui/sortable',
//   // 'lib/jquery.cleditor',
//   'lib/ckeditor',
//   //'lib/config'
//     ], function () {

//       'use strict';

//       return initialize();

//       function initialize() {

//         var myControl=  {
//           create: function(tp_inst, obj, unit, val, min, max, step){
//             $('<input class="ui-timepicker-input" value="'+val+'" style="width:50%">')
//             .appendTo(obj)
//             .spinner({
//               min: min,
//               max: max,
//               step: step,
//             change: function(e,ui){ // key events
//                 // don't call if api was used and not key press
//                 if(e.originalEvent !== undefined)
//                   tp_inst._onTimeChange();
//                 tp_inst._onSelectHandler();
//               },
//             spin: function(e,ui){ // spin events
//               tp_inst.control.value(tp_inst, obj, unit, ui.value);
//               tp_inst._onTimeChange();
//               tp_inst._onSelectHandler();
//             }
//           });
//             return obj;
//           },
//           options: function(tp_inst, obj, unit, opts, val){
//             if(typeof(opts) == 'string' && val !== undefined)
//               return obj.find('.ui-timepicker-input').spinner(opts, val);
//             return obj.find('.ui-timepicker-input').spinner(opts);
//           },
//           value: function(tp_inst, obj, unit, val){
//             if(val !== undefined)
//               return obj.find('.ui-timepicker-input').spinner('value', val);
//             return obj.find('.ui-timepicker-input').spinner('value');
//           }
//         };


//     //Костыль - потом разнести
//     /*$("#datetime").datetimepicker({
//         controlType: myControl
//       });*/
// require(['lib/jquery-timepicker-ru'],function(){
//   $("[data-behavior='datetime-picker']").datetimepicker({controlType: myControl});
// });
//     /*require(['/assets/locales/bootstrap-datetimepicker.ru'],function(){
//       $("[data-behavior='datetime-picker']").datetimepicker({language: 'ru'});
//     });*/
// var getPositions = function(term) {
//   return $.get('/admin/attachments.js?file_type=' + encodeURIComponent(term));
// };

// var getVersions = function(period, user) {
//   return $.get('/admin/versions.js?stat_period=' + encodeURIComponent(period) + '&stat_user=' + encodeURIComponent(user));
// };



// $('#file_type').change(function() {
//   return getPositions($(this).val());
// });


// $('#stat_period').change(function() {
//   return getVersions($(this).val(), $('#stat_user').val());
// });
// $('#stat_user').change(function() {
//   return getVersions($('#stat_period').val(), $(this).val());
// });

// var include_option = function(val, array){
//     for (var i = 0; i < array.length; i++) {
//         if (array[i].value === val.value) {
//             return true;
//         }
//     }
//     return false;
// };

// $('#page_p_type').change(function() {
//   //return renderPagesForm($(this).val(), $('#formobj').val());
//   if ($(this).val() == "Documents"){
//     //document.getElementById("hide-widgets").style.display="none";
//     $("#hide-widgets").hide();
//     $(".page_enable_news").hide();
//     $('[addition_categories_field]').show();
//   }else{
//     //document.getElementById("hide-widgets").style.display="";
//     $("#hide-widgets").show();
//     $(".page_enable_news").show();
//     $('[addition_categories_field]').hide();
//   }
//   /*$('.page_document_categories:visible').val($('.page_document_categories:hidden').val());
//   $('.page_document_categories:hidden').val("");*/
// });

// $('[original_categories_field]').change(function() {
//   //$('[addition_categories_field]').html($(this).html());
//   //$('[addition_categories_field]').append($('[original_categories_field] option'));
//   //$('[addition_categories_field]').val($(this).val())
//   var selected = $('[original_categories_field] :selected');
//   var options = $('[addition_categories_field] option');
//   for (var i = 0, len = options.length; i < len; i++) {
//       if (include_option(options[i], selected)){
//         options[i].selected = true;
//       }else{
//         options[i].selected = false;
//       }
//   }
// });

// $('[addition_categories_field]').change(function() {
//   var selected = $('[addition_categories_field] :selected');
//   //$('[original_categories_field]').html($(this).html());
//   //$('[original_categories_field]').append($('[addition_categories_field] option'));
//   //$('[original_categories_field]').val($(this).val())
//   var options = $('[original_categories_field] option');
//   for (var i = 0, len = options.length; i < len; i++) {
//       if (include_option(options[i], selected)){
//         options[i].selected = true;
//       }else{
//         options[i].selected = false;
//       }
//   }
// });

// $('.add_nested_fields').on('click', function(){
//   require(['lib/jquery-timepicker-ru'],function(){
//     $("[data-behavior='datetime-picker']").datetimepicker({controlType: myControl});
//   });
// });


// // var tags_data = [
// // {text: "Должностные лица", children: [
// // {id: 1, text: "Должностное лицо 1"}, 
// // {id: 2, text: "Должностное лицо 2"}
// // ]},
// // {text: "Департаменты", children: [
// // {id: 1, text: "Департамент 1"}, 
// // {id: 2, text: "Департамент 2"}
// // ]},
// // {text: "Направления деятельности", children: [
// // {id: 1, text: "Направление 1"}, 
// // {id: 2, text: "Направление 2"}
// // ]}
// // ];

// // for(var i=3;i<100;i++) {
// //   tags_data[0].children.push({id: i, text: "Должностное лицо "+i})
// //   tags_data[1].children.push({id: i, text: "Департамент "+i})
// //   tags_data[2].children.push({id: i, text: "Направление "+i})

// // }

// NProgress.done();

//       var tagval = $('#taglist').val()
//       if(tagval) {
//       var prevTags = tagval.split(',');
//       var newData = []
//       for(var i=0,len=prevTags.length;i<len;i++) {
//         newData.push({text:prevTags[i],id:prevTags[i]})
//       };
//       }



// $("#taglist").select2({
//    initSelection : function (element, callback) {
//         var data = [];
//         $(element.val().split(",")).each(function () {
//             data.push({id: this, text: this});
//         });
//         callback(data);
//     },
//   multiple: true,
//   query: function (query){
//     var data = {results: []};
//     function searhIn(arr, par){
//       $.each(arr, function(){
//         if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 || this.children){
//           var obj = {id: this.id, text: this.text };
//           if(this.children) {
//             obj.children = [];
//             obj.children = _.filter(this.children,function(p){return query.term.length == 0 || p.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0  })||[];
//           }
//           if(par) {
//             par.children.push(obj);
//           } else {
//             data.results.push(obj);
//           }
//         }
//       });
//     };
//       searhIn(global_tags);
//           query.callback(data);
//         }
//       });
//       $("#taglist").select2('data', newData )
//       $('#taglist').on('change',function(){
//         var ra = _.map($("#taglist").select2('data'),function(d){return d.text}).join(',');
//         this.value = ra;
        
//       })

//       // $("#organisations-list").sortable({
//       //   update: function ( event, ui ) {
//       //     serialized = $("#organisations-list").sortable("serialize");
//       //     $.post('organisations/reorder?', serialized, function(data){
//       //     });
//       //   }
//       // });

//       // $("#directions-list").sortable({
//       //   update: function ( event, ui ) {
//       //     serialized = $("#directions-list").sortable("serialize");
//       //     $.post('directions/reorder?', serialized, function(data){
//       //     });
//       //   }
//       // });




//    }

//  });
