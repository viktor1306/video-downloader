// src/app/components/downloader-form/downloader-form.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Імпортуємо FormsModule

@Component({
  selector: 'app-downloader-form',
  standalone: true,
  imports: [FormsModule], // 2. Додаємо його сюди
  templateUrl: './downloader-form.component.html',
  styleUrl: './downloader-form.component.scss'
})

export class DownloaderFormComponent {
  public videoUrl: string = '';
  public downloadInfo: any = null;

  public onDownloadClick(): void {
    if (!this.videoUrl.trim()) {
      console.log('Поле для посилання порожнє!');
      this.downloadInfo = null; // Повертаємо початковий стан
      return;
    }
    console.log('Отримане посилання:', this.videoUrl);

    // Імітуємо отримання даних
    this.downloadInfo = {
      title: 'Назва вашого відео тут',
      thumbnail: 'path/to/image.jpg',
      formats: [
        { quality: '1080p', size: '150 MB' },
        { quality: '720p', size: '85 MB' }
      ]
    };
  }
}