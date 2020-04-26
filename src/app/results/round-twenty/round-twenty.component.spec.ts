import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwentyComponent } from './round-twenty.component';

describe('RoundTwentyComponent', () => {
  let component: RoundTwentyComponent;
  let fixture: ComponentFixture<RoundTwentyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTwentyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
