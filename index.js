//remove scrollbar
var parent = document.getElementById('container');
var child = document.getElementById('scrollable');
child.style.paddingLeft = (child.offsetWidth - child.clientWidth)/2 + "px";
child.style.paddingRight = child.style.paddingLeft; 

function enableScrollAnimation(before){
   $("#scrollable").scroll(() => {
      $("#scrollable").unbind("scroll");
      console.log(child.scrollTop, $(window).height(), before);
      if(child.scrollTop > (before * $(window).height())){
         $('#scrollable').animate({
            scrollTop: (before * $(window).height()) + $(window).height()
         }, 800, () => {
            if($(".welcome").css("display") != "none"){
               $(".welcome").css("display", "none")
               before = 0;
            }
            setTimeout(()=>{
               enableScrollAnimation(before)
            }, 150);
         })
         before++;
      } else if(child.scrollTop < (before * $(window).height())) {
         $('#scrollable').animate({
            scrollTop: (before * $(window).height()) - $(window).height()
         }, 800, () => {
            setTimeout(()=>{
               enableScrollAnimation(before)
            }, 150)
         })
         before--;
      }
   });
};

$(document).ready(()=>{
   enableScrollAnimation(0);
   $(".welcome h1").one("animationend", function () {
      $(".welcome #next-page svg").css({
         "cursor": "pointer",
         "opacity": "1",
         "pointer-events": "initial"
      });
   });
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
         }, 150);
      })
   });
});


