import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ],
    providers: [
      AuthenticationService
    ]
  });

    injector = getTestBed();
    service = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should create the user', () => {
    service.login('test', 'password');
    const currentUser = localStorage.getItem('currentUser');

    expect(currentUser).toBeDefined();
    expect(service.currentUserValue !== undefined).toBeTruthy();
  });

  it('Should logout the user', () => {
    service.login('test', 'password');
    let currentUser = localStorage.getItem('currentUser');

    expect(currentUser).toBeDefined();
    service.logout();

    currentUser = localStorage.getItem('currentUser');
    expect(currentUser).toBeNull();
  });
});
