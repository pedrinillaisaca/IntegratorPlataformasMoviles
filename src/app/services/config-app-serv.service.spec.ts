import { TestBed } from '@angular/core/testing';

import { ConfigAppServService } from './config-app-serv.service';

describe('ConfigAppServService', () => {
  let service: ConfigAppServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigAppServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
