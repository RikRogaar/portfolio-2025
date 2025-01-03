import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface CommandOutput {
  text: string;
  isError?: boolean;
  title?: string;
}

interface CommandConfig {
  contentKey?: string;
  titleKey?: string;
  text?: string;
  params?: () => Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private readonly translateService = inject(TranslateService);
  private readonly COMMANDS: Record<string, CommandConfig> = {
    help: {
      contentKey: 'terminal.help.content.message',
      titleKey: 'terminal.help.header.window-title'
    },
    about: {
      contentKey: 'terminal.about.content.message',
      titleKey: 'terminal.about.header.window-title',
      params: () => ({ age: this.getAge })
    },
    skills: {
      contentKey: 'terminal.skills.content.message',
      titleKey: 'terminal.skills.header.window-title'
    },
    experience: {
      contentKey: 'terminal.experience.content.message',
      titleKey: 'terminal.experience.header.window-title'
    },
    clear: {
      text: 'CLEAR_TERMINAL'
    },
    angular: {
      text: 'SHOW_EASTER_EGG',
      titleKey: 'terminal.easter-egg.header.window-title'
    }
  } as const;

  private commands: Map<string, (args: string[]) => CommandOutput> = new Map();

  constructor() {
    this.initializeCommands();
  }

  private initializeCommands(): void {
    Object.entries(this.COMMANDS).forEach(([command, config]) => {
      this.commands.set(command, () => ({
        text: config.text ?? this.translateService.instant(config.contentKey!, config.params?.()),
        title: config.titleKey ? this.translateService.instant(config.titleKey) : undefined
      }));
    });
  }

  public executeCommand(input: string): CommandOutput {
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

  get getAge(): number {
    const birthDate = new Date('2004-12-20');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayOccurred = today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayOccurred) {
      age--;
    }

    return age;
  }
}
