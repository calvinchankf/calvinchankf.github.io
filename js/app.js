// $(document).foundation()

$(function(){

  var wow = new WOW().init();

  var currentHeaderIdx = 0;
  var headers = $(".header").children();

  // animate headers
  setInterval(function(){
    headers.eq(currentHeaderIdx).fadeOut(1500);
    var nextIdx = currentHeaderIdx;
    if (currentHeaderIdx + 1 == headers.length) {
      nextIdx = 0;
    } else {
      nextIdx += 1;
    }
    headers.eq(nextIdx).fadeIn(1500, function() {
      currentHeaderIdx = nextIdx;
    });
  }, 3000);

  // viewDidLoad
  headers.eq(1).hide();
  headers.eq(2).hide();

});
