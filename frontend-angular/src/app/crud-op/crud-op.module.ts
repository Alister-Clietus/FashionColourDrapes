import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudOpRoutingModule } from './crud-op-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { DressColorComponent } from './dress-color/dress-color.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [DashboardComponent, NavBarComponent, AddUserComponent, DressColorComponent, ProfileViewComponent, LandingPageComponent, SettingsComponent],
  imports: [
    FormsModule,
    CommonModule,
    CrudOpRoutingModule
  ]
})
export class CrudOpModule { }
