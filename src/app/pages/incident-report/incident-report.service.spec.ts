import { TestBed } from '@angular/core/testing';

import { IncidentReportService } from './incident-report.service';

describe('IncidentReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncidentReportService = TestBed.get(IncidentReportService);
    expect(service).toBeTruthy();
  });
});
