import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSeventeenComponent } from './round-seventeen.component';

describe('RoundSeventeenComponent', () => {
  let component: RoundSeventeenComponent;
  let fixture: ComponentFixture<RoundSeventeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSeventeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
