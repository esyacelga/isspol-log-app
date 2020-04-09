import {Injectable} from '@angular/core';
import {Builder} from 'xml2js';

@Injectable({
    providedIn: 'root'
})
export class IsspolUtilService {


    modificarValoresBooleanos = function (lista, campo) {
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

    public isNull(value, ifnull) {
        if (value === null || value === undefined) {
            return ifnull;
        }
        return value;
    }


    public buscarObjetoPorCampo(lista: [], campo: string, valor: string) {
        let obj;
        if (!valor || valor === null) {
            return obj;
        }
        if (lista && lista.length) {
            for (let i = 0; i < lista.length; i++) {
                if (String(lista[i][campo]).trim() === String(valor).trim()) {
                    obj = lista[i];
                    break;
                }
            }
        }
        return obj;
    }


    toXML(json: any) {
        const builder = new Builder();
        return builder.buildObject(json);
    }


    listarObjetoPorCampo(lista: any[], campo: string, valor: string) {
        const list = [];
        if (lista) {
            for (const iterador of lista) {
                if (iterador[campo] === valor) {
                    list.push(iterador);
                }
            }
        }
        return list;
    }

    stringToDate(date, format, delimiter) {
        const formatLowerCase = format.toLowerCase();
        const formatItems = formatLowerCase.split(delimiter);
        const dateItems = date.split(delimiter);
        const monthIndex = formatItems.indexOf('mm');
        const dayIndex = formatItems.indexOf('dd');
        const yearIndex = formatItems.indexOf('yyyy');
        let month = parseInt(dateItems[monthIndex], 2);
        month -= 1;
        const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        return formatedDate;
    }


    stringToDateFormat(fecha: string): string {
        const newDate = new Date(fecha);
        return this.formatoFecha(newDate);
    }

    formatoFecha(fecha): string {
        if (!fecha) {
            return this.formatoFecha(new Date());
        }
        const mm = fecha.getMonth() + 1; // getMonth() is zero-based
        const dd = fecha.getDate();
        return [
            (dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            fecha.getFullYear()
        ].join('/');
    }


    xmlToJsonFormat(xml) {
        const data = this.xmlToJson(xml);
        // @ts-ignore
        if (!data.root) {
            return null;
        }

        // @ts-ignore
        if (data.root.entidad.length) {
            return data;
        } else {
            // @ts-ignore
            const dato = data.root.entidad;
            // @ts-ignore
            data.root.entidad = [];
            // @ts-ignore
            data.root.entidad.push(dato);
            return data;
        }
    }

    parseXml(data) {
        let parser, xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, 'text/xml');
        return xmlDoc;
    }


    entidadDesdeXML(data) {
        if (!data || data == null) {
            return null;
        }
        const parseXml = this.parseXml(data);
        const obj = this.xmlToJson(parseXml);
        // @ts-ignore
        if (!obj && !obj.root && !obj.root.entidad && !obj.root.entidad.row) {
            return null;
        }
        // @ts-ignore
        return obj.root.entidad.row;
    }

    formatearListaXml(lst) {
        const lista = [];
        if (lst == null) {
            return null;
        }
        for (const entry of lst) {
            lista.push(entry.row);
        }
        return lista;
    }


    listaDesdeXML(data) {
        const parseXml = this.parseXml(data);
        const obj = this.xmlToJsonFormat(parseXml);
        if (!obj) {
            return null;
        }
        // @ts-ignore
        return this.formatearListaXml(obj.root.entidad);
    }

    xmlToJson(xml) {
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


}
