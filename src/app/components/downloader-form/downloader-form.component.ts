// src/app/components/downloader-form/downloader-form.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Імпортуємо FormsModule
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VideoUrlParserService, VideoPlatform } from '../../services/video-url-parser.service';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../../config/api.config';

export interface VideoFormat {
  qualityLabel: string;
  url: string;
  container: string;
  contentLength: string; // Розмір файлу в байтах (у вигляді рядка)
}
export interface VideoInfo {
  title: string;
  thumbnail: string;
  formats: {
    combined: VideoFormat[];
    videoOnly: VideoFormat[];
  };
}

@Component({
  selector: 'app-downloader-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './downloader-form.component.html',
  styleUrl: './downloader-form.component.scss',
  // 2. Додаємо блок анімації
  animations: [
    trigger('slideInOut', [
      // Анімація для появи елемента (:enter)
      transition(':enter', [
        // Початковий стиль (елемент невидимий і зсунутий)
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          maxHeight: '0px' // Використовуємо maxHeight замість height
        }),
        // Кінцевий стиль (анімуємо до нього)
        animate('500ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)',
          maxHeight: '500px' // Встановлюємо достатньо велике значення
        }))
      ]),
      // Анімація для зникнення елемента (:leave)
      transition(':leave', [
        // Анімуємо до стану невидимості
        animate('500ms ease-in', style({
          opacity: 0,
          transform: 'translateY(-20px)',
          maxHeight: '0px'
        }))
      ])
    ])
  ]
})

export class DownloaderFormComponent {
  public videoUrl: string = '';
  public downloadInfo: VideoInfo | null = null; // Використовуємо наш новий тип
  public isInfoVisible: boolean = false;
  // 4. Додаємо змінні для стану завантаження та помилок
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  public encodeURIComponent = encodeURIComponent;

  public apiUrl = apiConfig.baseUrl;

  constructor(private urlParser: VideoUrlParserService, private http: HttpClient) { }

  public onDownloadClick(): void {
    if (!this.videoUrl.trim()) {
      console.log('Поле для посилання порожнє!');
      this.downloadInfo = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.downloadInfo = null;

    const platform = this.urlParser.identifyPlatform(this.videoUrl);
    if (platform !== VideoPlatform.YouTube) { // Поки що працює тільки з YouTube
      this.errorMessage = `Вибачте, завантаження з ${platform} ще не підтримується.`;
      this.isLoading = false;
      return;
    }


    // 7. КОДУЄМО URL, як ми обговорювали!
    const encodedUrl = encodeURIComponent(this.videoUrl);
    const requestUrl = `${this.apiUrl}/api/getYoutubeInfo?url=${encodedUrl}`;

    // 8. Робимо HTTP GET-запит
    this.http.get<VideoInfo>(requestUrl).subscribe({
      next: (data) => {
        // Успішна відповідь
        console.log('Отримані дані:', data);
        this.downloadInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        // Помилка
        console.error('Помилка запиту:', err);
        this.errorMessage = 'Не вдалося отримати інформацію про відео. Перевірте посилання або спробуйте пізніше.';
        this.isLoading = false;
      }
    });
  }

  // НОВА ФУНКЦІЯ: для красивого відображення розміру файлу
  public formatBytes(bytesStr: string, decimals = 2): string {
    const bytes = parseInt(bytesStr, 10);
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public toggleInfoPanel(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }
}