import {Component, NgZone, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PushNotificationService} from '../../../modules/ionic-module/generic/notify/push-notification.service';
import {LogviewPage} from '../../logview/logview.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    mensajes: any[] = [];
    customFilter: any = {additionalData: {ambiente: 'PROD'}};


    constructor(private zone: NgZone,
                public pushSvc: PushNotificationService,
                public modalController: ModalController) {
    }


    borrarVariablres() {
        this.pushSvc.eliminarVariables();
    }

    borrarMensajes() {
        this.pushSvc.borrarMensajes('mensajes');
        this.ionViewWillEnter();
    }

    borrarMensaje(index: number) {
        this.mensajes.splice(index, 1);
        this.pushSvc.guardarMensajes(this.mensajes);
    }

    verMensaje(titulo: string, tipo: string, mensajeError: string) {
        this.presentModal(titulo, tipo, mensajeError);
    }

    async presentModal(titulo: string, tipo: string, mensajeError: string) {
        const modal = await this.modalController.create({
            component: LogviewPage,
            componentProps: {title: titulo, tipoError: tipo, mensaje: mensajeError}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
    }

    ngOnInit(): void {
        this.pushSvc.pushLitener.subscribe(noti => {
            this.zone.run(() => {
                this.mensajes.unshift(noti);
                console.log('Mensaje del subscriptor produccion..');
                console.log(JSON.stringify(noti));
                console.log('data: ' + JSON.stringify(this.mensajes));
            });
        });
    }

    async ionViewWillEnter() {
        this.mensajes = await this.pushSvc.getMensajes();

    }
}
