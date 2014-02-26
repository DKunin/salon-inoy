define(function(require) {

  function Serialize() {

    this.serialize = function(data){
      var arr = [];
      for(var el in data) {
        arr.push(el+"="+data[el]);
      };
      return arr.join("&");
    };
  }
  // return the mixin function
  return Serialize;

});