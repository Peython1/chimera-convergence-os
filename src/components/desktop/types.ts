
import React from 'react';

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  icon: React.ReactNode;
}

export type Network = {
  ssid: string;
  signal: number;  // 0-100 percentage
  security: 'open' | 'WEP' | 'WPA' | 'WPA2' | 'WPA3';
  isHidden: boolean;
  connected?: boolean;
  frequency?: '2.4GHz' | '5GHz' | '6GHz';
};

export type ConnectionStatus = {
  connected: boolean;
  error?: string;
  details?: {
    ip?: string;
    gateway?: string;
    dns?: string[];
    speed?: string;
  };
};

export interface NetworkStatus extends ConnectionStatus {
  network?: Network;
}

export interface WifiSystemConfig {
  autoConnect: boolean;
  preferredNetworks: string[];
  dnsServers: string[];
  useProxy: boolean;
  proxySettings?: {
    server: string;
    port: number;
    bypass: string[];
  };
  useStaticIp: boolean;
  staticIpSettings?: {
    ip: string;
    gateway: string;
    subnet: string;
    dns: string[];
  };
}
