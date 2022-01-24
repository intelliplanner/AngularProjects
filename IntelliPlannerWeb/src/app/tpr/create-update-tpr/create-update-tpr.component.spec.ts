import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTprComponent } from './create-update-tpr.component';

describe('CreateUpdateTprComponent', () => {
  let component: CreateUpdateTprComponent;
  let fixture: ComponentFixture<CreateUpdateTprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
