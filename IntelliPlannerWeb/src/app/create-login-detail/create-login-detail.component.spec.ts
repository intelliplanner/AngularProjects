import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoginDetailComponent } from './create-login-detail.component';

describe('CreateLoginDetailComponent', () => {
  let component: CreateLoginDetailComponent;
  let fixture: ComponentFixture<CreateLoginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLoginDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
