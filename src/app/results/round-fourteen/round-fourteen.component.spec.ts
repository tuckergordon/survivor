import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFourteenComponent } from './round-fourteen.component';

describe('RoundFourteenComponent', () => {
  let component: RoundFourteenComponent;
  let fixture: ComponentFixture<RoundFourteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFourteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
