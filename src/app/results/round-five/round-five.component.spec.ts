import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFiveComponent } from './round-five.component';

describe('RoundFiveComponent', () => {
  let component: RoundFiveComponent;
  let fixture: ComponentFixture<RoundFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
