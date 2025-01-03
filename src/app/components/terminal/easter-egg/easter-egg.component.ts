import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AngularDraggableModule } from 'angular2-draggable';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AngularDraggableModule,
    NgIcon
  ],
  templateUrl: './easter-egg.component.html',
  styleUrl: './easter-egg.component.scss',
  animations: [
    trigger('popUpAnimation', [
      state('void', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition('void => visible', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('visible => void', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ],
  viewProviders: [
    provideIcons({
      lucideX,
    })
  ],
})
export class EasterEggComponent implements OnInit {
  @Output() showEasterEgg = new EventEmitter<boolean>();
  public isVisible = false;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 500);
  }

  public closeEasterEgg(): void {
    this.isVisible = false;

    setTimeout(() => {
      this.showEasterEgg.emit(false);
    }, 200);
  }
}
