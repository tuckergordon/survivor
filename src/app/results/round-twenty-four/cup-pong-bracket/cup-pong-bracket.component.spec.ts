import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPongBracketComponent } from './cup-pong-bracket.component';

describe('CupPongBracketComponent', () => {
  let component: CupPongBracketComponent;
  let fixture: ComponentFixture<CupPongBracketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupPongBracketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupPongBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
