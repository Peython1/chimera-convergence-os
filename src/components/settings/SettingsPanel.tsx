
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Monitor, 
  Wifi, 
  Shield, 
  Download, 
  Upload, 
  RotateCcw,
  Palette,
  Volume2,
  Bell,
  Lock,
  Globe
} from 'lucide-react';
import { useSettings } from './hooks/useSettings';

const SettingsPanel: React.FC = () => {
  const {
    settings,
    updateSystemSettings,
    updateNetworkSettings,
    updateSecuritySettings,
    resetToDefaults,
    exportSettings,
    importSettings,
  } = useSettings();

  const [activeTab, setActiveTab] = useState('system');

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importSettings(file);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <h1 className="text-lg font-semibold">System Settings</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <label htmlFor="import-settings">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </span>
            </Button>
          </label>
          <input
            id="import-settings"
            type="file"
            accept=".json"
            onChange={handleFileImport}
            className="hidden"
          />
          
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center space-x-2">
              <Wifi className="w-4 h-4" />
              <span>Network</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.system.theme}
                      onValueChange={(value: 'light' | 'dark' | 'auto') =>
                        updateSystemSettings({ theme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select
                      value={settings.system.fontSize}
                      onValueChange={(value: 'small' | 'medium' | 'large') =>
                        updateSystemSettings({ fontSize: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.system.language}
                    onValueChange={(value) => updateSystemSettings({ language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="pt-BR">Português (BR)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                      <SelectItem value="fr-FR">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth animations and transitions
                    </p>
                  </div>
                  <Switch
                    checked={settings.system.animations}
                    onCheckedChange={(checked) =>
                      updateSystemSettings({ animations: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <span>Audio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play system sounds
                    </p>
                  </div>
                  <Switch
                    checked={settings.system.soundEnabled}
                    onCheckedChange={(checked) =>
                      updateSystemSettings({ soundEnabled: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Volume</Label>
                    <Badge variant="secondary">{settings.system.volume}%</Badge>
                  </div>
                  <Slider
                    value={[settings.system.volume]}
                    onValueChange={([value]) =>
                      updateSystemSettings({ volume: value })
                    }
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show system and app notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.system.notifications}
                    onCheckedChange={(checked) =>
                      updateSystemSettings({ notifications: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Settings */}
          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>DNS Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary DNS</Label>
                  <Input
                    value={settings.network.dnsServers[0] || ''}
                    onChange={(e) => {
                      const newServers = [...settings.network.dnsServers];
                      newServers[0] = e.target.value;
                      updateNetworkSettings({ dnsServers: newServers });
                    }}
                    placeholder="8.8.8.8"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Secondary DNS</Label>
                  <Input
                    value={settings.network.dnsServers[1] || ''}
                    onChange={(e) => {
                      const newServers = [...settings.network.dnsServers];
                      newServers[1] = e.target.value;
                      updateNetworkSettings({ dnsServers: newServers });
                    }}
                    placeholder="8.8.4.4"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proxy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Proxy</Label>
                    <p className="text-sm text-muted-foreground">
                      Route traffic through proxy server
                    </p>
                  </div>
                  <Switch
                    checked={settings.network.proxyEnabled}
                    onCheckedChange={(checked) =>
                      updateNetworkSettings({ proxyEnabled: checked })
                    }
                  />
                </div>

                {settings.network.proxyEnabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Proxy Server</Label>
                      <Input
                        value={settings.network.proxyServer}
                        onChange={(e) =>
                          updateNetworkSettings({ proxyServer: e.target.value })
                        }
                        placeholder="proxy.example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Port</Label>
                      <Input
                        type="number"
                        value={settings.network.proxyPort}
                        onChange={(e) =>
                          updateNetworkSettings({ proxyPort: parseInt(e.target.value) || 8080 })
                        }
                        placeholder="8080"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Required</Label>
                    <p className="text-sm text-muted-foreground">
                      Require password to unlock system
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.passwordRequired}
                    onCheckedChange={(checked) =>
                      updateSecuritySettings({ passwordRequired: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Lock</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically lock after inactivity
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.autoLock}
                    onCheckedChange={(checked) =>
                      updateSecuritySettings({ autoLock: checked })
                    }
                  />
                </div>

                {settings.security.autoLock && (
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Select
                      value={settings.security.sessionTimeout.toString()}
                      onValueChange={(value) =>
                        updateSecuritySettings({ sessionTimeout: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add extra security layer
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      updateSecuritySettings({ twoFactorAuth: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPanel;
