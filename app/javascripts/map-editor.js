define(
  [
  "jquery",
  "underscore",
  "lib/bower/momentjs/min/moment.min",
  "moment/lang/ru",
  "flight/lib/index",
  "bower/nprogress/nprogress",
  "settings/map",
  "settings/planmaker",
  "component_ui/keyboard",
  "component_ui/charecter",
  "component_data/cases-data",
  "component_ui/cases",
  "component_ui/actionDispatcher",
  "component_ui/modalController",
  "component_data/playerStatsData",
  "component_ui/playerStatsUi",
  "component_data/dictionary-data",
  "component_ui/dictionaryUi",
  "component_data/level-controller",
  "component_data/progress-bar-controller",
  "component_ui/top-menu-ui",
  "component_ui/day-results-ui",
  "lib/shim",
  "lib/bower/jquery-colorbox/jquery.colorbox-min",
  ],
  function() {

    var map = arguments[6];

    var planMaker = arguments[7];
     planMaker(".first-plan", map);
     planMaker(".second-plan", map);


  var getCoords = function(d){
    var coords = {};
    var temp = $(d).position();
    coords.x = temp.left/32;
    coords.y = temp.top/32;
    return coords;
  };
  var gotoTile;
  $('.second-plan').on('change','.tileinput',function(){
    var ti = $('.tileinput').eq(0);
    var newVal = ti.val();
    var co = ti.data('coords');
    map.secondPlan[co.y][co.x] = newVal;
    $(".second-plan").empty();
    planMaker(".second-plan", map);

    ti.blur().remove();
  });
  setInterval(function(){
        $.post(
      '/savemap',
      map,
      function(){
        console.log("saved");
      }
    );
      },10000);
  var $ghost = $('.ghost-plan');
  var count = 0;
  console.log(map.colision.length, map.colision[0].length)
      for ($i = 0; $i < map.colision.length; $i++) {
        for ($j = 0; $j < map.colision[0].length; $j++) {
            $ghost
            .append("<div style='width: 32px; height: 32px; float: left; background: url(" + map.tileset + ")" + (-$j*32 + "px" + " " + -$i*32 + "px") + ";' name='" + count + " '>"+count+"</div>");
            count++;
        }
      }
  $('.second-plan').on('click','div', function(e){
    gotoTile&&gotoTile.removeClass('goto-tile');
    gotoTile = $(e.target);
    $('.tileinput').blur().remove();
    //gotoTile.addClass('goto-tile');
    var co = getCoords(e.target);
    $(this).append('<input type="text" class="tileinput">');
    $('.tileinput').data('coords',co).focus().val(map.secondPlan[co.y][co.x]);

  });




});
