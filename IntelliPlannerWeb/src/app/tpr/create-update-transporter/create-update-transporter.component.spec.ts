import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTransporterComponent } from './create-update-transporter.component';

describe('CreateUpdateTransporterComponent', () => {
  let component: CreateUpdateTransporterComponent;
  let fixture: ComponentFixture<CreateUpdateTransporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTransporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
