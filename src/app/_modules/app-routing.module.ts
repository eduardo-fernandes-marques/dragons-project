import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../_guards/auth.guard';

import { LoginComponent } from '../_ui/authentication/login/login.component';
import { DragonsComponent } from '../_ui/dragons/dragons.component';
import { ManageDragonsComponent } from '../_ui/dragons/manage-dragons/manage-dragons.component';
import { RegisterComponent } from '../_ui/authentication/register/register.component';
import { HomeComponent } from '../_ui/home/home.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dragons', component: DragonsComponent, canActivate: [AuthGuard] },
  { path: 'manage-dragons', component: ManageDragonsComponent, canActivate: [AuthGuard] },
  { path: 'manage-dragons/:id', component: ManageDragonsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), rootRouting],
  exports: [RouterModule]
})
export class AppRoutingModule { }
