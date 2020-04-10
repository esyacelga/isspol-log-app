import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ModeloTipoUsuarioPersona} from './modules/security-module/usuario/TipoUsuarioPersona';
import {StorageAppService} from './modules/ionic-module/generic/system/storage-app.service';
import {PushNotificationService} from './modules/ionic-module/generic/notify/push-notification.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    usuario: any;
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private splashScreen: SplashScreen,
        private svrStorage: StorageAppService,
        private statusBar: StatusBar, private router: Router,
        private svtNotificacion: PushNotificationService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
            if (this.modeloPersonaTipoUsuario && this.modeloPersonaTipoUsuario.usuario && this.modeloPersonaTipoUsuario.usuario.clave) {
                this.router.navigate(['/tabs']);
            } else {
                this.navCtrl.navigateRoot('signin');
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (this.platform.is('cordova')) {
                this.svtNotificacion.configuracionInicial();
            }
        });
    }
}
