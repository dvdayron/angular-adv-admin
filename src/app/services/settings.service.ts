import { Injectable } from '@angular/core';

const ACTIVE_CLASS: string = 'working';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { 
    this.setDefaultTheme();
  }

  private setDefaultTheme(): void {
    const linkTheme = document.querySelector('#theme');
    const theme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    linkTheme?.setAttribute('href', theme);
  }

  changeTheme(theme: string) {
    const linkTheme = document.querySelector('#theme');
    const url =  `./assets/css/colors/${ theme }.css`;

    linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkTheme();
  }

  checkTheme(): void {
    const linkTheme = document.querySelector('#theme');
    const links = document.querySelectorAll('.selector');
   
    links.forEach(element => {
      element.classList.remove(ACTIVE_CLASS);
      const dataTheme = element.getAttribute('data-theme');
      const elementUrl =  `./assets/css/colors/${ dataTheme }.css`;
      const currentTheme = linkTheme?.getAttribute('href');

      if (elementUrl === currentTheme) {
        element.classList.add(ACTIVE_CLASS);
      }
    });
  }
}
