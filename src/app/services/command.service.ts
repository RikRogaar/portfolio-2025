import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface CommandOutput {
  text: string;
  isError?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private commands: Map<string, (args: string[]) => CommandOutput> = new Map();

  constructor(private translateService: TranslateService) {
    this.initializeCommands();
  }

  private initializeCommands(): void {
    this.commands.set('help', () => ({
      text: 'Available commands:\n' +
            '  help - Show this help message\n' +
            '  clear - Clear the terminal\n' +
            '  about - About me\n' +
            '  language - List my languages\n' +
            '  skills - List my skills'
    }));

    this.commands.set('about', () => ({
      text: 'Hi! I\'m a software developer...'
    }));

    this.commands.set('clear', () => ({
      text: 'CLEAR_TERMINAL'
    }));

    // this.commands.set('language', (args: string[]) => {
    //   if (args.length === 0) {
    //     return {
    //       text: `Current language: ${this.translateService.currentLang}`
    //     };
    //   }

    //   if (args[0] === 'set' && args[1]) {
    //     const newLang = args[1].toLowerCase();
    //     const availableLangs = ['en', 'nl'];

    //     if (availableLangs.includes(newLang)) {
    //       this.translateService.use(newLang);
    //       return {
    //         text: `Language changed to: ${newLang}`
    //       };
    //     } else {
    //       return {
    //         text: `Language '${newLang}' not supported. Available languages: ${availableLangs.join(', ')}`,
    //         isError: true
    //       };
    //     }
    //   }

    //   return {
    //     text: 'Usage:\n' +
    //           '  language - Show current language\n' +
    //           '  language set <lang> - Set language (available: en, nl)',
    //     isError: true
    //   };
    // });

    this.commands.set('angular', () => ({
      text: 'SHOW_EASTER_EGG'
    }));
  }

  executeCommand(input: string): CommandOutput {
    const [command, ...args] = input.trim().toLowerCase().split(' ');

    if (!command) {
      return { text: '' };
    }

    const commandFn = this.commands.get(command);

    if (!commandFn) {
      return {
        text: `Command not found: ${command}. Type 'help' for available commands.`,
        isError: true
      };
    }

    return commandFn(args);
  }
}
