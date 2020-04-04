import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundEightComponent } from './round-eight.component';

describe('RoundEightComponent', () => {
  let component: RoundEightComponent;
  let fixture: ComponentFixture<RoundEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
