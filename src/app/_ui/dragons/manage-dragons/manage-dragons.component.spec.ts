import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDragonsComponent } from './manage-dragons.component';

describe('ManageDragonsComponent', () => {
  let component: ManageDragonsComponent;
  let fixture: ComponentFixture<ManageDragonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDragonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDragonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
