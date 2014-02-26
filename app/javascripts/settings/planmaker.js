define([],function(){

    function planMaker(selector, map) {
      var $selector = $(selector);
      //$selector.empty();
      for ($i = 0; $i < map.colision.length; $i++) {
        for ($j = 0; $j < map.colision[0].length; $j++) {
          if (selector === ".first-plan") {
            var bg = map.firstPlan[$i][$j];
          } else if (selector === ".second-plan") {
            var bg = map.secondPlan[$i][$j];
          } else if (selector === ".third-plan") {
            var bg = map.thirdPlan[$i][$j];
          } else if (selector === ".fourth-plan") {
            var bg = map.thirdPlan[$i][$j];
          }
          if (bg != 0) {
            var spriteWidth = 24;
            $bgy = bg > spriteWidth ? Math.floor((bg / spriteWidth)) * map.slotSize : 0;
            $bgx = bg > spriteWidth ? (bg % spriteWidth) * map.slotSize : bg * map.slotSize;
            $selector
            .append("<div class='tiletile' style='background-position: "+ (-$bgx + "px" + " " + -$bgy + "px") + "'></div>");
          } else {
            $selector.append("<div style='width: 32px; height: 32px; float: left;'></div>");
          }
        }
      }
    }
    return planMaker;

})
