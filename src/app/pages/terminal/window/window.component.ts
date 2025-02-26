import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { TranslateModule } from '@ngx-translate/core';
import { CommandService, CommandOutput } from '../../../services/command.service';
import { TranslateService } from '@ngx-translate/core';
import { EasterEggComponent } from '../../../components/terminal/easter-egg/easter-egg.component';
import { CommonModule } from '@angular/common';
import { InfoComponent } from '../info/info.component';
import { animate, style, transition, trigger, state } from '@angular/animations';

interface TerminalLine {
  command?: string;
  output?: CommandOutput;
}

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    TranslateModule,
    EasterEggComponent,
    InfoComponent
  ],
  viewProviders: [
    provideIcons({
      lucideChevronRight,
    })
  ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
  animations: [
    trigger('resizeAnimation', [
      state('full', style({
        width: '100%'
      })),
      state('shrunk', style({
        width: '50%'
      })),
      transition('full <=> shrunk', [
        animate('300ms ease-out')
      ])
    ]),
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
  ]
})
export class WindowComponent implements OnInit {
  private readonly commandService = inject(CommandService);
  private readonly translateService = inject(TranslateService);
  private readonly defaultWindowTitle = 'rik@prtfl-V8MB25';

  public inputValue = '';
  public terminalHistory: TerminalLine[] = [];
  public windowTitle = this.defaultWindowTitle;

  public showEasterEgg = false;
  public showInfoTerminal = false;

  ngOnInit(): void {
    this.initKeyboard();
    this.initializeTerminalHistory();
  }

  initKeyboard(): void {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.executeCommand();
      }
    });
  }

  private executeCommand(): void {
    const command = this.inputValue.trim();

    if (command) {
      const output = this.commandService.executeCommand(command);

      if (output.title) {
        this.windowTitle = this.defaultWindowTitle + '/' + output.title;
      } else {
        this.windowTitle = this.defaultWindowTitle;
      }

      switch (output.text) {
        case 'CLEAR_TERMINAL':
          this.terminalHistory = [];
          break;
        case 'SHOW_EASTER_EGG':
          this.showEasterEgg = true;
          this.terminalHistory.push({ command, output: { text: this.translateService.instant('terminal.easter-egg.content.message') } });
          break;
        case 'INFO_TERMINAL':
          this.showInfoTerminal = true;
          this.terminalHistory.push({ command, output: { text: this.translateService.instant('terminal.info.content.message') } });

          break;
        default:
          this.terminalHistory.push({ command, output });
          break;
      }
    }

    this.inputValue = '';
  }


  private initializeTerminalHistory(): void {
    const asciiArt = [
      this.translateService.instant('terminal.intro.content.ascii1'),
      this.translateService.instant('terminal.intro.content.ascii2'),
      this.translateService.instant('terminal.intro.content.ascii3'),
      this.translateService.instant('terminal.intro.content.ascii4'),
      this.translateService.instant('terminal.intro.content.ascii5'),
      this.translateService.instant('terminal.intro.content.ascii6')
    ].join('\n');

    this.terminalHistory = [{
      output: {
        text: asciiArt + '\n\n' +
              this.translateService.instant('terminal.intro.content.welcome') + '\n' +
              this.translateService.instant('terminal.intro.content.help')
      }
    }];
  }

  public onEasterEggChange(value: boolean): void {
    this.showEasterEgg = value;
  }

  public onInfoTerminalChange(value: boolean): void {
    this.showInfoTerminal = value;
  }
}
