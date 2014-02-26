define(function(require) {

  function requestData() {

    this.makeRequest = function(url){
       var deferred = $.Deferred();
       $.ajax({
        url: url.replace('?','.js?'),
        success:function(d){
          deferred.resolve(d);
        },
        error:function(d){
          //Какой-то пипец, почему возвращаетс ошибка?
          deferred.resolve(d.responseText);
        }
        });
        return deferred.promise();  
    }
        this.makeCleanRequest = function(url){
       var deferred = $.Deferred();
       $.ajax({
        url: url,
        success:function(d){
          deferred.resolve(d);
        },
        error:function(d){
          //Какой-то пипец, почему возвращаетс ошибка?
          deferred.resolve(d.responseText);
        }
        });
        return deferred.promise();  
    }

  }

  // return the mixin function
  return requestData;

});