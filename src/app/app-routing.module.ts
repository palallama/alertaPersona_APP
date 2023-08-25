import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./view/home/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./view/login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./view/login/registro/registro.module').then( m => m.RegistroPageModule)
  },  {
    path: 'recupero-mail',
    loadChildren: () => import('./view/login/recupero-mail/recupero-mail.module').then( m => m.RecuperoMailPageModule)
  },
  {
    path: 'recupero-password',
    loadChildren: () => import('./view/login/recupero-password/recupero-password.module').then( m => m.RecuperoPasswordPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./view/perfil/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'post-asistir',
    loadChildren: () => import('./view/alerta/asistir/post-asistir/post-asistir.module').then( m => m.PostAsistirPageModule)
  },
  {
    path: 'post-emitir',
    loadChildren: () => import('./view/alerta/emitir/post-emitir/post-emitir.module').then( m => m.PostEmitirPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./view/configuracion/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./view/perfil/historial/historial.module').then( m => m.HistorialPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
