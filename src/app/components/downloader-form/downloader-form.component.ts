// src/app/components/downloader-form/downloader-form.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Імпортуємо FormsModule
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  public downloadInfo: any = null;
  public isInfoVisible: boolean = false;

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

  public toggleInfoPanel(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }
}