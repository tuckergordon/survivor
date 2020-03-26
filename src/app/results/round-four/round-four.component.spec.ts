import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFourComponent } from './round-four.component';

describe('RoundFourComponent', () => {
  let component: RoundFourComponent;
  let fixture: ComponentFixture<RoundFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
