define(["lib/bower/toastr/toastr.min",
  "lib/pathfinding-browser.min"
  ],function(Toastr, PathFind){
    window.toastr = Toastr;
  	window.PF = PathFind;
   	window.Finder = new PathFind.BestFirstFinder();
   	function printValue(sliderID, textbox) {
            var x = document.getElementById(textbox);
            var y = document.getElementById(sliderID);
            x.value = y.value;
     };
     window.printValue = printValue;

    function shuffle(array) {
      var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };   

    window.shuffle = shuffle;
  })