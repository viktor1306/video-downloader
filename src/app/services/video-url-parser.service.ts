import { Injectable } from '@angular/core';

// Створюємо тип, щоб було зручно працювати з платформами
export enum VideoPlatform {
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Instagram = 'Instagram',
  Unknown = 'Unknown'
}

@Injectable({
  providedIn: 'root'
})
export class VideoUrlParserService {

  constructor() { }

  public identifyPlatform(url: string): VideoPlatform {
    if (!url) {
      return VideoPlatform.Unknown;
    }

    // Перевірка на YouTube (враховуємо звичайні посилання та короткі youtu.be)
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('youtube.com/shorts')) {
      return VideoPlatform.YouTube;
    }

    // Перевірка на TikTok
    if (url.includes('tiktok.com')) {
      return VideoPlatform.TikTok;
    }

    // Перевірка на Instagram
    if (url.includes('instagram.com')) {
      return VideoPlatform.Instagram;
    }

    // Якщо нічого не підійшло
    return VideoPlatform.Unknown;
  }
}