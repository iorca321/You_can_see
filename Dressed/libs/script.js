var used=[];
function checkIt(e){
    if( !~used.indexOf( this)) used.push( this), e.preventDefault();
}
$('.navigation-menu-list').on('click',checkIt);