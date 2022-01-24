import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKnowYourStatusComponent } from './show-know-your-status.component';

describe('ShowKnowYourStatusComponent', () => {
  let component: ShowKnowYourStatusComponent;
  let fixture: ComponentFixture<ShowKnowYourStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowKnowYourStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowKnowYourStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
