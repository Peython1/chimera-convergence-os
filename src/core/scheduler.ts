
/**
 * ChimeraOS - Hybrid Task Scheduler
 * 
 * This scheduler implements a balanced approach for distributing
 * CPU resources between Windows and Linux tasks. It represents
 * a TypeScript equivalent of what would be implemented in Rust
 * for a real kernel.
 */

// Define task types
export type OSType = 'windows' | 'linux' | 'chimera';

export interface Task {
  id: number;
  name: string;
  osType: OSType;
  priority: number; // 0-100 scale
  cpuAffinity?: number[]; // CPU cores this task can run on
  memoryUsage: number; // in MB
  lastScheduled?: number; // timestamp
  state: 'ready' | 'running' | 'blocked' | 'terminated';
  quantum?: number; // time slice in ms
}

export class HybridScheduler {
  private tasks: Map<number, Task> = new Map();
  private cpuCores: number;
  private windowsRatio: number = 0.5; // Default 50/50 split
  
  constructor(cpuCores: number = 4, windowsRatio: number = 0.5) {
    this.cpuCores = cpuCores;
    this.windowsRatio = Math.max(0.3, Math.min(0.7, windowsRatio));
    console.log(`Hybrid Scheduler initialized with ${cpuCores} cores and ${windowsRatio * 100}% Windows ratio`);
  }
  
  /**
   * Register a task with the scheduler
   */
  public registerTask(task: Omit<Task, 'id'>): number {
    const id = this.generateTaskId();
    const newTask: Task = {
      ...task,
      id,
      lastScheduled: Date.now()
    };
    
    this.tasks.set(id, newTask);
    console.log(`Task ${newTask.name} (${id}) registered as ${newTask.osType} task`);
    return id;
  }
  
  /**
   * Generate a unique task ID
   */
  private generateTaskId(): number {
    return Math.floor(Math.random() * 1000000);
  }
  
  /**
   * Get the next task to run based on priority and fairness
   */
  public getNextTask(): Task | null {
    if (this.tasks.size === 0) {
      return null;
    }
    
    // Get ready tasks
    const readyTasks = Array.from(this.tasks.values())
      .filter(task => task.state === 'ready');
    
    if (readyTasks.length === 0) {
      return null;
    }
    
    // Split tasks by OS type
    const windowsTasks = readyTasks.filter(task => task.osType === 'windows');
    const linuxTasks = readyTasks.filter(task => task.osType === 'linux');
    const chimeraTasks = readyTasks.filter(task => task.osType === 'chimera');
    
    // Chimera tasks always get priority
    if (chimeraTasks.length > 0) {
      const highestPriorityTask = chimeraTasks
        .sort((a, b) => b.priority - a.priority)[0];
      return highestPriorityTask;
    }
    
    // Decide which OS gets the next slot
    // Simple implementation: use a coin flip weighted by the ratio
    const useWindowsTask = Math.random() < this.windowsRatio;
    
    if (useWindowsTask && windowsTasks.length > 0) {
      return this.selectTaskFromList(windowsTasks);
    } else if (linuxTasks.length > 0) {
      return this.selectTaskFromList(linuxTasks);
    } else if (windowsTasks.length > 0) {
      return this.selectTaskFromList(windowsTasks);
    }
    
    return null;
  }
  
  /**
   * Select a task from a list based on priority and fairness
   */
  private selectTaskFromList(tasks: Task[]): Task {
    // Sort by priority (high to low)
    return tasks.sort((a, b) => {
      // Higher priority first
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      
      // If same priority, use last scheduled time (longest waiting first)
      return (a.lastScheduled || 0) - (b.lastScheduled || 0);
    })[0];
  }
  
  /**
   * Update task state
   */
  public updateTaskState(taskId: number, newState: Task['state']): boolean {
    const task = this.tasks.get(taskId);
    
    if (!task) {
      return false;
    }
    
    task.state = newState;
    
    if (newState === 'running') {
      task.lastScheduled = Date.now();
    }
    
    return true;
  }
  
  /**
   * Dynamically adjust Windows/Linux ratio based on workload
   */
  public adjustOsRatio(newRatio?: number): number {
    if (newRatio !== undefined) {
      this.windowsRatio = Math.max(0.3, Math.min(0.7, newRatio));
    } else {
      // Auto-adjust based on task count and priority
      const windowsTasks = Array.from(this.tasks.values())
        .filter(task => task.osType === 'windows' && task.state !== 'terminated');
      
      const linuxTasks = Array.from(this.tasks.values())
        .filter(task => task.osType === 'linux' && task.state !== 'terminated');
      
      if (windowsTasks.length + linuxTasks.length > 0) {
        const windowsWeight = windowsTasks.reduce((sum, task) => sum + task.priority, 0);
        const linuxWeight = linuxTasks.reduce((sum, task) => sum + task.priority, 0);
        
        if (windowsWeight + linuxWeight > 0) {
          this.windowsRatio = Math.max(0.3, Math.min(0.7, 
            windowsWeight / (windowsWeight + linuxWeight)
          ));
        }
      }
    }
    
    console.log(`OS ratio adjusted to ${this.windowsRatio * 100}% Windows`);
    return this.windowsRatio;
  }
  
  /**
   * Allocate CPU resources between Windows and Linux tasks
   * This implements the algorithm mentioned in the prompt
   */
  public allocateCpu(windowsTask: Task, linuxTask: Task): { windowsQuota: number, linuxQuota: number } {
    // Clamp Windows priority between 0.3 and 0.7
    const winPrio = Math.max(0.3, Math.min(0.7, windowsTask.priority / 100));
    
    // Linux gets the remainder to ensure 100% CPU utilization
    const linuxPrio = 1.0 - winPrio;
    
    return {
      windowsQuota: winPrio,
      linuxQuota: linuxPrio
    };
  }
}

// Export a singleton instance
export const hybridScheduler = new HybridScheduler();
