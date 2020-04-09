import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(public loadingController: LoadingController) {
    }

  async present(loadingId: string, loadingMessage: string) {
    const loading = await this.loadingController.create({
      id: loadingId,
      message: loadingMessage
    });
    return await loading.present();
  }

    async dismiss(loadingId: string) {
        return await this.loadingController.dismiss(null, null, loadingId);
    }
}
