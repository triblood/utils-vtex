$('.formulario button.enviar').click(function(){

    var nome = $('.formulario .nome').val();
    var emailUser = $('.formulario .email').val();
    var phoneUser = $('.formulario .phone').val();
    var assunto = $('.formulario .assunto').val();
    var mensagem = $('.formulario .mensagem').val();

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function validatePhone(phone) {
        var ph = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        return ph.test(phone);
    }

    if($('.contato .formulario .msgbox').length == 0){
        $('.contato .formulario').append('<div class="msgbox"></div>');
    }

    if(nome.length > 0){
        if(validateEmail(emailUser)){
            if(validatePhone(phoneUser)){
                if(assunto.indexOf('Selecione') < 0){
                    if(mensagem.length > 0){
                        $.ajax({
                            url: 'https://api.vtexcrm.com.br/sacada/dataentities/FC/documents/',
                            dataType: 'json',
                            type: 'POST',
                            crossDomain: true,
                            data: '{"nome":"'+nome+'","email":"'+emailUser+'","phone":"'+phoneUser+'","assunto":"'+assunto+'","mensagem":"'+mensagem+'"}',
                            headers: {
                                'Accept': 'application/vnd.vtex.ds.v10+json',
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            success:function(data){
                                console.log(data);
                                $('.contato .formulario .msgbox').html('<div class="texto ok"><i class="fa fa-check-circle"></i>Mensagem enviada com sucesso!</div>');
                            }
                        });

                    } else {
                        $('.contato .formulario .msgbox').html('<div class="texto error"><i class="fa fa-exclamation-circle"></i>Campo Mensagem em branco</div>');
                    }
                } else {
                    $('.contato .formulario .msgbox').html('<div class="texto error"><i class="fa fa-exclamation-circle"></i>Selecione um assunto</div>');
                }
            } else {
                $('.contato .formulario .msgbox').html('<div class="texto error"><i class="fa fa-exclamation-circle"></i>Telefone inválido. Favor informar um telefone fixo. Ex.: (99)9999-9999</div>');
            }
        } else {
            $('.contato .formulario .msgbox').html('<div class="texto error"><i class="fa fa-exclamation-circle"></i>E-mail inválido</div>');
        }
    } else {
        $('.contato .formulario .msgbox').html('<div class="texto error"><i class="fa fa-exclamation-circle"></i>Campo Nome em branco</div>');
    }

});