import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [], // FormsModule більше не потрібен тут
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isBgPanelVisible: boolean = false; // Перейменуємо для ясності

  constructor(public themeService: ThemeService) {}

  // НОВИЙ МЕТОД: спрацьовує при виборі файлу
  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0]; // Беремо перший вибраний файл

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      // Ця функція виконається, коли файл буде повністю прочитаний
      reader.onload = () => {
        const result = reader.result as string; // Отримуємо Base64 Data URL
        this.themeService.setCustomBackground(result);
        this.isBgPanelVisible = false; // Ховаємо панель після вибору
      };

      // Запускаємо процес читання файлу
      reader.readAsDataURL(file);
    }
  }

  public resetBackground(): void {
    this.themeService.clearCustomBackground();
    this.isBgPanelVisible = false; // Також ховаємо панель
  }

    toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}