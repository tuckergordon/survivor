import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSixteenComponent } from './round-sixteen.component';

describe('RoundSixteenComponent', () => {
  let component: RoundSixteenComponent;
  let fixture: ComponentFixture<RoundSixteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSixteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
