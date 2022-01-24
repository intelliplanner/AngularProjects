import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowYourApplicationStatusComponent } from './know-your-application-status.component';

describe('KnowYourApplicationStatusComponent', () => {
  let component: KnowYourApplicationStatusComponent;
  let fixture: ComponentFixture<KnowYourApplicationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowYourApplicationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowYourApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
