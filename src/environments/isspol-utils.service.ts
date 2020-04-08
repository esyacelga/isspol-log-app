import {Injectable} from '@angular/core';
import {Builder} from 'xml2js';
import {UploadFile} from '../../../classes/UploadFile';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class IsspolUtilsService {

    constructor(private  http: HttpClient) {
    }


    private toBoolean = function(caracter) {
        if (!caracter) {
            return false;
        }
        const dato = caracter;
        if (dato === '1' || dato === 1 || caracter === 'true') {
            return true;
        } else {
            return false;
        }

    };
    modificarValoresBooleanos = function(lista, campo) {
        if (lista) {
            if (lista) {
                for (let i = 0; i < lista.length; i++) {
                    const valores = lista[i];
                    for (const aux in valores) {
                        if (aux === campo) {
                            lista[i][aux] = this.toBoolean(lista[i][aux]);
                        }
                    }

                }
            }
        }
        return lista;

    };

    private parseXml = function(data) {
        let parser, xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, 'text/xml');
        return xmlDoc;
    };

    entidadDesdeXML = function(data) {
        if (!data || data == null) {
            return null;
        }
        const parseXml = this.parseXml(data);
        const obj = this.xmlToJson(parseXml);
        if (!obj && !obj.root && !obj.root.entidad && !obj.root.entidad.row) {
            return null;
        }
        return obj.root.entidad.row;
    };

    private formatearListaXml(lst) {
        const lista = [];
        if (lst == null) {
            return null;
        }
        for (const entry of lst) {
            lista.push(entry.row);
        }
        return lista;
    }

    public listaDesdeXML(data) {
        const parseXml = this.parseXml(data);
        const obj = this.xmlToJsonFormat(parseXml);
        if (!obj) {
            return null;
        }
        return this.formatearListaXml(obj.root.entidad);
    }

    private xmlToJsonFormat = function(xml) {
        const data = this.xmlToJson(xml);
        if (!data.root) {
            return null;
        }

        if (data.root.entidad.length) {
            return data;
        } else {
            const dato = data.root.entidad;
            data.root.entidad = [];
            data.root.entidad.push(dato);
            return data;
        }
    };

    private xmlToJson(xml) {
        // Create the return object
        let obj = {};

        if (xml.nodeType === 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj['row'] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj['row'][attribute.nodeName.replace('_x0020_', ' ')] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                if (typeof (obj[nodeName]) === 'undefined') {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) === 'undefined') {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }


    // Convert string/JSON to XML
    public toXML(json: any) {
        const builder = new Builder();
        return builder.buildObject(json);
    }


    public proGetXMLService = function(genericObject: any, nombreSP: string) {
        const data = this.xmlParse.toXML(genericObject);
        this.http.get('http://localhost:8080/siisspol-web/userdetails/?id=q').subscribe(resp => {
            console.log(resp);
        }, error1 => {
            console.log(error1);
        });
    };

    public proPostXMLServiceRegister = function(genericObject: any, nombreSP: string) {
        const data = this.xmlParse.toXML(genericObject);
        const url = URL_SERVICIOS + '/proGetXMLService';
        this.http.get(url + '/?parametroXML=q').subscribe(resp => {
            console.log(resp);
        }, error1 => {
            console.log(error1);
        });
    };


    public procConsultaGenerica = function(genericObject: any, nombreSP: string, urlRestService: string) {
        const data = this.toXML(genericObject);
        const obj = new UploadFile();
        obj.valorXml = data;
        obj.storeProcedure = nombreSP;
        const url = URL_SERVICIOS + '/' + urlRestService;
        return this.http.put(url, obj);
    };

    public procEjecucionGenerica = function(genericObject: any, nombreSP: string, urlRestService: string) {
        const data = this.toXML(genericObject);
        const obj = new UploadFile();
        obj.valorXml = data;
        console.log('xml generado: ' + data);
        obj.storeProcedure = nombreSP;
        const url = URL_SERVICIOS + '/' + urlRestService;
        return this.http.post(url, obj);
    };

}
