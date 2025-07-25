import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { AuthService } from 'src/app/auth/service/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'setToken', 'getUserFromToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido al inicio', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('debería intentar loguear si el formulario es válido', () => {
    const mockResponse = { access_token: 'fake-token' };
    mockAuthService.login.and.returnValue(of(mockResponse));
    mockAuthService.getUserFromToken.and.returnValue({
      role: 'admin',
      sub: 0,
      email: ''
    });

    component.loginForm.setValue({ email: 'admin@test.com', password: '123456' });
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'admin@test.com', password: '123456' });
    expect(mockAuthService.setToken).toHaveBeenCalledWith('fake-token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('debería mostrar error si login falla', () => {
    mockAuthService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.loginForm.setValue({ email: 'fail@test.com', password: 'wrong' });
    component.onSubmit();

    expect(component.loginError).toBe('Credenciales inválidas o error de conexión');
  });
});
