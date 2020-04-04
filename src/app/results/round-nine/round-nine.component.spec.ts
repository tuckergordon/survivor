import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundNineComponent } from './round-nine.component';

describe('RoundNineComponent', () => {
  let component: RoundNineComponent;
  let fixture: ComponentFixture<RoundNineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
