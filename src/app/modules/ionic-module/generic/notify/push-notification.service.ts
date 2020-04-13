import {EventEmitter, Injectable} from '@angular/core';
import {OneSignal, OSNotification, OSNotificationPayload} from '@ionic-native/onesignal/ngx';
import {NavController} from '@ionic/angular';
import {ExecuteCallProcedureService} from '../system/execute-call-procedure.service';
import {StorageAppService} from '../system/storage-app.service';
import {APP_ID, GOOGGLE_PROJECT_NUMBER} from '../constant/ionic-constant';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {
    playerId: string;
    mensajes: OSNotificationPayload[] = [];
    pushLitener = new EventEmitter<OSNotificationPayload>(

    );

    constructor(private genericService: ExecuteCallProcedureService,
                private nav: NavController,
                private svtStorage: StorageAppService,
                private oneSignal: OneSignal, private svrSorage: StorageAppService) {
        this.cargarMensajes();
    }


    async borrarMensajes(key: string) {
        await this.svtStorage.remove(key);
        this.mensajes = [];
        this.guardarMensajes(this.mensajes);
    }

    eliminarVariables() {
        this.svtStorage.clear();
    }

    async getMensajes() {
        await this.cargarMensajes();
        return [...this.mensajes];
    }


    /*async enviarNotificacion(mensaje: MensajeOneSignal, mensajeExito) {
        const options = new RequestOptions();
        options.successMessaje = mensajeExito;
        const data = await this.genericService.servicioRestGenericoGet(mensaje, OBTENER_EVIO_NOTIFICACION, options);
        return data;
    }*/


    reenvioPantalla(payload: OSNotificationPayload) {
        console.log('Payload pantalla: ', payload);
        if (payload.additionalData && payload.additionalData.key && payload.additionalData.key === 'ruta') {
            this.nav.navigateForward(payload.additionalData.valor);
        }

    }

    async notificacionRecibida(notifcacion: OSNotification) {
        await this.cargarMensajes();
        const payload = notifcacion.payload;
        const existePush = this.mensajes.find(mensaje =>
            mensaje.notificationID === payload.notificationID);
        if (existePush) {
            return;
        }
        this.mensajes.unshift(payload);
        this.pushLitener.emit(payload);
        await this.guardarMensajes(this.mensajes);
        this.reenvioPantalla(notifcacion.payload);
    }


    guardarMensajes(lstObj: any) {
        this.svrSorage.setStorageObject('mensajes', lstObj);
    }

    configuracionInicial() {
        this.oneSignal.startInit(APP_ID, GOOGGLE_PROJECT_NUMBER);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe((noti) => {
            // do something when notification is received
            console.log('Notificacion recivida: ', noti);
            this.notificacionRecibida(noti);
        });

        this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
            // do something when a notification is opened
            console.log('Notificacion abierta: ', noti);
            await this.notificacionRecibida(noti.notification);
        });

        console.log('Inicializando ID');
        this.oneSignal.getIds().then(info => {
            console.log(info);
            this.playerId = info.userId;

        });
        this.oneSignal.endInit();
    }

    async cargarMensajes() {
        // @ts-ignore
        this.mensajes = await this.svrSorage.loadStorageObject('mensajes') || [];
        return this.mensajes;
    }
}

