import { TestBed, inject } from '@angular/core/testing';

import { KtravelService } from './ktravel.service';

describe('KtravelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KtravelService]
    });
  });

  it('should be created', inject([KtravelService], (service: KtravelService) => {
    expect(service).toBeTruthy();
  }));
});
