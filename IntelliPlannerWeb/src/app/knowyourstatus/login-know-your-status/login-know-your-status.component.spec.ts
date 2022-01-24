import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginKnowYourStatusComponent } from './login-know-your-status.component';

describe('LoginKnowYourStatusComponent', () => {
  let component: LoginKnowYourStatusComponent;
  let fixture: ComponentFixture<LoginKnowYourStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginKnowYourStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginKnowYourStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
