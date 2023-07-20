import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent {
  @Input() colorClass: string = 'primary';
  @Input() value: number = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  setValue(value: number) {
    let nextValue = this.value + value;

    if (nextValue >= 0 && nextValue <= 100) {
      this.value += value;
      this.valueChange.emit(this.value);
    }
  }

  onChange(value: number) {
    if (value > 100) {
      this.value = 100;
    } else if(value < 0) {
      this.value = 0;
    } else {
      this.value = value;
    }

    this.valueChange.emit(this.value);
  }

  isInvalid():boolean {
    return this.value > 100 || this.value < 0;
  }
}
