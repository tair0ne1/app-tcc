import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Snake6502Component } from './snake6502.component';

describe('Snake6502Component', () => {
  let component: Snake6502Component;
  let fixture: ComponentFixture<Snake6502Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Snake6502Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Snake6502Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
