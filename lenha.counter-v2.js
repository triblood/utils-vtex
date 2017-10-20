$.get("/no-cache/horaatualservidor.aspx", function(data) {

	$('.prateleira-contador').each(function() {
	
		var dataLimite = $(this).find('.data-limite').html().split('/');
		var contadorContainer = $(this);
		// lenha.counter-v2
		// Contador regressivo para lojas da plataforma vtex, com base na hora do servidor.

		console.log(dataLimite)

		// SETTINGS
		var dia_final = parseInt(dataLimite[0]);
		var mes_final = parseInt(dataLimite[1]) - 1; // jan = 0 ; fev = 1 (...)
    	var ano_final = parseInt(dataLimite[2]);
		var hora_final = 00;
		var minuto_final = 00;
		var segundo_final = 00;
		// var divDias = $(this).find('');
		var divHoras = $(this).find('.contador-numero:nth-child(1)');
		var divMinutos = $(this).find('.contador-numero:nth-child(2)');
		var divSegundos = $(this).find('.contador-numero:nth-child(3)');

		// -------------------- //
		// --- END SETTINGS --- //
		// -------------------- //

		// LENHA COUNTER BEGIN
		var a_data = data.split(" ");
		var mes = a_data[0];
		var dia = a_data[1];
		dia = dia.replace(",","");
		var ano = a_data[2];
		var hora = a_data[3];
		var h_data = hora.split(":");
		var hora = h_data[0];
		var minuto = h_data[1];
		var segundo = h_data[2];
		if (mes == "jan") {mes = 0;} 
		else if (mes == "fev") {mes = 1;} 
		else if (mes == "mar") {mes = 2;} 
		else if (mes == "abr") {mes = 3;} 
		else if (mes == "mai") {mes = 4;} 
		else if (mes == "jun") {mes = 5;} 
		else if (mes == "jul") {mes = 6;} 
		else if (mes == "ago") {mes = 7;} 
		else if (mes == "set") {mes = 8;} 
		else if (mes == "out") {mes = 9;} 
		else if (mes == "nov") {mes = 10;} 
		else if (mes == "dez") {mes = 11;}

		var data_atual = new Date();
		data_atual.setSeconds(segundo);
		data_atual.setMinutes(minuto);
		data_atual.setHours(hora);
		data_atual.setDate(dia);
		data_atual.setMonth(mes);
		data_atual.setYear(ano);

		var data_final = new Date();
		data_final.setHours(hora_final);
		data_final.setMinutes(minuto_final);
		data_final.setSeconds(segundo_final);
		data_final.setDate(dia_final);
		data_final.setMonth(mes_final);
    	data_final.setYear(ano_final);

		setInterval(function(){
			var count_segundos = Math.floor((data_final - (data_atual))/1000);
			var count_minutos = Math.floor(count_segundos/60);
			var count_horas = Math.floor(count_minutos/60);
			var count_dias = Math.floor(count_horas/24);
			count_horas = count_horas-(count_dias*24);
			count_minutos = count_minutos-(count_dias*24*60)-(count_horas*60);
			count_segundos = count_segundos-(count_dias*24*60*60)-(count_horas*60*60)-(count_minutos*60);
			var diasToHoras = (count_dias * 24) + count_horas;
			// console.log(count_dias+" dias | "+count_horas+" horas | "+count_minutos+" minutos | "+count_segundos+" segundos");
		 	// if( count_dias != ($(divDias).html()) ) { $(divDias).html(count_dias); } 
		 	if(diasToHoras > 0){
		 		if(diasToHoras > 99){
		 			$(divHoras).addClass('grande');
		 		}
		 		if( count_horas != ($(divHoras).html()) ) { $(divHoras).html(diasToHoras); } 
		 		if( count_minutos != ($(divMinutos).html()) ) { $(divMinutos).html(count_minutos); } 
			 	if( count_segundos != ($(divSegundos).html()) ) { $(divSegundos).html(count_segundos); } 
				data_atual.setSeconds(data_atual.getSeconds() + 1);
		 	} else {
		 		if(contadorContainer.find('.itsoverman').length == 0){
		 			contadorContainer.append('<div class="itsoverman"><span>Ofertas expiradas</span></div>');
		 		}
		 		if( count_horas != ($(divHoras).html()) ) { $(divHoras).html('0'); } 
		 		if( count_minutos != ($(divMinutos).html()) ) { $(divMinutos).html('0'); } 
			 	if( count_segundos != ($(divSegundos).html()) ) { $(divSegundos).html('0'); } 
		 	}
		 	
		},1000);
	});
	// END LENHA COUNTER

});