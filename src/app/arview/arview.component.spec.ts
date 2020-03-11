import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArviewComponent } from './arview.component';

describe('ArviewComponent', () => {
  let component: ArviewComponent;
  let fixture: ComponentFixture<ArviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
