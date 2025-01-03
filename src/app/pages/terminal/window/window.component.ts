import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { TranslateModule } from '@ngx-translate/core';
import { CommandService, CommandOutput } from '../../../services/command.service';
import { TranslateService } from '@ngx-translate/core';
import { EasterEggComponent } from '../../../components/terminal/easter-egg/easter-egg.component';
import { CommonModule } from '@angular/common';

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
  ],
  viewProviders: [
    provideIcons({
      lucideChevronRight,
    })
  ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent implements OnInit {
  private readonly commandService = inject(CommandService);
  private readonly translateService = inject(TranslateService);
  private readonly defaultWindowTitle = 'rik@prtfl-V8MB25';

  public inputValue = '';
  public terminalHistory: TerminalLine[] = [];
  public showEasterEgg = false;
  public windowTitle = this.defaultWindowTitle;

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

  onEasterEggChange(value: boolean) {
    this.showEasterEgg = value;
  }
}
