define(
  [
   "jquery",
   "underscore",
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
  "component_data/client-logs-data",
  "component_ui/client-logs-ui",
  "lib/shim",
  "lib/bower/jquery-colorbox/jquery.colorbox-min"
  ],
  function() {
    setTimeout(function(){
    NProgress.start();
    },500);
    setTimeout(function(){
      NProgress.done();
    },3000);

    var map = arguments[4];

    var planMaker = arguments[5];
     planMaker(".first-plan", map);
     planMaker(".second-plan", map);
     

  var getCoords = function(d){
    var coords = {};
    var temp = $(d).position();
    coords.x = temp.left/32 + 1;
    coords.y = temp.top/32 + 1;
    return coords;
  };
  var gotoTile;

  $('.second-plan').on('click','div', function(e){
    gotoTile&&gotoTile.removeClass('goto-tile');
    gotoTile = $(e.target);
    gotoTile.addClass('goto-tile');
    setTimeout(function(){
      gotoTile.removeClass('goto-tile');
    },2000)
    $(document).trigger('charecter-move',{coords: getCoords(e.target)});
  });
    var attachments = [];
    for(el in arguments) {
      if(arguments[el]) {
        attachments.push(arguments[el].toString())
      };
    };

    arguments[6].attachTo("body");
    arguments[7].attachTo(".char-area");
    arguments[8].attachTo(document);
    arguments[9].attachTo(".cases-holder");
    arguments[10].attachTo("body");
    arguments[11].attachTo(document);
    arguments[12].attachTo(document);
    arguments[13].attachTo(".playerStats");
    
    arguments[14].attachTo(document);
    arguments[15].attachTo(".dictionary-holder");

    arguments[16].attachTo(document);
    
    arguments[17].attachTo(document);

    arguments[18].attachTo('.top-menu');
    arguments[19].attachTo('.level-result');

    arguments[20].attachTo(document);
    //arguments[22].attachTo(document);
    arguments[21].attachTo(".clientlog-holder");

    //toastr.options.showMethod = 'slideUp'; 
    //toastr.options.showEasing = 'easeOutBounce';
    toastr.options.hideMethod = 'fadeOut'; 
    toastr.options.positionClass = 'toast-top-full-width'; 
    toastr.options.showMethod = 'slideDown'; 

    $(document).trigger("remoteAction",{action:"openWelcomeScreen"});
    $(document).trigger('startLevel', {level:1})
    $(document).trigger('createChar',{id:'main',pos:[8,8]});

    var zoneBtnsHolder = $('.zoneButtonsHolder ul');
    $(document).on('enteredZone', function(e,d){
      zoneBtnsHolder[0].className = 'zone'+d.code;
    });
//End of define
});
