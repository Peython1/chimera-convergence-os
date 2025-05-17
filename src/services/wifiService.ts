
import { Network, ConnectionStatus, NetworkStatus, WifiSystemConfig } from "@/components/desktop/types";

class WifiService {
  private networks: Network[] = [];
  private currentConnection: NetworkStatus = { connected: false };
  private config: WifiSystemConfig = {
    autoConnect: true,
    preferredNetworks: [],
    dnsServers: ["8.8.8.8", "1.1.1.1"],
    useProxy: false,
    useStaticIp: false
  };

  // Mock for scanning networks
  async scanNetworks(): Promise<Network[]> {
    console.log('Scanning for networks...');
    
    // Simulate network scanning delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate some networks
    this.networks = [
      { ssid: 'HOME-WIFI', signal: 90, security: 'WPA2', isHidden: false, frequency: '5GHz' },
      { ssid: 'OFFICE-NET', signal: 75, security: 'WPA3', isHidden: false, frequency: '6GHz' },
      { ssid: 'PublicWifi', signal: 60, security: 'open', isHidden: false, frequency: '2.4GHz' },
      { ssid: 'Neighbor-5G', signal: 45, security: 'WPA2', isHidden: false, frequency: '5GHz' },
      { ssid: 'IoT-Network', signal: 30, security: 'WPA', isHidden: false, frequency: '2.4GHz' },
      { ssid: 'Hidden-Network', signal: 65, security: 'WPA2', isHidden: true, frequency: '5GHz' },
    ];
    
    // Update connected status if applicable
    if (this.currentConnection.connected && this.currentConnection.network) {
      const connectedNetwork = this.networks.find(n => n.ssid === this.currentConnection.network?.ssid);
      if (connectedNetwork) {
        connectedNetwork.connected = true;
      }
    }
    
    return this.networks;
  }

  // Connect to a network
  async connect(network: Network, password?: string): Promise<ConnectionStatus> {
    console.log(`Connecting to ${network.ssid} with security ${network.security}...`);
    
    // Validate password for secured networks
    if (network.security !== 'open' && !password) {
      return { 
        connected: false, 
        error: 'Password required for secured network' 
      };
    }

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple password validation (mock)
    if (network.security !== 'open' && password && password.length < 8) {
      return { 
        connected: false, 
        error: 'Authentication failed. Please check your password.' 
      };
    }
    
    // Success case
    const status: ConnectionStatus = {
      connected: true,
      details: {
        ip: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
        gateway: '192.168.1.1',
        dns: this.config.dnsServers,
        speed: (Math.floor(Math.random() * 300) + 50) + ' Mbps'
      }
    };
    
    // Update current connection
    this.currentConnection = {
      ...status,
      network
    };
    
    // Update network list to show connected status
    this.networks = this.networks.map(n => ({
      ...n,
      connected: n.ssid === network.ssid
    }));
    
    return status;
  }

  // Disconnect from current network
  disconnect(): void {
    console.log('Disconnecting from network...');
    
    if (this.currentConnection.network) {
      // Update networks list to remove connected status
      this.networks = this.networks.map(n => ({
        ...n,
        connected: false
      }));
    }
    
    // Reset current connection
    this.currentConnection = { connected: false };
  }

  // Get current connection status
  getCurrentConnection(): NetworkStatus {
    return this.currentConnection;
  }
  
  // Get config
  getConfig(): WifiSystemConfig {
    return this.config;
  }
  
  // Update config
  updateConfig(config: Partial<WifiSystemConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
    
    console.log('Updated WiFi config:', this.config);
  }
}

// Create a singleton instance
export const hybridWifi = new WifiService();
