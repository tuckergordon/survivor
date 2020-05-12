import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentySevenComponent } from './round-twenty-seven.component';

describe('RoundTwentySevenComponent', () => {
  let component: RoundTwentySevenComponent;
  let fixture: ComponentFixture<RoundTwentySevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentySevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
