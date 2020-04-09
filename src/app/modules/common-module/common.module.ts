import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {IonicStorageModule} from '@ionic/storage';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicStorageModule.forRoot(),
        HttpClientModule, HttpClientJsonpModule,
    ],
    providers: [
        FileTransfer],
    declarations: []
})
export class CommonModuleModule {


}

