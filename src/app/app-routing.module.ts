import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'sign-in', component:SignInComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  {path:'', redirectTo:'/sign-in', pathMatch:'full'},
  {path:'admin',
  canActivate:[authGuard],
   loadChildren :() => import('./modules/admin/admin.module').then((m)=> m.AdminModule)},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
