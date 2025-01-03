import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  viewProviders: [
    provideIcons({
      lucideX,
    })
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  @Output() showInfoTerminal = new EventEmitter<boolean>();

  public closeInfoTerminal(): void {
    this.showInfoTerminal.emit(false);
  }
}
