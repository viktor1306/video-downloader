// src/app/app.component.ts
import { Component } from '@angular/core';
import { DownloaderFormComponent } from './components/downloader-form/downloader-form.component';
import { HeaderComponent } from './components/header/header.component'; // <-- Імпортуємо
import { FooterComponent } from './components/footer/footer.component'; // <-- Імпортуємо

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DownloaderFormComponent, HeaderComponent, FooterComponent], // <-- Додаємо сюди
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'video-downloader';
}
