function enableScrollAnimation(before){
   var offTime;
   if($(window).height() > $(window).width()){
      offTime = 500;
   } else {
      offTime = 150;
   }
   $("#scrollable").on("scroll", function () {
      $("#scrollable").unbind("scroll");
      console.log($("#scrollable").scrollTop(), $(window).height(), before);
      if($("#scrollable").scrollTop() > (before * $(window).height())){
         $('#scrollable').animate({
            scrollTop: (before * $(window).height()) + $(window).height()
         }, 800, () => {
            if($(".welcome").css("display") != "none"){
               $(".welcome").css("display", "none")
               before = 0;
            }
            setTimeout(()=>{
               enableScrollAnimation(before)
            }, offTime);
         })
         before++;
      } else if($("#scrollable").scrollTop() < (before * $(window).height())) {
         $('#scrollable').animate({
            scrollTop: (before * $(window).height()) - $(window).height()
         }, 800, () => {
            setTimeout(()=>{
               enableScrollAnimation(before)
            }, offTime)
         })
         before--;
      }
   });
};

$(document).ready(()=>{
   $(".welcome h1").one("animationend", function () {
      $("#scrollable").css("overflow-y", "auto");
      var parent = document.getElementById('container');
      var child = document.getElementById('scrollable');
      child.style.paddingLeft = (child.offsetWidth - child.clientWidth)/2 + "px";
      child.style.paddingRight = child.style.paddingLeft;
      $(".welcome #next-page svg").css({
         "cursor": "pointer",
         "opacity": "1",
         "pointer-events": "initial"
      });
      enableScrollAnimation(0);
   });
   var offTime;
   if($(window).height() > $(window).width()){
      offTime = 500;
   } else {
      offTime = 150;
   }
   $(".welcome #next-page svg").one("click", function () {
      $("#scrollable").unbind("scroll");
      $('#scrollable').animate({
         scrollTop: $(window).height()
      }, 800, () => {
         if($(".welcome").css("display") != "none"){
            $(".welcome").css("display", "none")
         }
         setTimeout(()=>{
            enableScrollAnimation(0)
         }, offTime);
      })
   });
});


