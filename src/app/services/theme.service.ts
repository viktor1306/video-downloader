import { Injectable, signal, effect, Renderer2, RendererFactory2 } from '@angular/core';

// Створюємо тип для теми, щоб уникнути помилок
export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // 1. Створюємо сигнал для зберігання поточної теми. Початкове значення - 'light'.
  public themeSignal = signal<Theme>('light');

  public customBackgroundSignal = signal<string | null>(null);

  private renderer: Renderer2;

  private readonly BG_STORAGE_KEY = 'custom-background-url';



  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const savedBg = localStorage.getItem(this.BG_STORAGE_KEY);
    if (savedBg) {
      this.customBackgroundSignal.set(savedBg);
    }

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

  public setCustomBackground(url: string): void {
    if (url && url.trim()) {
      this.customBackgroundSignal.set(url);
      localStorage.setItem(this.BG_STORAGE_KEY, url);
    }
  }

  // 3. Новий метод для скидання фону до стандартного
  public clearCustomBackground(): void {
    this.customBackgroundSignal.set(null);
    localStorage.removeItem(this.BG_STORAGE_KEY);
  }
}