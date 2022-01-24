import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TprDashboardComponent } from './tpr-dashboard.component';

describe('TprDashboardComponent', () => {
  let component: TprDashboardComponent;
  let fixture: ComponentFixture<TprDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TprDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TprDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
