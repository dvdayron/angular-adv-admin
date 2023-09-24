import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progress: number = 0;
  progress1: number = 0;

  get getProgress() {
    return `${this.progress}%`;    
  }

  get getProgress1() {
    return `${this.progress1}%`;    
  }
}
