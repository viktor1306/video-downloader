import { Injectable, signal, effect, Renderer2, RendererFactory2 } from '@angular/core';

// Створюємо тип для теми, щоб уникнути помилок
export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // 1. Створюємо сигнал для зберігання поточної теми. Початкове значення - 'light'.
  public themeSignal = signal<Theme>('light');

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // 2. Створюємо "ефект", який буде автоматично реагувати на зміну сигналу
    effect(() => {
      const theme = this.themeSignal();
      if (theme === 'dark') {
        this.renderer.addClass(document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(document.body, 'dark-theme');
      }
    });
  }

  // 3. Метод для зміни теми
  public toggleTheme(): void {
    // Оновлюємо значення сигналу
    this.themeSignal.update(currentValue => (currentValue === 'light' ? 'dark' : 'light'));
  }
}