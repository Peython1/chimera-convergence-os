
export interface SystemSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  notifications: boolean;
  autoLogin: boolean;
  wallpaper: string;
  soundEnabled: boolean;
  volume: number;
}

export interface NetworkSettings {
  proxyEnabled: boolean;
  proxyServer: string;
  proxyPort: number;
  dnsServers: string[];
  staticIp: boolean;
  ipAddress: string;
  gateway: string;
  subnet: string;
}

export interface SecuritySettings {
  passwordRequired: boolean;
  sessionTimeout: number;
  autoLock: boolean;
  biometricAuth: boolean;
  twoFactorAuth: boolean;
}

export interface SettingsState {
  system: SystemSettings;
  network: NetworkSettings;
  security: SecuritySettings;
}
