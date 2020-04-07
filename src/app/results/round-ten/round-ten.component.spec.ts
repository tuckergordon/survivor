import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTenComponent } from './round-ten.component';

describe('RoundTenComponent', () => {
  let component: RoundTenComponent;
  let fixture: ComponentFixture<RoundTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
