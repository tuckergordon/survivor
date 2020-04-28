import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentyOneComponent } from './round-twenty-one.component';

describe('RoundTwentyOneComponent', () => {
  let component: RoundTwentyOneComponent;
  let fixture: ComponentFixture<RoundTwentyOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentyOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
