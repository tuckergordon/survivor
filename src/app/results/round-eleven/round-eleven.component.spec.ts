import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundElevenComponent } from './round-eleven.component';

describe('RoundElevenComponent', () => {
  let component: RoundElevenComponent;
  let fixture: ComponentFixture<RoundElevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundElevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
