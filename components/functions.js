function insertLog(axios, page_log, id_type_log){

  let formdata = new FormData()
  formdata.append('page_log', page_log)
  formdata.append('id_type_log', id_type_log)

  axios({
    method: 'post',
    url: '/insert-log-ajax',
    responseType: 'json',
    data: formdata
  })
  .then((response) => {
    console.log(response)
  })
  .catch( (error) => {
    console.log(error);
  });

}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + a.getMonth() + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  function getDate(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var date = a.getDate();
    var time = date + '/' + a.getMonth() + '/' + year ;
    return time;
  }

  function getHour(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    if(min.toString().length == 1){
        min = '0'+min;
    }
    var time = hour + ':' + min ;
    return time;
  }

  function checkPassword(pwd){
    let error = false;
    let msg = '';
    let csp = ['À','Á','Â','Ã','Ä',',','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Œ','Š','þ','Ù','Ú','Û','Ü','Ý','Ÿ','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','ø','œ','š','Þ','ù','ú','û','ü','ý','ÿ','¢','ß','¥','£','™','©','®','ª','×','÷','±','²','³','¼','½','¾','µ','¿','¶','·','¸','º','°','¯','§','…','¤','¦','≠','¬','ˆ','¨','‰'];
    if(typeof pwd == 'string'){
      if(pwd.length > 5){
        for (let cs of csp){
          if(pwd.indexOf(cs) != -1){
            error = true;
            msg = 'Les caractères spéciaux sont interdits';
            break;
          }
        }        
      }else{
        error = true;
        msg = 'Le mot de passe doit faire au moins 6 caratères';  
      }

    }else{
      error = true;
      msg = 'Le format du mot de passe est incorrect';
    }
    if(error == true){
      return [false, msg];
    }
    return true;
  }

  function capitalizeFirstLetter(string) {
    if(string == undefined){ return ''}
    if(string.length == 0){return ''}
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function ucFirst(str){
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function limit20str(str){
    return str.length > 20 ? str.substring(0, 20)+'...' : str
  }

  function limit15str(str){
    return str.length > 15 ? str.substring(0, 15)+'...' : str
  }

  function replaceSpecialChar(str){
    return str.replaceAll("&amp;", "&").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&quot;", '"').replaceAll("&#39;", "'")
  }

  function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

export {
    insertLog,
    timeConverter, 
    getDate, 
    getHour, 
    checkPassword,
    capitalizeFirstLetter,
    ucFirst,
    limit20str,
    limit15str,
    replaceSpecialChar,
    isURL
};