
import React, { useState } from 'react';
import WifiList from './WifiList';
import WifiAdvancedSettings from './WifiAdvancedSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Wifi, Settings, Shield } from 'lucide-react';

const WifiManager: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Wifi className="mr-2 h-5 w-5 text-blue-500" />
          <h1 className="text-lg font-medium">Wi-Fi Manager</h1>
        </div>
      </div>
      
      <Tabs defaultValue="networks" className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b px-4">
          <TabsList className="mb-0">
            <TabsTrigger value="networks" className="flex items-center">
              <Wifi className="mr-2 h-4 w-4" />
              Networks
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="networks" className="h-full m-0 p-0">
            <WifiList />
          </TabsContent>
          
          <TabsContent value="advanced" className="h-full m-0 p-0">
            <WifiAdvancedSettings />
          </TabsContent>
          
          <TabsContent value="security" className="h-full m-0 p-0">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
                  <h3 className="font-medium text-indigo-700 mb-2">Hybrid Security System</h3>
                  <p className="text-sm text-indigo-600 mb-4">
                    This system combines Windows Defender Firewall with Linux Sandboxing to provide maximum protection for your network connections.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-sm">Windows Components</h4>
                      <ul className="text-xs space-y-1 mt-2 text-gray-600">
                        <li>• Windows Defender Firewall</li>
                        <li>• TPM-based Encryption</li>
                        <li>• Certificate Store</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-sm">Linux Components</h4>
                      <ul className="text-xs space-y-1 mt-2 text-gray-600">
                        <li>• Namespace Isolation</li>
                        <li>• LUKS Encryption</li>
                        <li>• MAC Address Randomization</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">VPN Integration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Secure your connection with integrated VPN support
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status: <span className="text-red-500 font-medium">Not Connected</span></span>
                    <Button variant="outline" size="sm">
                      Configure VPN
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Certificate Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage certificates for WPA-Enterprise networks
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Import Certificate
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Advanced Firewall Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure rules for network traffic
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Open Firewall Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default WifiManager;
