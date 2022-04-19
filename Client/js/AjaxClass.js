/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AjaxClass{
     #peticio_http=null;

    constructor(){
        /*Constants per analitzar l'estat en què es troba la petició*/
        this.READY_STATE=Object.freeze({
            UNSENT: 0,
            OPENED: 1,
            HEADERS_RECEIVED: 2,
            LOADING: 3,
            DONE: 4
        });
        /*Constants per analitzar l'estatus del servidor*/
        this.SERVER_STATUS=Object.freeze({
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            PARTIAL_INFORMATION:203,
            BAD_REQUEST: 400,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            INTERNAL_ERROR: 500
        });
        //Atribut privat que contindrà l'objecte XMLHttpRequest
        this.#peticio_http = null;
    }
    
    /*Inicialitza l'objecte XMLHttpRequest en funció del tipus de
     * navegador (en realitat no té gaire sentit, perquè els navegadors
     * antics no suportaran l'ECMA6 :S*/
    inicialitzarPeticio(){
        if(window.XMLHttpRequest) {
            this.#peticio_http = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            this.#peticio_http = new ActiveXObject("Microsoft.XMLHTTP");
        }
    };

    /*Funció genèrica que carrega el contingut url mitjançant AJAX*/
    carregarContingut (url, metode, params, funcioResposta){
        //Si encara no hem inicialitzat la petició, ho fem ara...
        if(!this.#peticio_http){
            this.inicialitzarPeticio();
        }
        this.#peticio_http.onreadystatechange=() =>{
            if(this.#peticio_http.readyState === this.READY_STATE.DONE) {
              if(this.#peticio_http.status === this.SERVER_STATUS.OK) {
                  if(funcioResposta)
                    funcioResposta(this.#peticio_http.responseXML);
              }
            }
        };
        this.#peticio_http.open(metode, url ,true);
        if(!params)
            params=null;
        else
            this.#peticio_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.#peticio_http.setRequestHeader("cache-control", "no-cache");
        this.#peticio_http.send(params);
    };
    
}