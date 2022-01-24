import { TestBed } from '@angular/core/testing';

import { JavaNotesServiceService } from './java-notes-service.service';

describe('JavaNotesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JavaNotesServiceService = TestBed.get(JavaNotesServiceService);
    expect(service).toBeTruthy();
  });
});
