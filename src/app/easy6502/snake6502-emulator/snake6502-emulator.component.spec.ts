import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Snake6502EmulatorComponent } from './snake6502-emulator.component';

describe('Snake6502EmulatorComponent', () => {
  let component: Snake6502EmulatorComponent;
  let fixture: ComponentFixture<Snake6502EmulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Snake6502EmulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Snake6502EmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
