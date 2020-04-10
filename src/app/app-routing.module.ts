import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [

    {
        path: 'signin',
        loadChildren: () => import('./pages/login/signin/signin.module').then(m => m.SigninPageModule)
    },
    {
        path: 'password/:id',
        loadChildren: () => import('./pages/login/password/password.module').then(m => m.PasswordPageModule)
    }, {
        path: '',
        loadChildren: () => import('./pages/tab-pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
