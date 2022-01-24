import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTeacherDetailComponent } from './approve-teacher-detail.component';

describe('ApproveTeacherDetailComponent', () => {
  let component: ApproveTeacherDetailComponent;
  let fixture: ComponentFixture<ApproveTeacherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTeacherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTeacherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
