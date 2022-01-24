import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailandmobileverificationComponent } from './emailandmobileverification.component';

describe('EmailandmobileverificationComponent', () => {
  let component: EmailandmobileverificationComponent;
  let fixture: ComponentFixture<EmailandmobileverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailandmobileverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailandmobileverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
