import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { TranslateModule } from '@ngx-translate/core';
import { CommandService, CommandOutput } from '../../../services/command.service';
import { TranslateService } from '@ngx-translate/core';
import { EasterEggComponent } from '../../../components/terminal/easter-egg/easter-egg.component';

interface TerminalLine {
  command?: string;
  output?: CommandOutput;
}

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [
    FormsModule,
    NgIcon,
    TranslateModule,
    EasterEggComponent
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
  public inputValue = '';
  public terminalHistory: TerminalLine[] = [];

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

      if (output.text === 'CLEAR_TERMINAL') {
        this.terminalHistory = [];
      } else {
        this.terminalHistory.push({ command, output });
      }
    }

    this.inputValue = '';
  }

  private initializeTerminalHistory(): void {
    const asciiArt = [
      this.translateService.instant('terminal.intro.ascii1'),
      this.translateService.instant('terminal.intro.ascii2'),
      this.translateService.instant('terminal.intro.ascii3'),
      this.translateService.instant('terminal.intro.ascii4'),
      this.translateService.instant('terminal.intro.ascii5'),
      this.translateService.instant('terminal.intro.ascii6')
    ].join('\n');

    this.terminalHistory = [{
      output: {
        text: asciiArt + '\n\n' +
              this.translateService.instant('terminal.intro.welcome') + '\n' +
              this.translateService.instant('terminal.intro.help')
      }
    }];
  }
}
