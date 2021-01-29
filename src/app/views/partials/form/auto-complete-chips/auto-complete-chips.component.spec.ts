import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartialsModule } from '@cms/partials';

import { AutoCompleteChipsComponent } from './auto-complete-chips.component';

describe('AutoCompleteChipsComponent', () => {
  let component: AutoCompleteChipsComponent;
  let fixture: ComponentFixture<AutoCompleteChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PartialsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteChipsComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar AutoCompleteChipsComponent', () => {
    expect(component).toBeTruthy();
  });
});
