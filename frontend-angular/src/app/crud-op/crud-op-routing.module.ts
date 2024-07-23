import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DressColorComponent } from './dress-color/dress-color.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = 
[
  { path: '', component:LandingPageComponent},
  { path: 'userlist', component:DashboardComponent},
  { path: 'adduser', component:AddUserComponent},
  { path: 'dresscolor', component:DressColorComponent},
  { path: 'profileview', component:ProfileViewComponent},
  { path: 'settings', component:SettingsComponent},
  {
    path:"client/:selectedUserName",component:ProfileViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudOpRoutingModule { }
