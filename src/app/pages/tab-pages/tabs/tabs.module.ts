import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {LogviewPage} from '../../logview/logview.page';
import {LogviewPageModule} from '../../logview/logview.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        LogviewPageModule,
        FormsModule,
        TabsPageRoutingModule
    ], entryComponents: [LogviewPage],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
