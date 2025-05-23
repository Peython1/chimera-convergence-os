
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, File, Code, Cog, Download } from "lucide-react";
import { useProjectConfig } from '@/hooks/useProjectConfig';

const ResourcesTab = () => {
  const { ROOT_DIR, RUST_TARGET } = useProjectConfig();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos e Documentação</CardTitle>
        <CardDescription>
          Ferramentas e materiais para desenvolvedores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                Scripts de Build
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md font-mono text-sm mb-3">
                <pre className="whitespace-pre-wrap">
{`#!/bin/bash
# scripts/build/build-all.sh

# Configurar ambiente
export CHIMERA_ROOT="${ROOT_DIR}"
export RUST_TARGET="${RUST_TARGET}"

# Build do kernel
cd "${ROOT_DIR}/kernel/core"
cargo build --release --target=${RUST_TARGET}

# Build da interface
cd "${ROOT_DIR}/ui/chimera-shell"
npm install
npm run build

# Gerar imagem final
cd "${ROOT_DIR}/scripts/image"
./create-iso.sh`}
                </pre>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Download className="h-4 w-4 mr-2" />
                Download Scripts
              </Button>
            </CardContent>
          </Card>
          
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
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Driver API Exemplo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                <pre className="whitespace-pre-wrap">
{`// kernel/drivers/src/hybrid_driver.rs
use chimera_kernel::driver::{DriverAPI, DeviceType, OSCompat};

/// Driver híbrido para dispositivos de entrada
#[derive(Debug)]
pub struct HybridInputDriver {
    device_id: String,
    vendor_id: u16,
    product_id: u16,
    compatible_with: OSCompat,
}

impl HybridInputDriver {
    pub fn new(device_id: &str, vendor_id: u16, product_id: u16) -> Self {
        Self {
            device_id: device_id.to_string(),
            vendor_id,
            product_id,
            compatible_with: OSCompat::Both,
        }
    }
}

impl DriverAPI for HybridInputDriver {
    fn init(&mut self) -> Result<(), DriverError> {
        println!("Inicializando driver para dispositivo {}", self.device_id);
        // Detectar sistema operacional atual
        let current_os = get_current_os_context();
        
        match current_os {
            OSType::Windows => {
                // Inicializar usando APIs do Windows
                self.init_windows_driver()?;
            },
            OSType::Linux => {
                // Inicializar usando APIs do Linux
                self.init_linux_driver()?;
            },
            OSType::Chimera => {
                // Inicializar usando APIs nativas do ChimeraOS
                self.init_native_driver()?;
            }
        }
        
        Ok(())
    }
    
    fn get_device_type(&self) -> DeviceType {
        DeviceType::Input
    }
    
    fn handle_interrupt(&mut self, irq: u8) -> Result<(), DriverError> {
        // Processar interrupção do dispositivo
        println!("Processando IRQ {} para dispositivo {}", irq, self.device_id);
        
        // Código para processar evento do dispositivo
        Ok(())
    }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
