import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTprComponent } from './list-tpr.component';

describe('ListTprComponent', () => {
  let component: ListTprComponent;
  let fixture: ComponentFixture<ListTprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
