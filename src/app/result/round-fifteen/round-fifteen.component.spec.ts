import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFifteenComponent } from './round-fifteen.component';

describe('RoundFifteenComponent', () => {
  let component: RoundFifteenComponent;
  let fixture: ComponentFixture<RoundFifteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFifteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
