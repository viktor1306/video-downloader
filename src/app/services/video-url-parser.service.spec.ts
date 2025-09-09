import { TestBed } from '@angular/core/testing';

import { VideoUrlParserService } from './video-url-parser.service';

describe('VideoUrlParserService', () => {
  let service: VideoUrlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoUrlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
