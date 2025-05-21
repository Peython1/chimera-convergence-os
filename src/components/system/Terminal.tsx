
import React, { useState, useEffect, useRef } from 'react';

interface TerminalCommand {
  command: string;
  output: string;
  isError?: boolean;
}

const Terminal: React.FC = () => {
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [prompt] = useState('chimera@os:~$');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setCommands([
      { command: '', output: 'ChimeraOS Terminal v1.0.0' },
      { command: '', output: 'Type "help" for available commands.' },
    ]);
    
    // Focus the input field on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when commands change
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const processCommand = (command: string): string | { text: string; isError: boolean } => {
    const cmd = command.trim().toLowerCase();
    
    if (!cmd) return '';
    
    switch (cmd) {
      case 'help':
        return `Available commands:
  help       - Show this help
  clear      - Clear the terminal
  echo       - Display a message
  date       - Show current date and time
  version    - Show OS version
  uname      - Show system information
  ls         - List directory contents (simulated)
  whoami     - Show current user
  exit       - Close terminal window (not implemented)`;
        
      case 'clear':
        setTimeout(() => setCommands([]), 10);
        return '';
        
      case 'echo':
        return 'Usage: echo [message]';
      
      case 'date':
        return new Date().toString();
        
      case 'version':
        return 'ChimeraOS v0.1.0 (Alpha) - Hybrid Kernel';
        
      case 'uname':
      case 'uname -a':
        return 'ChimeraOS 0.1.0 Chimera-1 #1 SMP PREEMPT_DYNAMIC x86_64 JavaScript/TypeScript';
        
      case 'whoami':
        return 'user';
        
      case 'ls':
      case 'dir':
        return `Documents/
Downloads/
Pictures/
Videos/
Apps/
config.json
README.md`;
        
      default:
        if (cmd.startsWith('echo ')) {
          return command.substring(5);
        }
        return { text: `Command not found: ${command}`, isError: true };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentInput.trim()) return;
    
    const result = processCommand(currentInput);
    
    if (typeof result === 'object') {
      setCommands([...commands, { command: currentInput, output: result.text, isError: result.isError }]);
    } else {
      setCommands([...commands, { command: currentInput, output: result }]);
    }
    
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Add more keyboard shortcuts and command history navigation later
  };
  
  return (
    <div 
      ref={terminalRef}
      className="bg-black text-green-400 h-full p-2 font-mono text-sm overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {commands.map((cmd, i) => (
        <div key={i}>
          {cmd.command && (
            <div>
              <span>{prompt} </span>
              <span>{cmd.command}</span>
            </div>
          )}
          <div className={`whitespace-pre-wrap ${cmd.isError ? 'text-red-400' : ''}`}>
            {cmd.output}
          </div>
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="flex mt-1">
        <span>{prompt} </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-400 outline-none border-none ml-1"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
