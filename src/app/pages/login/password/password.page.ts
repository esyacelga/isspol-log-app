import {Component, OnInit} from '@angular/core';
import {UsuarioApp} from '../../../modules/security-module/classes/UsuarioApp';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../../modules/security-module/usuario/usuario.service';
import {NavController, Platform} from '@ionic/angular';
import {StorageAppService} from '../../../modules/ionic-module/generic/system/storage-app.service';
import {ToastAppService} from '../../../modules/ionic-module/generic/system/toast-app.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.page.html',
    styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

    user: UsuarioApp = null;
    parametro: string;

    constructor(private activateRoute: ActivatedRoute,
                private usuarioSvc: UsuarioService,
                private router: Router,
                private svToast: ToastAppService,
                private platform: Platform,
                private svStorage: StorageAppService,
                private navCtrl: NavController,) {

    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            this.usuarioSvc.obtenerUsuarioPorId(params.id).then(respuesta => {
                this.user = respuesta;
            });
        });
    }

    verifyUser(parameter) {
        if (this.user.clave === parameter) {
            this.usuarioSvc.setAuthenticated(true);
            this.usuarioSvc.setUsuario(this.user);
            this.svStorage.setStorageObject(this.user, 'usuario');
            this.router.navigate(['/tabs']);
        } else {
            this.usuarioSvc.setAuthenticated(false);
            this.svToast.warnMessage('La contraseña es incorrecta, por favor vuelva a ingresarla');
        }
    }


}
