import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { animate, style, transition, trigger } from '@angular/animations';

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
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
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
