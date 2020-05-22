import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentyEightComponent } from './round-twenty-eight.component';

describe('RoundTwentyEightComponent', () => {
  let component: RoundTwentyEightComponent;
  let fixture: ComponentFixture<RoundTwentyEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentyEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
