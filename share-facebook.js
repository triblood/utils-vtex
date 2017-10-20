var longURL = window.location.href;
var local = longURL;
var imagem = $('.sku-rich-image-main').attr('src');
var titulo = $('.productName').text();
var descrip = $('.productDescription').text();

$('head').prepend('<meta property="og:url"			content="'+local+'" />');
$('head').prepend('<meta property="og:title"		content="Confira minha lista de desejo '+titulo+'" />');
$('head').prepend('<meta property="og:type"			content="website" />');
$('head').prepend('<meta property="og:description"	content="'+descrip+'" />');
$('head').prepend('<meta property="og:image"		content="'+imagem+'" />');

$('.social').append('<a class="single-facebook fa fa-facebook-square" aria-hidden="true" href="http://www.facebook.com/sharer.php?u='+local+'"></a>');

$('.single-facebook').click(function(e) {
  var id = $(this).data("windowid");
  if(id == null || id.closed) {
    id =  window.open($(this).attr("href"), 'modal=yes','width=500,height=400,left=400,top=100');
  }
  id.focus();
  $(this).data("windowid", id);
  e.preventDefault();
  return false;
});