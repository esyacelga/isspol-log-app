import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,

        HttpClientModule, HttpClientJsonpModule,
    ],
    providers: [
        FileTransfer],
    declarations: []
})
export class CommonModuleModule {


}

