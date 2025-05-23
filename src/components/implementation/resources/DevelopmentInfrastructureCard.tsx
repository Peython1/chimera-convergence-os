
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";

const DevelopmentInfrastructureCard = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cog className="h-5 w-5 mr-2" />
          Infraestrutura de Desenvolvimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2">Requisitos para Desenvolvimento Local:</h4>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>Linux ou macOS (Windows com WSL2)</li>
          <li>Rust 1.70+ com target x86_64-unknown-none</li>
          <li>QEMU para virtualização</li>
          <li>Node.js 18+ para interface</li>
          <li>Nix para gerenciamento de dependências</li>
          <li>Pelo menos 16GB RAM</li>
          <li>50GB espaço em disco</li>
        </ul>
        
        <h4 className="font-medium mb-2">Comandos de Instalação:</h4>
        <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
          <pre className="whitespace-pre-wrap">
{`# Instalar dependências (Ubuntu/Debian)
sudo apt install build-essential qemu-system-x86 ovmf

# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add x86_64-unknown-none

# Instalar Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install --lts

# Instalar Nix (opcional, mas recomendado)
sh <(curl -L https://nixos.org/nix/install) --daemon

# Clonar repositório
git clone https://github.com/chimera-os/chimera.git
cd chimera

# Instalação inicial
./scripts/setup-dev-environment.sh`}
          </pre>
        </div>
        
        <Button className="w-full">
          Baixar VM de Desenvolvimento
        </Button>
      </CardContent>
    </Card>
  );
};

export default DevelopmentInfrastructureCard;
