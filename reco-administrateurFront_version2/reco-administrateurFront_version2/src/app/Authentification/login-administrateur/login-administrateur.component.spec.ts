import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdministrateurComponent } from './login-administrateur.component';

describe('LoginAdministrateurComponent', () => {
  let component: LoginAdministrateurComponent;
  let fixture: ComponentFixture<LoginAdministrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginAdministrateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
