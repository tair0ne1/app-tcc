import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Easy6502FormComponent } from './easy6502-form.component';

describe('Easy6502FormComponent', () => {
  let component: Easy6502FormComponent;
  let fixture: ComponentFixture<Easy6502FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Easy6502FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Easy6502FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
