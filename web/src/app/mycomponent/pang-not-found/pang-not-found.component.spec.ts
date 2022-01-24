import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PangNotFoundComponent } from './pang-not-found.component';

describe('PangNotFoundComponent', () => {
  let component: PangNotFoundComponent;
  let fixture: ComponentFixture<PangNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PangNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PangNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
