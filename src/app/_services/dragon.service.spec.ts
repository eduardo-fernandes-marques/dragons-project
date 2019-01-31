import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Dragon } from './../_models/dragon';
import { Response } from '../_models/response';
import { ResponseModel } from '../_models/response-model';

import { DragonService } from './dragon.service';


describe('DragonService', () => {
  let service: DragonService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DragonService]
    });

    injector = getTestBed();
    service = injector.get(DragonService);
    httpMock = injector.get(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test list(page, size)', () => {
    const dragons = new Response();

    service.list(1, 1).subscribe(response => {
      expect(response).toBe(dragons);
    });

    const request = httpMock.expectOne({ url: `${service.url}?page=${1}&size=${1}`, method: 'GET' });
    request.flush(dragons);
  });

  it('Test get(slug)', () => {
    const dragon = new Dragon();

    service.get(dragon.slug).subscribe(response => {
      expect(response).toBe(dragon);
    });

    const request = httpMock.expectOne({ url: `${service.url}/${dragon.slug}`, method: 'GET' });
    request.flush(dragon);
  });

  it('Test create(dragon)', () => {
    const dragon = new Dragon();

    service.create(dragon).subscribe(response => {
      expect(response).toBe(dragon);
    });

    const request = httpMock.expectOne({ url: service.url, method: 'POST'});
    request.flush(dragon);
  });

  it('Test update(dragon)', () => {
    const dragon = new Dragon();

    const responseModel = new ResponseModel();

    service.update(dragon).subscribe(response => {
      expect(response).toBe(responseModel);
    });

    const request = httpMock.expectOne({ url: `${service.url}/${dragon.slug}`, method: 'PUT'});
    request.flush(responseModel);
  });

  it('Test delete(slug)', () => {
    const dragon = new Dragon();

    const responseModel = new ResponseModel();

    service.delete(dragon.slug).subscribe(response => {
      expect(response).toBe(responseModel);
    });

    const request = httpMock.expectOne({ url: `${service.url}/${dragon.slug}`, method: 'DELETE'});
    request.flush(responseModel);
  });
});
