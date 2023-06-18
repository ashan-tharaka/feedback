import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServicesComponent } from './components/services/services.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component:DashboardComponent, children:[
    {path:'home', component:HomeComponent},
    {path:'contact', component:ContactComponent},
    {path:'services', component:ServicesComponent},
    {path:'feedback', component:FeedbackComponent},
    {path:'', redirectTo : "/admin/home", pathMatch : "full"}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
