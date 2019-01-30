import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Dragon } from './../../../_models/dragon';

import { DragonService } from './../../../_services/dragon.service';
import { AlertService } from './../../../_services/alert.service';


@Component({
  selector: 'app-manage-dragons',
  templateUrl: './manage-dragons.component.html',
  styleUrls: ['./manage-dragons.component.scss']
})
export class ManageDragonsComponent implements OnInit {
  public dragon: Dragon;
  public new: boolean;
  public title = 'Novo';

  public manageForm: FormGroup;
  public loading = false;

  constructor(private router: Router, public dragonService: DragonService, private route: ActivatedRoute, public alertService: AlertService,
    private formBuilder: FormBuilder) {
      this.dragon = new Dragon();
  }

  ngOnInit() {
    this.manageForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      histories: ['']
    });

    this.dragon._id = this.route.snapshot.paramMap.get('id');

    this.load();
  }

  load() {
    if (this.dragon._id !== null) {
      this.new = false;
      this.title = 'Editar';
      this.dragonService.get(this.dragon._id)
      .subscribe(x => {
        if (x !== null) {
         this.dragon = x;
        }
      });
    } else {
      this.new = true;
    }
  }

  submit() {
    if (this.manageForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.new) {
      this.dragonService.create(this.dragon).subscribe(
        () => this.router.navigateByUrl('/dragons'),
        error => this.alertService.error(error)
      );
    } else {
      this.dragonService.update(this.dragon).subscribe(
        () => this.router.navigateByUrl('/dragons'),
        error => this.alertService.error(error)
      );
    }
  }

  back(): void {
    this.router.navigate(['/dragons']);
  }
}
