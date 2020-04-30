import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentyTwoComponent } from './round-twenty-two.component';

describe('RoundTwentyTwoComponent', () => {
  let component: RoundTwentyTwoComponent;
  let fixture: ComponentFixture<RoundTwentyTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentyTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
