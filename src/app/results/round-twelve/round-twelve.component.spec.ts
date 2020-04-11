import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwelveComponent } from './round-twelve.component';

describe('RoundTwelveComponent', () => {
  let component: RoundTwelveComponent;
  let fixture: ComponentFixture<RoundTwelveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwelveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
