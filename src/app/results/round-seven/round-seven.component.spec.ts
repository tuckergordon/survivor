import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSevenComponent } from './round-seven.component';

describe('RoundSevenComponent', () => {
  let component: RoundSevenComponent;
  let fixture: ComponentFixture<RoundSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
