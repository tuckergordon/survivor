import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundEighteenComponent } from './round-eighteen.component';

describe('RoundEighteenComponent', () => {
  let component: RoundEighteenComponent;
  let fixture: ComponentFixture<RoundEighteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundEighteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
