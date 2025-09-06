import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloaderFormComponent } from './downloader-form.component';

describe('DownloaderFormComponent', () => {
  let component: DownloaderFormComponent;
  let fixture: ComponentFixture<DownloaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloaderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
