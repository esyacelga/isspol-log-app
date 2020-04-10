import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-logview',
    templateUrl: './logview.page.html',
    styleUrls: ['./logview.page.scss'],
})
export class LogviewPage implements OnInit {

    @Input() title;
    @Input() mensaje;
    @Input() tipoError;

    constructor(private modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    salirSinArgumentos() {
        this.modalCtrl.dismiss();
    }

    salirConArgumentos() {
        this.modalCtrl.dismiss(
            {
                nombre: 'data',
                pais: '2222'
            }
        );
    }
}
