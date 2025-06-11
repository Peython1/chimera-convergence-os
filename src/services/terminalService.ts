
import { supabase } from '@/integrations/supabase/client';

export interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  executed_at: string;
  execution_time_ms: number;
}

class TerminalService {
  async saveCommand(command: string, output: string, executionTime: number): Promise<void> {
    const { error } = await supabase
      .from('terminal_history')
      .insert({
        command,
        output,
        executed_at: new Date().toISOString(),
        execution_time_ms: executionTime
      });

    if (error) {
      console.error('Error saving terminal command:', error);
    }
  }

  async getHistory(limit: number = 100): Promise<TerminalCommand[]> {
    const { data, error } = await supabase
      .from('terminal_history')
      .select('*')
      .order('executed_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching terminal history:', error);
      return [];
    }

    return data || [];
  }

  async clearHistory(): Promise<void> {
    const { error } = await supabase
      .from('terminal_history')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      console.error('Error clearing terminal history:', error);
    }
  }

  // Simulate command execution
  async executeCommand(command: string): Promise<{ output: string; executionTime: number }> {
    const startTime = Date.now();
    
    // Simulate command processing
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 500));
    
    const executionTime = Date.now() - startTime;
    let output = '';

    // Mock command responses
    switch (command.toLowerCase().trim()) {
      case 'ls':
      case 'dir':
        output = 'Documents  Downloads  Pictures  Videos  Music  Desktop';
        break;
      case 'pwd':
        output = '/home/user';
        break;
      case 'whoami':
        output = 'chimera-user';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'ps':
        output = 'PID   COMMAND\n1234  ChimeraOS\n5678  WiFiManager\n9012  SystemMonitor';
        break;
      case 'help':
        output = 'Available commands: ls, pwd, whoami, date, ps, clear, history, system-info';
        break;
      case 'system-info':
        output = 'ChimeraOS v1.0.0\nKernel: Hybrid-Linux-Windows 5.4.0\nArchitecture: x86_64\nMemory: 16GB\nStorage: 512GB SSD';
        break;
      case 'clear':
        output = '';
        break;
      case 'history':
        const history = await this.getHistory(10);
        output = history.map(cmd => cmd.command).join('\n');
        break;
      default:
        if (command.startsWith('echo ')) {
          output = command.substring(5);
        } else {
          output = `Command not found: ${command}`;
        }
    }

    // Save to history
    await this.saveCommand(command, output, executionTime);

    return { output, executionTime };
  }
}

export const terminalService = new TerminalService();
