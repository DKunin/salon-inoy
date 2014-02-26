define(function(require) {

  function ScrollControll() {
    this.defaultAttrs({
      home: $("html, body")
    });

    this.scrollDown = function(){
      this.attr.home.animate({ scrollTop: this.getLastScrollHandler() }, 500);
    };

    this.getLastScrollHandler = function(){
      var last = this.$node.find('.scrollHere').last();
      if(last.length===0) {
        return 0;
      };
      return last.offset().top;
    }

    this.fiddleWithScrollHandler = function(theclass){
      var curLast = this.$node.find(theclass).last(); 
      curLast.addClass('scrollHere');
    };
  }

  // return the mixin function
  return ScrollControll;

});