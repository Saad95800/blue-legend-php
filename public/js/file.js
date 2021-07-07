

document.addEventListener("DOMContentLoaded", function(){

    let id = 1
    let add = true
    $('p').each(function(){
        if(add){
            let bgcolor = '#ffe999'
            let id_ancre = $(window.parent.document).find('#iframe-pdf').data('id_ancre')

            if( (id_ancre == id) && ($(window.parent.document).find('#view-active-page').data('active_page') == $(window.parent.document).find('#iframe-pdf').data('texte').active_page) ){
                bgcolor = '#5fff5f'
            }
            $(this).after('<span id="#ancre-'+id+'" class="link-ancre-ligne"><div class="ancre-ligne" id="ancre-'+id+'" style="top:'+$(this).css("top")+';left: 22px;background-color:'+bgcolor+';"></div></span>')
            id++
            add = false           
        }else{
            add = true
        }

    })

    $(document).on('click', '.ancre-ligne', function(){
        let id_ancre = $(this).attr('id').replace('ancre-', '')

        let formdata = new FormData()
        formdata.append('id_ancre', id_ancre)
        formdata.append('active_page', $(window.parent.document).find('#view-active-page').data('active_page'))
        formdata.append('id_text', document.getElementById('id-text').innerHTML )
        axios({
        method: 'post',
        url: '/save-ancre-ligne',
        responseType: 'json',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
        data: formdata
        })
        .then((response) => {
            console.log(response);
            if(!response.data.error){
                $('.ancre-ligne').css('background-color', '#ffe999')
                $(this).css('background-color', '#5fff5f')
            }
        })
        .catch( (error) => {
            console.log(error);
        });   

    })

    document.getElementById('btnSaveExpression').addEventListener('click', function(e){
        console.log("on click btn save expression")
        e.stopPropagation();
        saveExpression();
    })
    document.getElementById('popupTrad').addEventListener('click', function(e){
        console.log("on click popuptrad")
        e.stopPropagation();
    })
   
    document.body.addEventListener('mousedown', function(e){
        console.log("on mousedown")
        if(e.target.getAttribute('id') != 'btnSaveExpression' && e.target.getAttribute('id') != 'popupTrad'){
            changePopup('mousedown', e);
        }
    })

    document.body.addEventListener('mouseup', function(e){
        console.log("on mouseup")
        console.log(e.target)
        if(e.target.getAttribute('id') != 'btnSaveExpression' && e.target.getAttribute('id') != 'popupTrad'){
            changePopup('mouseup', e);
        }
    })

    $(document).on('click', '.block-hover-word', function(e) {
        let word = $(this).find('.hover-word').text();
        console.log($(this));
        // $("#selText").html(word);
        $("#frenchValue").html($(this).find('.hover-word-french').text());
        $("#frenchValue").css('font-size', '1.5em');
        let ele = $('#popupTrad');
        $(this).find('.popup-hover-word').html('<div class="popup-trad" style="display:inline-block;margin-left: -130px;margin-top: 20px;">'+ele.html()+'</div>');
        $(this).find('#btnSaveExpression').remove();
      });

    document.getElementById('id-text').innerHTML = $(window.parent.document).find('#iframe-pdf').data('textid');
    let element = $(window.parent.document).find(".container")
    element.removeClass('container')
    element.css('width', '100%')

});

function saveExpression(){
    if($("#btnSaveExpression").html() == 'Enregistrer'){
        let formdata = new FormData()
        formdata.append('french_value', document.getElementById('frenchValue').innerHTML)
        formdata.append('english_value', document.getElementById('selText').innerHTML)
        formdata.append('id_text', document.getElementById('id-text').innerHTML )
        axios({
        method: 'post',
        url: '/save-expression-ajax',
        responseType: 'json',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
        data: formdata
        })
        .then((response) => {
        console.log(response);
        let data = response.data;
        if(response.statusText == 'OK'){
            $("#btnSaveExpression").html('Enregistré !');
            $("#btnSaveExpression").css('background-color', '#08e608');
            $("#text-content-ifr").html(data.textHoverWords);
            setTimeout(() => {
            $("#btnSaveExpression").html('Enregistrer');
            $("#btnSaveExpression").css('background-color', '#6592ff');
            $('#popupTrad').css("display", "none");
            }, 1000);
        }
        })
        .catch( (error) => {
        console.log(error);
        });      
    }
}


function changePopup(mouse, e){
    $('.popup-hover-word').html("");
    var ele = document.getElementById('popupTrad');
    var sel = window.getSelection();
    var rel1= document.createRange();
    rel1.selectNode(document.getElementById('cal1'));
    var rel2= document.createRange();
    rel2.selectNode(document.getElementById('cal2'));
    let selText = sel.toString().trim().replace(/(\r\n|\n|\r)/gm, "");
    console.log(selText)
    if(selText != '' && selText != ' '){
        if(selText.length <= 200){
        if(mouse == 'mouseup'){
            /////////////////////////////////////////
            if (!sel.isCollapsed) {
            let formdata = new FormData()
            formdata.append('expression', selText)
            axios({
                method: 'post',
                url: '/check-expression-exist-ajax',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formdata
            })
            .then((response) => {
                console.log(response)
                var r = sel.getRangeAt(0).getBoundingClientRect();
                var rb1 = rel1.getBoundingClientRect();
                var rb2 = rel2.getBoundingClientRect();
                ele.style.top = ((r.bottom - rb2.top)*100/(rb1.top-rb2.top)+20) + 'px'; //this will place ele below the selection
                ele.style.left = ((r.left - rb2.left)*100/(rb1.left-rb2.left)-90) + 'px'; //this will align the right edges together
                ele.style.display = 'block';
                $("#popupTrad").css("display", "block !important");
                $("#selText").html(selText);
                $("#frenchValue").html(response.data.translation);
                $("#frenchValue").css('font-size', '1.5em');
                if(response.data.existUserSpace == 'no'){
                // L'expression sélectionnéee n'éxiste pas dans l'espace de l'utilisateur
                $("#btnSaveExpression").html('Enregistrer');
                $("#btnSaveExpression").css('background-color', '#6592ff');
                }else{
                // L'expression sélectionnée éxiste en bdd
                $("#btnSaveExpression").html('Déjà enregistré');
                $("#btnSaveExpression").css('background-color', '#727d97');
                }
                if(selText.length > 40){
                $("#btnSaveExpression").html('Maximum 40 caractères');
                $("#btnSaveExpression").css('background-color', 'red');
                }
            })
            .catch( (error) => {
                console.log(error);
            });
            }
        
        }else{ // mousedown
            window.getSelection().empty();
            ele.style.display = 'none';
            $("#btnSaveExpression").html('Enregistrer');
            $("#frenchValue").html('');
            $("#selText").html('');
            $('.popup-hover-word').html("");
        }      
        }else{
            $("#btnSaveExpression").html('Maximum 40 caractères');
            $("#btnSaveExpression").css('background-color', 'red');
        }
    }else{
        ele.style.display = 'none';
        $("#btnSaveExpression").html('Enregistrer');
        $("#frenchValue").html('');
        $("#selText").html('');
    }
}