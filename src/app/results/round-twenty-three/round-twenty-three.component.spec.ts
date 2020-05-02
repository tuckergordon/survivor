import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentyThreeComponent } from './round-twenty-three.component';

describe('RoundTwentyThreeComponent', () => {
  let component: RoundTwentyThreeComponent;
  let fixture: ComponentFixture<RoundTwentyThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentyThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
