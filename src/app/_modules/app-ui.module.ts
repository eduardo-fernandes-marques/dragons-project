import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './app-material.module';

import { HeaderComponent } from './../_ui/shared/header/header.component';
import { FooterComponent } from './../_ui/shared/footer/footer.component';
import { AlertComponent } from '../_ui/shared/alert/alert.component';

import { LoginComponent } from '../_ui/authentication/login/login.component';
import { RegisterComponent } from '../_ui/authentication/register/register.component';

import { DragonsComponent } from './../_ui/dragons/dragons.component';
import { ManageDragonsComponent } from './../_ui/dragons/manage-dragons/manage-dragons.component';

import { HomeComponent } from '../_ui/home/home.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DragonsComponent,
    ManageDragonsComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DragonsComponent,
    ManageDragonsComponent,
    AlertComponent
  ]
})
export class AppUiModule { }
