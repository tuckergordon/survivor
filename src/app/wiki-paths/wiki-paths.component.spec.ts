import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPathsComponent } from './wiki-paths.component';

describe('WikiPathsComponent', () => {
  let component: WikiPathsComponent;
  let fixture: ComponentFixture<WikiPathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiPathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
