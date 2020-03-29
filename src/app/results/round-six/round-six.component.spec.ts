import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSixComponent } from './round-six.component';

describe('RoundSixComponent', () => {
  let component: RoundSixComponent;
  let fixture: ComponentFixture<RoundSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
