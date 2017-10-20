$(document).ready(function(){

    function initializeMap() {
      geocoder = new google.maps.Geocoder;
      var id = document.getElementById('map'),
          latlng = new google.maps.LatLng( - 10.919618, - 54.316406),
          myOptions = {
            zoom: 3,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
      map = new google.maps.Map(id, myOptions)
    }
    initializeMap();

    function criarMarcador(localizacao, info) {
        var marcador = new google.maps.Marker({
            position: localizacao,
            map: map,
            icon: new google.maps.MarkerImage("/arquivos/pin-map-v2.png")
        }),
            infowindow = new google.maps.InfoWindow({
                content: info,
                size: new google.maps.Size(50, 50)
            });
        google.maps.event.addListener(marcador, "click", function () {
            infowindow.open(map, marcador)
        })
    }

    function codeAddress(localEndereco) {
    // var address = document.getElementById("address").value;
    var address = localEndereco;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            icon: new google.maps.MarkerImage("/arquivos/pin-map-v2.png"),
            position: results[0].geometry.location
        });
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
    }
    //codeAddress();

    function zoomCidade(cidade){
        var address = cidade;
        geocoder.geocode( { 'address': address}, function(results, status) {
            map.setCenter(results[0].geometry.location),
            map.setZoom(12)
        });
    }

    $.ajax({
        url: "/arquivos/nossas_lojas-v2.xml",
        dataType: "xml",
        beforeSend: function() {
            console.log('Enviando');
        },
        success: function(xml) {
            // console.log(xml);

            $(xml).find('uf').each(function() {
                // console.log($(this).text());
                var uf = $(this).text();

                if(uf == "SC"){
                	var fullUF = "Santa Catarina"
                }
                if(uf == "PR"){
                	var fullUF = "Paraná"
                }
                if(uf == "RS"){
                	var fullUF = "Rio Grande do Sul"
                }


                if( $('select.estados').find('.uf-'+uf).length == 0 ){
                	$('select.estados').append('<option class="uf-'+uf+'" value="'+uf+'">'+fullUF+'</option>');
                 }
            });

            $(xml).find('cidade').each(function() {
        		var cidade = $(this).text();
                var uf = $(this).prev().text();
        		if($('select.cidade').find('.city-'+cidade).length == 0){
        			$('select.cidade').append('<option class="city-'+cidade+'" value="'+cidade+'-'+uf+'" style="display:none;">'+cidade+'</option>');

                    var endereco = $(this).next().find('endereco').text();
                    var endGMps = $(this).next().find('endereco').text();
                    var lat = $(this).next().find('lat').text();
                    var lng = $(this).next().find('lng').text();

                    if(lat == "N"){
                        var enderFind = endGMps + cidade + uf;
                        codeAddress(enderFind);
                    } else {
                        var enderCoord = new google.maps.LatLng( lat, lng);
                        criarMarcador(enderCoord);
                    }



        		}
        	});

            $('select.estados').change(function(){
            	$('select.cidade').find('option').hide()
            	var ufSelect = $(this).val();

            	$(xml).find('cidade').each(function() {
            		var cidade = $(this).text();
            		if( $(this).parent().find('uf').text() == ufSelect ){
            			$('select.cidade').find('.city-'+cidade).show();
            		}
            	});	
            });
      

        $('select.cidade').change(function () {
            $('.dadosLojas .resultado').html('');

        	var cidadeSelect = $(this).val();	
            var cidadeDados = cidadeSelect.split('-');
            zoomCidade(cidadeSelect);

            console.log(cidadeDados[0]);
            
            // $('.dadosLojas .resultado').append();

            $(xml).find('cidade').each(function() {
                if(cidadeDados[0] == $(this).text()){
                    var nomeLoja = $(this).next().find('nome').text();
                    var enderecoLoja = $(this).next().find('endereco').text();
                    var foneLoja = $(this).next().find('telefone').text();
                    var FuncLoja = $(this).next().find('funcionamento').text();
                    
                    $('.dadosLojas .resultado').append('<div class="loja"><h4>'+nomeLoja+'</h4><address>'+enderecoLoja+'</address><div><strong>Telefone</strong><p>'+foneLoja+'</p></div><div><strong>Horário de Funcionamento</strong><p>'+FuncLoja+'</p></div></div>');
                }
            });
        	


        });

      }
    });
});