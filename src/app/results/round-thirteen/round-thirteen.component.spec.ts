import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundThirteenComponent } from './round-thirteen.component';

describe('RoundThirteenComponent', () => {
  let component: RoundThirteenComponent;
  let fixture: ComponentFixture<RoundThirteenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundThirteenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
