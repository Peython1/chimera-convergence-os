
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Download } from "lucide-react";

const ConfigurationGuideCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <File className="h-5 w-5 mr-2" />
          Guia de Configuração
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-3 rounded-md font-mono text-sm mb-3">
          <pre className="whitespace-pre-wrap">
{`# Arquivo de configuração chimera.toml

[system]
hostname = "chimera-dev"
default_ui = "linux"  # ou "windows"

[virtualization]
enable_kvm = true
memory_windows = 4096  # MB para subsistema Windows
memory_linux = 2048    # MB para subsistema Linux

[network]
bridge_mode = "shared"  # ou "isolated"
dhcp = true

[security]
secure_boot = true
encryption = "luks+bitlocker"
tpm_required = false`}
          </pre>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-3">
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConfigurationGuideCard;
