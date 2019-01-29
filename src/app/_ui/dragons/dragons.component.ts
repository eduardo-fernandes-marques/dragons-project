import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import { Dragon } from './../../_models/dragon';
import { Response } from './../../_models/response';

import { DragonService } from './../../_services/dragon.service';
import { AlertService } from './../../_services/alert.service';

const nameComparator = (a: Dragon, b: Dragon): number => `${a.name}`.localeCompare(b.name);


@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styleUrls: ['./dragons.component.scss']
})
export class DragonsComponent implements OnInit {
  dragons: Array<Dragon> = [];
  length: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex: number;
  pageSize: number;

  constructor(private dragonService: DragonService, private router: Router, private alertService: AlertService) { }

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

  menu(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  edit(dragon: Dragon) {
    this.router.navigateByUrl(`dragons/${dragon.slug}`);
  }

  delete(dragon: Dragon) {
    this.dragonService.delete(dragon.slug).subscribe(
      () => this.dragons = this.dragons.filter(d => d._id !== dragon._id),
      error => this.alertService.error(error)
    );
  }

  onPaginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDragons();
  }
}
