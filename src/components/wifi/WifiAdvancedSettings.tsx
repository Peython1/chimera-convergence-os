
import React, { useState, useEffect } from 'react';
import { hybridWifi } from '@/services/wifiService';
import { WifiSystemConfig } from '@/components/desktop/types';
import { toast } from "sonner";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const WifiAdvancedSettings: React.FC = () => {
  const [config, setConfig] = useState<WifiSystemConfig>(hybridWifi.getConfig());
  const [dnsInput, setDnsInput] = useState('');

  useEffect(() => {
    // Initialize form with current config
    setConfig(hybridWifi.getConfig());
  }, []);

  const handleConfigChange = <K extends keyof WifiSystemConfig>(key: K, value: WifiSystemConfig[K]) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveConfig = () => {
    try {
      hybridWifi.updateConfig(config);
      toast.success("Wi-Fi settings saved successfully");
    } catch (error) {
      console.error("Failed to save Wi-Fi settings:", error);
      toast.error("Failed to save Wi-Fi settings");
    }
  };

  const handleAddDns = () => {
    if (dnsInput && /^(\d{1,3}\.){3}\d{1,3}$/.test(dnsInput)) {
      if (!config.dnsServers.includes(dnsInput)) {
        handleConfigChange('dnsServers', [...config.dnsServers, dnsInput]);
        setDnsInput('');
      } else {
        toast.warning("DNS server already added");
      }
    } else {
      toast.error("Please enter a valid DNS server address");
    }
  };

  const handleRemoveDns = (dns: string) => {
    handleConfigChange('dnsServers', config.dnsServers.filter(s => s !== dns));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Advanced Wi-Fi Settings</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoConnect">Auto-connect to networks</Label>
              <p className="text-sm text-muted-foreground">
                Automatically connect to previously connected networks
              </p>
            </div>
            <Switch
              id="autoConnect"
              checked={config.autoConnect}
              onCheckedChange={(checked) => handleConfigChange('autoConnect', checked)}
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="preferred">
              <AccordionTrigger>Preferred Networks</AccordionTrigger>
              <AccordionContent>
                {config.preferredNetworks.length > 0 ? (
                  <ul className="space-y-2">
                    {config.preferredNetworks.map((network) => (
                      <li key={network} className="flex justify-between items-center p-2 border rounded-md">
                        <span>{network}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleConfigChange('preferredNetworks', 
                            config.preferredNetworks.filter(n => n !== network)
                          )}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No preferred networks added</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="network" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="dns">
              <AccordionTrigger>DNS Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Input 
                      placeholder="Enter DNS server (e.g. 8.8.8.8)" 
                      value={dnsInput}
                      onChange={(e) => setDnsInput(e.target.value)}
                      className="mr-2"
                    />
                    <Button onClick={handleAddDns} type="button">Add</Button>
                  </div>
                  
                  <div className="space-y-2">
                    {config.dnsServers.map((dns) => (
                      <div key={dns} className="flex justify-between items-center p-2 border rounded-md">
                        <span>{dns}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemoveDns(dns)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="proxy">
              <AccordionTrigger>Proxy Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useProxy">Use proxy server</Label>
                    <Switch
                      id="useProxy"
                      checked={config.useProxy}
                      onCheckedChange={(checked) => handleConfigChange('useProxy', checked)}
                    />
                  </div>
                  
                  {config.useProxy && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="proxyServer">Server</Label>
                          <Input 
                            id="proxyServer"
                            placeholder="proxy.example.com" 
                            value={config.proxySettings?.server || ''}
                            onChange={(e) => handleConfigChange('proxySettings', {
                              ...(config.proxySettings || { server: '', port: 8080, bypass: [] }),
                              server: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="proxyPort">Port</Label>
                          <Input 
                            id="proxyPort"
                            type="number"
                            placeholder="8080" 
                            value={config.proxySettings?.port || 8080}
                            onChange={(e) => handleConfigChange('proxySettings', {
                              ...(config.proxySettings || { server: '', port: 8080, bypass: [] }),
                              port: parseInt(e.target.value) || 8080
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="proxyBypass">Bypass for</Label>
                        <Input 
                          id="proxyBypass"
                          placeholder="localhost, 127.0.0.1" 
                          value={config.proxySettings?.bypass?.join(', ') || ''}
                          onChange={(e) => handleConfigChange('proxySettings', {
                            ...(config.proxySettings || { server: '', port: 8080, bypass: [] }),
                            bypass: e.target.value.split(',').map(item => item.trim())
                          })}
                        />
                        <p className="text-xs text-muted-foreground">Comma-separated list of hosts</p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ip">
              <AccordionTrigger>IP Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useStaticIp">Use static IP</Label>
                    <Switch
                      id="useStaticIp"
                      checked={config.useStaticIp}
                      onCheckedChange={(checked) => handleConfigChange('useStaticIp', checked)}
                    />
                  </div>
                  
                  {config.useStaticIp && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="staticIp">IP Address</Label>
                        <Input 
                          id="staticIp"
                          placeholder="192.168.1.100" 
                          value={config.staticIpSettings?.ip || ''}
                          onChange={(e) => handleConfigChange('staticIpSettings', {
                            ...(config.staticIpSettings || { ip: '', gateway: '', subnet: '', dns: [] }),
                            ip: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="staticGateway">Gateway</Label>
                        <Input 
                          id="staticGateway"
                          placeholder="192.168.1.1" 
                          value={config.staticIpSettings?.gateway || ''}
                          onChange={(e) => handleConfigChange('staticIpSettings', {
                            ...(config.staticIpSettings || { ip: '', gateway: '', subnet: '', dns: [] }),
                            gateway: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="staticSubnet">Subnet Mask</Label>
                        <Input 
                          id="staticSubnet"
                          placeholder="255.255.255.0" 
                          value={config.staticIpSettings?.subnet || ''}
                          onChange={(e) => handleConfigChange('staticIpSettings', {
                            ...(config.staticIpSettings || { ip: '', gateway: '', subnet: '', dns: [] }),
                            subnet: e.target.value
                          })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Security Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Windows Defender Firewall Integration</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Linux LUKS Encryption</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Connection Sandboxing</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Credential Encryption</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-medium mb-2 text-yellow-800">Security Notice</h3>
            <p className="text-sm text-yellow-700">
              Advanced security features are managed by the system. Contact your administrator for custom security configurations.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveConfig}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default WifiAdvancedSettings;
