//= libs/carousel.js
//= libs/jquery.min.js
//= libs/minimized.js
//= libs/tiny-slider.js

var used=[];
function checkIt(e){
    if( !~used.indexOf( this)) used.push( this), e.preventDefault();
}
$('.navigation-menu-list').on('click',checkIt);