import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'src/app/auth/service/auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const fakeTokenPayload = {
    email: 'admin@test.com',
    role: 'admin',
    exp: 9999999999
  };

  const fakeToken = [
    'header',
    btoa(JSON.stringify(fakeTokenPayload)), // payload
    'signature'
  ].join('.');

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería hacer login y devolver token', () => {
    const credentials = { email: 'test@test.com', password: '123456' };
    const mockResponse = { access_token: 'abc123' };

    service.login(credentials).subscribe(res => {
      expect(res.access_token).toBe('abc123');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debería guardar y recuperar token', () => {
    service.setToken('mi-token');
    expect(service.getToken()).toBe('mi-token');
  });

  it('debería decodificar token y obtener usuario', () => {
    service.setToken(fakeToken);
    const user = service.getUserFromToken();
    expect(user?.email).toBe('admin@test.com');
    expect(user?.role).toBe('admin');
  });

  it('debería reconocer si el usuario está logueado', () => {
    expect(service.isLoggedIn()).toBeFalse();
    service.setToken('token123');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('debería reconocer si el usuario es admin', () => {
    service.setToken(fakeToken);
    expect(service.isAdmin()).toBeTrue();
  });

  it('debería hacer logout y limpiar sesión', () => {
    service.setToken('token123');

    service.logout();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/logout`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(service.getToken()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
