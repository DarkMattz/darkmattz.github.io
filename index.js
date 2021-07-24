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
   var inHover = false;
   $(".light-toggle .toggle").hover(function(){
      inHover = true;
   }, function(){
      $(".light-toggle p").css("animation", "none");
   });
   $(".light-toggle p").attr("data", "LET IT SHINE!!!");
   $(".light-toggle .toggle input").on("click", function(){
      if($(".light-toggle .toggle input:checked").length > 0){
         $("body").css("animation", "ColorSwiftWhite 3s ease 1 forwards");
         $(".welcome #next-page svg").css("animation", "SVGBlack 3s ease 1 forwards");
         if(inHover){
            $(".light-toggle p").css("animation", "TextChangeA 3s ease 1");
         }
         $(".light-toggle p").attr("data", "BEGONE LIGHT!!!");
      } else {
         $("body").css("animation", "ColorSwiftBlack 3s ease 1 forwards");
         $(".welcome #next-page svg").css("animation", "SVGWhite 3s ease 1 forwards");
         if(inHover){
            $(".light-toggle p").css("animation", "TextChangeB 3s ease 1");
         }
         $(".light-toggle p").attr("data", "LET IT SHINE!!!");
      }
   });
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
      $(".toggle").css({
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


