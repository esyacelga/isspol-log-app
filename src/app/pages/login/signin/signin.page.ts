import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UsuarioService} from '../../../modules/security-module/usuario/usuario.service';
import {DURATION_TOAST} from '../../../modules/ionic-module/generic/constant/ionic-constant';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    parametro: string;

    constructor(private usuarioService: UsuarioService, private router: Router, private notify: ToastController) {
    }

    ngOnInit() {
    }

    verifyUser(parametro) {
        /*const data = '{"idUsuarioApp":"5","correo":null,"clave":"seya1922"}';
        const test = JSON.parse(data);*/
        this.usuarioService.verificarUsuario(parametro).then(respuesta => {
            if (respuesta) {
                this.router.navigate(['/password', respuesta.idUsuarioApp]);
            } else {
                this.presentToast('El usuario no existe', 'warning');
            }
        });
    }


    private async presentToast(mensaje, color) {
        const toast = await this.notify.create({
            message: mensaje,
            duration: DURATION_TOAST,
            color
        });
        toast.present();
    }

}
