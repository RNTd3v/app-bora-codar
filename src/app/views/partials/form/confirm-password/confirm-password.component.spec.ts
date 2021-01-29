import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { PartialsModule } from '@cms/partials';

import { ConfirmPasswordComponent } from './confirm-password.component';

describe('ConfirmPasswordComponent', () => {
  let component: ConfirmPasswordComponent;
  let fixture: ComponentFixture<ConfirmPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PartialsModule ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPasswordComponent);
    component = fixture.componentInstance;
  });

  it('#constructor deve instanciar ConfirmPasswordComponent', () => {
    expect(component).toBeTruthy();
  });
});
