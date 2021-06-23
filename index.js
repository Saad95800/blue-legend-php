import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';
import extractDomain from 'extract-domain';

let domain = extractDomain(window.location.href);
let u = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "").split('?');
let url = u[0];
let getUrl = [];
if(u.length > 1){
    getUrl = u[1].split('&');
}
let paseGetUrl = [];
for(let gt of getUrl){
    let getsplit = gt.split('=');
    let obj = {};
    obj[getsplit[0]] = getsplit[1];
    paseGetUrl.push(obj);
}

hydrate(
    <App data={
        {
            url: url,
            domain: domain,
            get: paseGetUrl,
            app: 'client'
        }}/>,
    document.getElementById('app_root')
);