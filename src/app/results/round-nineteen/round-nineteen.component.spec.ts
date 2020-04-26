import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundNineteenComponent } from './round-nineteen.component';

describe('RoundNineteenComponent', () => {
  let component: RoundNineteenComponent;
  let fixture: ComponentFixture<RoundNineteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundNineteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
