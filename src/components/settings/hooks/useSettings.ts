
import { useState, useCallback, useEffect } from 'react';
import { SettingsState, SystemSettings, NetworkSettings, SecuritySettings } from '../types';

const defaultSystemSettings: SystemSettings = {
  theme: 'auto',
  language: 'en-US',
  fontSize: 'medium',
  animations: true,
  notifications: true,
  autoLogin: false,
  wallpaper: '/wallpaper.jpg',
  soundEnabled: true,
  volume: 50,
};

const defaultNetworkSettings: NetworkSettings = {
  proxyEnabled: false,
  proxyServer: '',
  proxyPort: 8080,
  dnsServers: ['8.8.8.8', '8.8.4.4'],
  staticIp: false,
  ipAddress: '',
  gateway: '',
  subnet: '255.255.255.0',
};

const defaultSecuritySettings: SecuritySettings = {
  passwordRequired: false,
  sessionTimeout: 30,
  autoLock: false,
  biometricAuth: false,
  twoFactorAuth: false,
};

const STORAGE_KEY = 'chimera-settings';

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
    
    return {
      system: defaultSystemSettings,
      network: defaultNetworkSettings,
      security: defaultSecuritySettings,
    };
  });

  const saveSettings = useCallback((newSettings: SettingsState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, []);

  const updateSystemSettings = useCallback((updates: Partial<SystemSettings>) => {
    const newSettings = {
      ...settings,
      system: { ...settings.system, ...updates },
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  const updateNetworkSettings = useCallback((updates: Partial<NetworkSettings>) => {
    const newSettings = {
      ...settings,
      network: { ...settings.network, ...updates },
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  const updateSecuritySettings = useCallback((updates: Partial<SecuritySettings>) => {
    const newSettings = {
      ...settings,
      security: { ...settings.security, ...updates },
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  const resetToDefaults = useCallback(() => {
    const defaultSettings = {
      system: defaultSystemSettings,
      network: defaultNetworkSettings,
      security: defaultSecuritySettings,
    };
    saveSettings(defaultSettings);
  }, [saveSettings]);

  const exportSettings = useCallback(() => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chimera-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [settings]);

  const importSettings = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        saveSettings(imported);
      } catch (error) {
        console.error('Failed to import settings:', error);
      }
    };
    reader.readAsText(file);
  }, [saveSettings]);

  return {
    settings,
    updateSystemSettings,
    updateNetworkSettings,
    updateSecuritySettings,
    resetToDefaults,
    exportSettings,
    importSettings,
  };
};
