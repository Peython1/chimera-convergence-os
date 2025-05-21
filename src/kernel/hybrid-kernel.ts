
/**
 * ChimeraOS - Hybrid Kernel Module Interface
 * 
 * This file defines the core interfaces for the modular microkernel
 * architecture of ChimeraOS. It represents the TypeScript equivalent
 * of what would be implemented in Rust for a real kernel.
 */

// Kernel module status types
export type ModuleStatus = 'active' | 'standby' | 'error' | 'loading';

// Kernel module priority
export type ModulePriority = 'critical' | 'system' | 'driver' | 'service' | 'application';

// Base interface for all kernel modules
export interface IKernelModule {
  id: string;
  name: string;
  version: string;
  status: ModuleStatus;
  priority: ModulePriority;
  dependencies: string[];
  
  // Lifecycle methods
  load(): Promise<void>;
  unload(): void;
  restart(): Promise<void>;
  
  // Status methods
  getStatus(): ModuleStatus;
  getDiagnostics(): Record<string, any>;
}

// Driver module interface
export interface IDriverModule extends IKernelModule {
  hardwareId: string;
  driverType: 'storage' | 'network' | 'display' | 'input' | 'audio' | 'other';
  
  // Driver-specific methods
  connect(): Promise<boolean>;
  disconnect(): Promise<boolean>;
  handleInterrupt(irq: number): void;
}

// Subsystem module interface
export interface ISubsystemModule extends IKernelModule {
  subsystemType: 'filesystem' | 'networking' | 'security' | 'process' | 'memory';
  
  // Subsystem-specific methods
  initialize(config: Record<string, any>): Promise<boolean>;
  shutdown(): Promise<boolean>;
  configure(options: Record<string, any>): Promise<boolean>;
}

// Kernel module manager
export class KernelModuleManager {
  private modules: Map<string, IKernelModule> = new Map();
  
  // Register a module with the kernel
  public registerModule(module: IKernelModule): boolean {
    if (this.modules.has(module.id)) {
      console.error(`Module ${module.id} is already registered`);
      return false;
    }
    
    this.modules.set(module.id, module);
    console.log(`Module ${module.name} (${module.id}) registered with kernel`);
    return true;
  }
  
  // Load a module by ID
  public async loadModule(id: string): Promise<boolean> {
    const module = this.modules.get(id);
    
    if (!module) {
      console.error(`Module ${id} not found`);
      return false;
    }
    
    try {
      await module.load();
      console.log(`Module ${module.name} loaded successfully`);
      return true;
    } catch (error) {
      console.error(`Failed to load module ${module.name}: ${error}`);
      return false;
    }
  }
  
  // Unload a module by ID
  public unloadModule(id: string): boolean {
    const module = this.modules.get(id);
    
    if (!module) {
      console.error(`Module ${id} not found`);
      return false;
    }
    
    try {
      module.unload();
      console.log(`Module ${module.name} unloaded successfully`);
      return true;
    } catch (error) {
      console.error(`Failed to unload module ${module.name}: ${error}`);
      return false;
    }
  }
  
  // Get all registered modules
  public getModules(): IKernelModule[] {
    return Array.from(this.modules.values());
  }
  
  // Get all active modules
  public getActiveModules(): IKernelModule[] {
    return Array.from(this.modules.values())
      .filter(module => module.status === 'active');
  }
}

// Export a singleton instance of the module manager
export const kernelModuleManager = new KernelModuleManager();
