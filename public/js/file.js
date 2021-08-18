

document.addEventListener("DOMContentLoaded", function(e){

    $( "p" ).on( "touchcancel", function(){
        console.log('touchcancel')  
        changePopup('mouseup', e)
    })

    $( "p" ).on( "touchend", function(){
        console.log('touchend')  
        changePopup('mouseup', e)
    })

    // $( "p" ).on( "touchmove", function(){
    //     console.log('touchmove')  
    //     // changePopup('mouseup', e)
    // })

    // $( "p" ).on( "touchend", function(){
    //     console.log('touchend')  
    //     // changePopup('mouseup', e)
    // })

    // $('head').append('<link rel="stylesheet" href="'+$(window.parent.document).find('#iframe-pdf').data('root')+'public/css/file.css" rel="stylesheet" /><script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script><script src="'+$(window.parent.document).find('#iframe-pdf').data('root')+'public/pages/web/jquery-2.2.2.min.js"></script><script src="'+$(window.parent.document).find('#iframe-pdf').data('root')+'public/js/file.js"></script>')
    $('body').append('<div id="id-text" style="display:none;"></div><div id="cal1">&nbsp;</div><div id="cal2">&nbsp;</div><div id="popupTrad" class="popup-trad"><div class="arrow-popuptrad"></div><div id="translationPopupText" class="text-center"><div style="margin: 10px;font-weight:normal;display:none;" id="selText"></div><textarea style="margin: 10px;font-size: 1em;font-weight: bold;width: 95%;border: none;overflow: hidden;font-family: cursive;" id="frenchValue"></textarea></div><div class="display-flex-center" id="container-btn-save-expression"><div id="btnSaveExpression" class="display-flex-center" style="background-color: #6592ff"></div></div>')
    
    $('body').addClass('body-iframe-pdf')
    $('body').attr('id', 'body-iframe')

    if($(window.parent.document).find('#iframe-pdf').data('texte').type_text == 'pdf'){

        $('body').addClass('display-flex-center')
        
        let zoom = $(window.parent.document).find('#iframe-pdf').data('zoom')

        $('body').css({
            'background-color': '#939393',
            'transform': 'matrix('+zoom+', 0, 0, '+zoom+', 0, 0)',
            'transform-origin': 'center top',
            // 'overflow-x': 'hidden'
        })

        ///////////////////////////////////////////

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


        ////////////////////////////////////////

    // $('p').each( function(){

    //     let html = $(this).html().replaceAll('<i>', '').replaceAll('</i>', '').replaceAll('<b>', '').replaceAll('</b>', '').replaceAll('&nbsp;', ' ')
    //     tab = html.split('<br>')
    //     let str = ''
    //     for(let t of tab){
    //         t = $('<div>'+t+'</div>').text()
    //         let l = t.split(' ')
    //         console.log(l.length)
    //         if(l.length > 5){
    //             for(let m of l){
    //                 str += '<span class="word-text-page display-flex-center"><span class="english-word">'+m+'</span><div class="trad-word" style="padding: 5px 10px;border: 1px solid #e6e6e6;z-index:1;display:none;position:absolute;min-width: 60px;height: 25px;background-color:white;"></div></span> '
    //             }
    //             str += '<br>'                
    //         }else{
    //             str +=  t + '<br>'
    //         }

    //     }
    
    //     str = str.substring(0, str.length - 4);
    //     $(this).html(str)
        
    // } )

    for(let nodeElement of document.querySelector('#body-iframe').querySelectorAll('p')){
        for(let node of nodeElement.childNodes){
    
            switch(node.nodeName){
                case 'B':
                case 'I':
                    if(node.childNodes[0].nodeValue != null){
                        nd = node.childNodes[0].nodeValue.replaceAll('&nbsp;', ' ').replaceAll('&#39;', "'").split(' ')
                        stri = ''
                        for(let n of nd){
                            if(n != '' && n != ' '){
                                stri += '<span class="word-text-page display-flex-center"><span class="english-word">'+n+'</span><div class="trad-word" style="border: 1px solid #e6e6e6;padding: 5px 10px;border: 1px solid 6e6e6;z-index:1;display:none;position:absolute;min-width: 60px;height: 25px;background-color:white;"></div></span> '
                            }
                        }
                        node.innerHTML = stri
                        stri = ''         
                    }
                    break;
                case '#text':
                    let span = document.createElement('span')
                    span.innerHTML = node.nodeValue
    
                    stri = ''
                    for(let n of span.innerHTML.replaceAll('&nbsp;', ' ').replaceAll('&#39;', "'").split(' ')){
                        if(n != '' && n != ' '){
                            stri += '<span class="word-text-page display-flex-center"><span class="english-word">'+n+'</span><div class="trad-word" style="border: 1px solid #e6e6e6;padding: 5px 10px;border: 1px solid 6e6e6;z-index:1;display:none;position:absolute;min-width: 60px;height: 25px;background-color:white;"></div></span> '
                        }
                    }
                    span.innerHTML = stri
                    $(node).after(span)
                    $(node).remove()
                    stri = ''
    
                    break;
            }
    
        }	
    }
    
    $('.word-text-page').css({'position': 'relative', 'display': 'inline-block'})

    $('.word-text-page').on('mouseover', function(){
        $(this).css({'background-color': '#f3f6ff'})
    })
    $('.word-text-page').on('mouseout', function(){
        $(this).css({'background-color': 'transparent'})
    })

    $('.word-text-page').on('click', function(){

        $(this).find('.trad-word').css('display', 'flex')

        if( $(this).find('.trad-word').text() == ''){
            let formdata = new FormData()
            formdata.append('english_value', $(this).find('.english-word').text().replaceAll('"', '').replaceAll("'", "").replaceAll('&quot;', ''))
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
                $(this).find('.trad-word').text(response.data.translation)
            })
            .catch( (error) => {
                console.log(error);
            });
        }


    })

    ///////////////////////////////////////////
    
    }else{
        $('body').css({
            'background-color': 'white'
        })
    }

    $('a').on('click', function(e){
        e.preventDefault()  
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
        e.stopPropagation();
        saveExpression();
    })
    document.getElementById('popupTrad').addEventListener('click', function(e){
        e.stopPropagation();
    })
   
    document.body.addEventListener('mousedown', function(e){
        console.log('mousedown')
        if(e.target.getAttribute('id') != 'btnSaveExpression' && e.target.getAttribute('id') != 'popupTrad'){
            changePopup('mousedown', e);
        }
    })

    document.body.addEventListener('mouseup', function(e){
        console.log('mouseup')
        if(e.target.getAttribute('id') != 'btnSaveExpression' && e.target.getAttribute('id') != 'popupTrad'){
            changePopup('mouseup', e);
        }
    })

    $(document).on('click', '.block-hover-word', function(e) {
        // let word = $(this).find('.hover-word').text();
        $("#frenchValue").html($(this).find('.hover-word-french').text());
        $("#frenchValue").css('font-size', '1em');
        let ele = $('#popupTrad');
        $(this).find('.popup-hover-word').html('<div class="popup-trad" style="display:inline-block;margin-left: -130px;margin-top: 20px;">'+ele.html()+'</div>');
        $(this).find('#btnSaveExpression').remove();
      });

      $('#frenchValue').on('mouseup', function(e) {

        $(this).val(localStorage.getItem('frenchValue'))
        e.stopPropagation()

      });

      $('#frenchValue').on('keydown', function(e) {
        localStorage.setItem('frenchValue', e.target.value)
        if(document.querySelector('#frenchValue').scrollHeight > 290){
            $('#frenchValue').css('height', '290px')
        }else{
            $('#frenchValue').css('height', '5px')
        }
      });

    document.getElementById('id-text').innerHTML = $(window.parent.document).find('#iframe-pdf').data('textid');
    let element = $(window.parent.document).find(".container")
    element.removeClass('container')
    element.css('width', '100%')

});

function saveExpression(){
    if($("#btnSaveExpression").html() == 'Enregistrer'){
        let formdata = new FormData()
        formdata.append('french_value', document.getElementById('frenchValue').value)
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

            $("#btnSaveExpression").html('Enregistré !');
            $("#btnSaveExpression").css('background-color', '#08e608');
            $("#text-content-ifr").html(data.textHoverWords);
            setTimeout(() => {
            $("#btnSaveExpression").html('Enregistrer');
            $("#btnSaveExpression").css('background-color', '#6592ff');
            $('#popupTrad').css("display", "none");
            }, 1000);

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
    localStorage.setItem('selText', selText)
    console.log(selText)
    if(selText != '' && selText != ' '){
        if(selText.length <= 200){
        if(mouse == 'mouseup'){
            /////////////////////////////////////////
            if (!sel.isCollapsed) {
            $('#frenchValue').css('height', '40px')
            let formdata = new FormData()
            formdata.append('english_value', selText)
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
                console.log(r.left)
                console.log(rb1.left)
                console.log(rb2.left)
                console.log((r.left - rb2.left)*100)
                console.log((rb1.left-rb2.left)-90)
                console.log(((r.left - rb2.left)*100/(rb1.left-rb2.left)-90))
                ele.style.left = ((r.left - rb2.left)*100/(rb1.left-rb2.left)-90) + 'px'; //this will align the right edges together
                ele.style.display = 'block';
                if( parseInt($('#popupTrad').css('left').replace('px', '')) < 0 ){
                    $('#popupTrad').css('left', '0px')
                    // $('.arrow-popuptrad').css('left', '0px')
                }else{
                    // $('#popupTrad').css('left', ( $('#popupTrad').css('left').replace('px', '') + 300 ) + 'px')
                    // $('.arrow-popuptrad').css('left', '90px')
                }
                $("#popupTrad").css("display", "block !important");
                $('.trad-word').css('display', 'none')
                $("#selText").html(selText);
                let translation = response.data.translation.replaceAll("&amp;", "&").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
                console.log(translation)
                localStorage.setItem('frenchValue', translation)
                $("#frenchValue").val(translation);
                if(document.querySelector('#frenchValue').scrollHeight > 290){
                    $('#frenchValue').css('height', '290px')
                }else{
                    $('#frenchValue').css('height', document.querySelector('#frenchValue').scrollHeight+'px')
                }
                $("#frenchValue").css('font-size', '1em');
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
            if(e.target.getAttribute('id') != 'frenchValue'){
                window.getSelection().empty();
                // ele.style.display = 'none';
                // $("#btnSaveExpression").html('Enregistrer');
                // $("#frenchValue").val('');
                // $("#selText").html('');
                // $('.popup-hover-word').html("");                
            }

        }      
        }else{
            $("#btnSaveExpression").html('Maximum 40 caractères');
            $("#btnSaveExpression").css('background-color', 'red');
        }
    }else{
        console.log(e.target.getAttribute('id'))
        let id_target = e.target.getAttribute('id')
        if(id_target != 'popupTrad' && id_target != 'translationPopupText' && id_target != 'frenchValue' && id_target != 'container-btn-save-expression' && id_target != 'btnSaveExpression'){
            ele.style.display = 'none';
        }
        $("#btnSaveExpression").html('Enregistrer');
        $('.trad-word').css('display', 'none')
        // $("#frenchValue").val('');
        // $("#selText").html('');
    }
}