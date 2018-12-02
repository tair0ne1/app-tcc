import { TestBed } from '@angular/core/testing';

import { JogoDataService } from './jogo-data.service';

describe('JogoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JogoDataService = TestBed.get(JogoDataService);
    expect(service).toBeTruthy();
  });
});
