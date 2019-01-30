import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { ModalConfirmationComponent } from '../shared/modals/modal-confirmation/modal-confirmation.component';

import { User } from './../../_models/user';

import { AuthenticationService } from './../../_services/authentication.service';
import { UserService } from './../../_services/user.service';
import { AlertService } from './../../_services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
    public currentUser: User;
    public users: User[] = [];
    public displayedColumns: any = [];

    private currentUserSubscription: Subscription;

    constructor(private authenticationService: AuthenticationService, private userService: UserService, public dialogService: MatDialog,
        private alertService: AlertService) {
        this.displayedColumns = ['firstName', 'lastName', 'userName', 'id'];

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    delete(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        },
        error => this.alertService.error(error));
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        },
        error => this.alertService.error(error));
    }

    openModalConfirmation(user: User) {
        const estadoInicial = {
          typeModel: 'confirm-delete-user',
          id: user.id,
          title: 'Confirmação de Exclusão de Usuário',
          text: 'Tem certeza que deseja excluir este usuário?',
          alert: 'Essa função não poderá ser desfeita'
        };

        const dialogRef = this.dialogService.open(ModalConfirmationComponent, { data: estadoInicial });

        dialogRef.afterClosed().subscribe(confirm => {
          if (confirm) {
           this.delete(user.id);

           if (user.id === this.currentUser.id) {
               this.authenticationService.logout();
           }
          }
        });
      }
}
