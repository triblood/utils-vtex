$('.vitrine li .buy-button-normal a').each(function(){
  var liAtual = $(this);
  
  var idSKU = $(this).attr('href').replace('https://www.leader.com.br/checkout/cart/add?sku=','').replace('&qty=1&seller=1&sc=1&utm_source=FMC&utm_campaign=fantastico_mundo_da_crianca&utm_medium=FMC','');
 
  
  
  $.ajax({                
	 headers:{
		"x-vtex-api-appKey":"vtexappkey-leader-VRRXCF",
		"x-vtex-api-appToken":"AUINCHYDCRSCMRBAIJQHAXTQGGGBZESILPFHJCSXTQMQBCLKHMOUVZODBSGVAWDYYJRWMTRGRSOKKCOEVVTMPYNLACGQWWWWMORRLOYOVICCLESYECZFCQIZWFWKMBJU"
	},                
		type: "POST",
		contentType: "application/json",
		dataType:"json",
		data:JSON.stringify([ {"id":idSKU}]),
		url: "/api/logistics/pvt/inventory/itemsbalance"                                                      
   })
   .done(function(data){
             // console.log(data)
             $(liAtual).parent().append('<div class="estoque">'+data[0].quantity+'</div>');
              console.log(idSKU + '-' + data[0].quantity);
   });
});














$.ajax({
          headers:{
                "x-vtex-api-appKey":"xxxxxxxxxxxxxx",
                "x-vtex-api-appToken":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
           },                
           type: "POST",
           contentType: "application/json",
           dataType:"json",
           data:JSON.stringify([ {"id":"1"}]),
           url: "/api/logistics/pvt/inventory/itemsbalance"                                                    
 }).
 done(function(data){
          console.log(data);
 });