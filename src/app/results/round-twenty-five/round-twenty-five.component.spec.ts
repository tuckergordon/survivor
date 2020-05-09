import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentyFiveComponent } from './round-twenty-five.component';

describe('RoundTwentyFiveComponent', () => {
  let component: RoundTwentyFiveComponent;
  let fixture: ComponentFixture<RoundTwentyFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentyFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
