function atualizaCartKit(){
  
  var precoKit = 0;
  var itemPos = 1;
  var montaSkuKit = "javascript:alert('Por favor, selecione o modelo desejado.');";
  var montaqtd;
  var montaseller;
  $('.kitModule > .kit.addCart').each(function(){
    
    if($(this).find('.kitseletor-sku').text().length > 0){
  
      var verifCart = $(this).find('a.buy-in-page-button').attr('href');
  
      if(verifCart.indexOf('Por favor, selecione o modelo desejado.') === -1){
        var vlrItem = $(this).find('.skuBestPrice').text().replace('R$ ','').replace('.','').replace(',','.').toString();
        precoKit = parseFloat(precoKit) + parseFloat(vlrItem);
        var skuItem = verifCart.split('sku=')[1].split('&qty=')[0];
        var qtd = "&qty=1";
        var seller = "&seller=1";
        
        if(itemPos === 1){
          montaSkuKit = '?sku=' + skuItem;
          montaqtd = qtd;
          montaseller = seller;
        }

        if(itemPos > 1){
          montaSkuKit = montaSkuKit + '&sku=' + skuItem;
          montaqtd = montaqtd + qtd;
          montaseller = montaseller + seller;
        }
        
        itemPos++;
      }
  
     }
  });
  if(montaSkuKit.indexOf("javascript:alert('Por favor, selecione o modelo desejado.');") === -1){
    montaSkuKit = "/checkout/cart/add"+montaSkuKit+montaqtd+montaseller+"&sc=1";
  }
  var parcelaKitNum = $('.prodInfo .skuBestInstallmentNumber').text().replace('x','').toString();
  var parcelaKit = precoKit / parcelaKitNum;
  $('.prodInfo .skuBestPrice').text('R$ ' + precoKit.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  $('.prodInfo .skuBestInstallmentValue').text('R$ ' + parcelaKit.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  $('.prodInfo .btComprar .buy-button').attr('href',montaSkuKit)
}

$('.kit a.buy-in-page-button').each(function(){
  $(this).parent().prepend('<div class="buy-in-page-button">+ Adicionar produto</div>');
  $(this).hide();

});
atualizaCartKit();


$('div.buy-in-page-button').live('click', function(){
  if( $(this).parent().find('a.buy-in-page-button').attr('href').indexOf('Por favor, selecione o modelo desejado') > -1 ){
    alert('Por favor, selecione o modelo desejado.');
    
  } else {

    if($(this).hasClass('addCart')){
      $(this).removeClass('addCart');
      $(this).parent().parent().removeClass('addCart');
      $(this).text('+ Adicionar produto');
    } else{
      $(this).addClass('addCart');
      $(this).parent().parent().addClass('addCart');
      $(this).text('+ Produto adicionado');
    }
    
    atualizaCartKit();
  }
});