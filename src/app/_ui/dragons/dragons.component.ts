import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent, MatDialog } from '@angular/material';

import { ModalConfirmationComponent } from './../../_ui/shared/modals/modal-confirmation/modal-confirmation.component';

import { Dragon } from './../../_models/dragon';
import { Response } from '../../_models/response';

import { DragonService } from './../../_services/dragon.service';
import { AlertService } from './../../_services/alert.service';

const nameComparator = (a: Dragon, b: Dragon): number => `${a.name}`.localeCompare(b.name);


@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styleUrls: ['./dragons.component.scss']
})
export class DragonsComponent implements OnInit {
  public dragons: Array<Dragon> = [];
  public length: number;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageIndex: number;
  public pageSize: number;
  public displayedColumns: any = [];

  constructor(private dragonService: DragonService, private router: Router, private alertService: AlertService,
    public dialogService: MatDialog) {
      this.displayedColumns = ['created_at', 'name', 'type', '_id'];
     }

  ngOnInit() {
    this.pageIndex = this.dragonService.page;
    this.pageSize = this.dragonService.size;
    this.getDragons();
  }

  getDragons() {
    this.dragonService.list(this.pageIndex, this.pageSize).subscribe((res: Response) => {
      this.dragons = res.items.sort(nameComparator);
      this.length = res._metadata.total_count;
    },
      error => this.alertService.error(error)
    );
  }

  edit(dragon: Dragon) {
    this.router.navigateByUrl(`manage-dragons/${dragon.slug}`);
  }

  delete(dragon: Dragon) {
    this.dragonService.delete(dragon._id).subscribe(
      () => this.dragons = this.dragons.filter(d => d._id !== dragon._id),
      error => this.alertService.error(error)
    );
  }

  add() {
    this.router.navigate(['/manage-dragons']);
  }

  paginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDragons();
  }

  openModalConfirmation(dragon: Dragon) {
    const estadoInicial = {
      typeModel: 'confirm-delete-dragon',
      id: dragon.slug,
      title: 'Confirmação de Exclusão de Dragão',
      text: 'Tem certeza que deseja excluir este dragrão?',
      alert: 'Essa função não poderá ser desfeita'
    };

    const dialogRef = this.dialogService.open(ModalConfirmationComponent, { data: estadoInicial });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.dragonService.delete(dragon.slug).subscribe(
          () => this.dragons = this.dragons.filter(d => d._id !== dragon._id),
          error => this.alertService.error(error)
        );
      }
    });
  }
}
