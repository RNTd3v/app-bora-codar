import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteChipsComponent } from './auto-complete-chips.component';

describe('AutoCompleteChipsComponent', () => {
  let component: AutoCompleteChipsComponent;
  let fixture: ComponentFixture<AutoCompleteChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
