import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentySixComponent } from './round-twenty-six.component';

describe('RoundTwentySixComponent', () => {
  let component: RoundTwentySixComponent;
  let fixture: ComponentFixture<RoundTwentySixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentySixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
