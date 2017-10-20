var pinsMap = [];
var maisProximo = [];
var pinmapa;

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -15.5252693, lng: -48.1164773},
		zoom: 4
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			// infoWindow.setPosition(pos);
			// infoWindow.setContent('Achamos você!');
			//map.setCenter(pos);
			//map.setZoom(10);

			var latInit = pos.lat;
			var lonInit = pos.lng;
			var latPerto;
			var lonPerto;
			var addressPerto;
			var nomePerto;
			var phone;
			var boxInfo;

			$.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+latInit+','+lonInit+'&sensor=false', function(data){
				console.log(data);
				var result = data.results[0];
				var state = '';
				var cidade = '';
				for (var i = 0, len = result.address_components.length; i < len; i++) {
				    var ac = result.address_components[i];
				    if (ac.types.indexOf('administrative_area_level_1') >= 0) {
				        state = ac.short_name;
				        cidade = ac.long_name;
				    }
				}
				$('.container > .local').html(cidade + ' - ' + state);
			});

			$('.lojas li').each(function(){
				var idLoja = $(this).attr('class');
				var latLoja = $(this).find('.posicao').text().split(',')[0];
				var lonLoja = $(this).find('.posicao').text().split(',')[1];
				var nome = $(this).find('.nome').text();
				var endereco = $(this).find('.endereco').text();
				var phone = $(this).find('.telefone').text();
				var distancia = distance(latInit,lonInit,latLoja,lonLoja, "K");
				pinsMap = pinsMap.concat([{"idLoja":idLoja, "nome":nome, "endereco":endereco, "phone":phone, "lat":latLoja, "lon":lonLoja, "distancia":distancia.toFixed(2)}]);
				//distLoja = distLoja.concat(distancia);
				$('select.listaLojas').append('<option value="'+idLoja+'">'+nome+'</option>');

				// 
				var res = Math.min.apply(Math,pinsMap.map(function(o){return o.distancia}));
        

				// for(x=0; x < aaadistLoja.length; x++){

				// 	if(aaadistLoja[x].distancia === res){
				// 		var idLojaPerto = aaadistLoja[x].idLoja;
            
				// 	}
				// }
				//
			});
			var image = 'http://pandorajoias.vteximg.com.br/arquivos/pinmapa.png';
			var ultimoPin = pinsMap.length - 1;

			$('.localizador .Mostra').click(function(){

				latPerto = pinsMap[ultimoPin].lat;
				lonPerto = pinsMap[ultimoPin].lon;
				addressPerto = pinsMap[ultimoPin].endereco;
				nomePerto = pinsMap[ultimoPin].nome;
				phone = pinsMap[ultimoPin].phone;
				distanciaLoja = pinsMap[ultimoPin].distancia;
				boxInfo = '<div class="infobox"><strong class="nome">'+nomePerto+'</strong><p class="endereco">'+addressPerto+'</p><p class="phone">'+phone+'</p><small class="distancia">Esta à '+distanciaLoja+' km da sua posição</small></div>';

				if(pinmapa != undefined){
					pinmapa.setMap(null);
				}

				pinmapa = new google.maps.Marker({
					position: {lat: parseFloat(latPerto), lng: parseFloat(lonPerto)},
					zoom: 15,
					map: map,
					icon: image
				});
				var infowindow = new google.maps.InfoWindow({
					content: boxInfo
				});
			
				map.setCenter({lat: parseFloat(latPerto), lng: parseFloat(lonPerto)});
				map.setZoom(15);
				// pinmapa.addListener('click', function() {
					infowindow.open(map, pinmapa);
				// });
			});

			$('select.listaLojas').change(function(){
				var idlistaloja = $(this).val();

				for(y=0; y < pinsMap.length; y++){

					if(pinsMap[y].idLoja === idlistaloja){
						latPerto = pinsMap[y].lat;
						lonPerto = pinsMap[y].lon;
						addressPerto = pinsMap[y].endereco;
						nomePerto = pinsMap[y].nome;
						phone = pinsMap[y].phone;
						distanciaLoja = pinsMap[y].distancia;
						boxInfo = '<div class="infobox"><strong class="nome">'+nomePerto+'</strong><p class="endereco">'+addressPerto+'</p><p class="phone">'+phone+'</p><small class="distancia">Esta à '+distanciaLoja+' km da sua posição</small></div>'

					}
				}

				if(pinmapa != undefined){
					pinmapa.setMap(null);
				} 

				pinmapa = new google.maps.Marker({
					position: {lat: parseFloat(latPerto), lng: parseFloat(lonPerto)},
					zoom: 15,
					map: map,
					icon: image
				});
				var infowindow = new google.maps.InfoWindow({
					content: boxInfo
				});
			
				map.setCenter({lat: parseFloat(latPerto), lng: parseFloat(lonPerto)});
				map.setZoom(15);
				infowindow.open(map, pinmapa);
			});

			$('.alterarLocal .buscar').click(function(){
				var distLoja  = [];
				var latEnd = "";
				var lonEnd = "";

				var getAddres = $('.alterarLocal .endereco').val().split(' ').join('+');
				var getData = 'http://maps.google.com/maps/api/geocode/json?address='+getAddres+'&sensor=false';
				$.ajax({
					url: getData,
					dataType: "json",
					success: function(json) {
						latEnd = json.results[0].geometry.location.lat;
						lonEnd = json.results[0].geometry.location.lng;

						for(i=1; i < pinsMap.length; i++){
							var idLoja = pinsMap[i].idLoja;
							var latLoja = pinsMap[i].lat;
							var lonLoja = pinsMap[i].lon;
							var distancia = distance(latEnd,lonEnd,latLoja,lonLoja, "K");
							//distLoja = distLoja.concat(distancia);
							distLoja = distLoja.concat([{"idLoja":idLoja, "distancia":distancia}])
						}

						var res = Math.min.apply(Math,distLoja.map(function(o){return o.distancia}));

						for(x=0; x < distLoja.length; x++){
							if(distLoja[x].distancia === res){
								var idLojaPerto = distLoja[x].idLoja;
							}
						}

						for(y=0; y < pinsMap.length; y++){
							if(pinsMap[y].idLoja === idLojaPerto){
								var latPerto = pinsMap[y].lat;
								var lonPerto = pinsMap[y].lon;
								var addressPerto = pinsMap[y].endereco;
								var nomePerto = pinsMap[y].nome;
								var phone = "(" + pinsMap[y].ddd + ") " +  pinsMap[y].phone;
								var boxInfo = '<div class="infobox"><strong class="nome">'+nomePerto+'</strong><p class="endereco">'+addressPerto+'</p><p class="phone">'+phone+'</p><small class="distancia">Esta à '+res.toFixed(2)+' km da posição que você informou</small></div>'

							}
						}

						if(pinmapa != undefined){
							pinmapa.setMap(null);
						} 

						pinmapa = new google.maps.Marker({
							position: {lat: parseFloat(latPerto), lng: parseFloat(lonPerto)},
							zoom: 15,
							map: map,
							icon: image
						});
						var infowindow = new google.maps.InfoWindow({
							content: boxInfo
						});
					
						map.setCenter({lat: parseFloat(latPerto), lng: parseFloat(lonPerto)});
						map.setZoom(15);
						infowindow.open(map, pinmapa);
					}
				});
			});
		});
	} 
}

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344; }
    if (unit=="N") { dist = dist * 0.8684; }
    return dist;
}


initMap();