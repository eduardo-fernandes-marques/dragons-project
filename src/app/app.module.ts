import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppUiModule } from './modules/app-ui.module';
import { DragonsComponent } from './ui/dragons/dragons/dragons.component';
import { ManageDragonsComponent } from './ui/dragons/manage-dragons/manage-dragons.component';
import { AuthenticationComponent } from './ui/authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    DragonsComponent,
    ManageDragonsComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    AppUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
