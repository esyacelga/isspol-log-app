import {Injectable} from '@angular/core';
import {DURATION_TOAST} from '../constant/ionic-constant';
import {ToastController} from '@ionic/angular';
import {COLOR_TOAST_ERROR, COLOR_TOAST_WARNING, COLOR_TOAT_SUCCESS} from '../../../common-module/generic/constant/generic-constant';

@Injectable({
    providedIn: 'root'
})
export class ToastAppService {
    objGuardado: any = null;

    constructor(private notify: ToastController) {

    }

    public async customMessage(mensaje, color) {
        const toast = await this.notify.create({
            message: mensaje,
            duration: DURATION_TOAST,
            color
        });
        toast.present();
    }

    public async warnMessage(mensaje) {
        const toast = await this.notify.create({
            message: mensaje,
            duration: DURATION_TOAST,
            color: COLOR_TOAST_WARNING
        });
        toast.present();
    }

    public async successMessage(mensaje) {
        const toast = await this.notify.create({
            message: mensaje,
            duration: DURATION_TOAST,
            color: COLOR_TOAT_SUCCESS
        });
        toast.present();
    }


    public async errorMessage(mensaje) {
        const toast = await this.notify.create({
            message: mensaje,
            duration: DURATION_TOAST,
            color: COLOR_TOAST_ERROR
        });
        toast.present();
    }

}
