import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
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
      ])
    ])
  ]
})
export class EasterEggComponent implements OnInit {
  isVisible = false;

  ngOnInit() {
    console.log('EasterEggComponent initialized');
    setTimeout(() => {
      this.isVisible = true;
    }, 2000);
  }
}
