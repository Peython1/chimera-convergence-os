
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectPlan = () => {
  return (
    <div className="container mx-auto p-4 bg-background text-foreground">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">ChimeraOS - Plano de Implementação</h1>
        <p className="text-muted-foreground">
          Transformando a simulação em um sistema operacional híbrido funcional
        </p>
      </div>
      
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
          <TabsTrigger value="tech-stack">Stack Técnico</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
          <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="architecture">
          <Card>
            <CardHeader>
              <CardTitle>Arquitetura do Sistema</CardTitle>
              <CardDescription>
                Estrutura de diretórios e organização do projeto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="font-mono">
                  <p className="font-bold">chimera-os/</p>
                  <p className="ml-4">├── kernel/</p>
                  <p className="ml-8">│   ├── core/              # Núcleo do kernel híbrido</p>
                  <p className="ml-8">│   ├── interfaces/        # APIs do kernel</p>
                  <p className="ml-8">│   ├── subsystems/        # Componentes do sistema</p>
                  <p className="ml-8">│   └── drivers/           # Framework de drivers</p>
                  <p className="ml-4">├── ui/</p>
                  <p className="ml-8">│   ├── common/            # Componentes compartilhados</p>
                  <p className="ml-8">│   ├── win-shell/         # Interface estilo Windows</p>
                  <p className="ml-8">│   └── linux-shell/       # Interface estilo Linux</p>
                  <p className="ml-4">├── platform/</p>
                  <p className="ml-8">│   ├── bootloader/        # Bootloader híbrido</p>
                  <p className="ml-8">│   ├── virtualization/    # Camada de virtualização</p>
                  <p className="ml-8">│   └── security/          # Módulos de segurança</p>
                  <p className="ml-4">├── tools/</p>
                  <p className="ml-8">│   ├── chimera-cli/       # Interface de linha de comando</p>
                  <p className="ml-8">│   ├── sdk/               # Kit de desenvolvimento</p>
                  <p className="ml-8">│   └── converters/        # Ferramentas de portabilidade</p>
                  <p className="ml-4">└── packaging/</p>
                  <p className="ml-8">    ├── installer/         # Sistema de instalação</p>
                  <p className="ml-8">    ├── store/             # Chimera Store</p>
                  <p className="ml-8">    └── deploy/            # Scripts de implementação</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tech-stack">
          <Card>
            <CardHeader>
              <CardTitle>Stack Técnico</CardTitle>
              <CardDescription>
                Tecnologias fundamentais para cada componente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Camada</th>
                      <th className="px-4 py-2 text-left">Tecnologias</th>
                      <th className="px-4 py-2 text-left">Justificativa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Kernel</td>
                      <td className="px-4 py-2">Rust + Unikernel + C++ (interop)</td>
                      <td className="px-4 py-2">Segurança de memória, performance e compatibilidade com drivers existentes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Virtualização</td>
                      <td className="px-4 py-2">QEMU/KVM + Virtio + WSL2 tech</td>
                      <td className="px-4 py-2">Execução nativa de binários Windows/Linux com overhead mínimo</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Interface</td>
                      <td className="px-4 py-2">React Native + Tauri + WinUI3 + GTK4</td>
                      <td className="px-4 py-2">UI/UX unificada com acesso a APIs nativas</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Build System</td>
                      <td className="px-4 py-2">Nix + CMake + Cargo</td>
                      <td className="px-4 py-2">Reprodutibilidade, gerenciamento de dependências e integração contínua</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Packaging</td>
                      <td className="px-4 py-2">AppImage + MSIX + Flatpak</td>
                      <td className="px-4 py-2">Distribuição unificada e portável</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Armazenamento</td>
                      <td className="px-4 py-2">BTRFS + ReFS + FUSE</td>
                      <td className="px-4 py-2">Sistema de arquivos compatível com snapshot e recuperação</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Roadmap de Desenvolvimento</CardTitle>
              <CardDescription>
                Fases de implementação e marcos importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Fase 1: MVP (6 meses)</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Bootloader híbrido funcional</li>
                    <li>Kernel mínimo com suporte a drivers básicos</li>
                    <li>Interface de usuário unificada simples</li>
                    <li>Compatibilidade com 5 dispositivos certificados</li>
                    <li>Execução de aplicativos básicos Windows e Linux</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Fase 2: Ecossistema (12 meses)</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Chimera Store com aplicativos unificados</li>
                    <li>SDK para desenvolvedores</li>
                    <li>Suporte a drivers genéricos</li>
                    <li>Sistema de atualizações OTA</li>
                    <li>APIs cross-platform para desenvolvimento</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Fase 3: Enterprise (18 meses)</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Integração com Active Directory e LDAP</li>
                    <li>Suporte a políticas de grupo</li>
                    <li>Certificações de segurança (FIPS 140-2)</li>
                    <li>Ferramentas de administração remota</li>
                    <li>Soluções de backup e recuperação empresariais</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="infrastructure">
          <Card>
            <CardHeader>
              <CardTitle>Requisitos de Infraestrutura</CardTitle>
              <CardDescription>
                Hardware e software necessários para desenvolvimento e execução
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Requisitos Mínimos:</h3>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <p>CPU: x86_64 com suporte a virtualização (VT-x/AMD-V)</p>
                    <p>RAM: 4GB</p>
                    <p>Armazenamento: 20GB SSD</p>
                    <p>GPU: Compatível com OpenGL 3.3+</p>
                  </div>
                  <div className="mt-2 bg-muted p-3 rounded-md font-mono text-sm">
                    <p>qemu-system-x86_64 -m 4G -cpu host -enable-kvm -smp 4 \</p>
                    <p>  -drive file=chimera.img,format=raw \</p>
                    <p>  -device virtio-net-pci,netdev=net0 \</p>
                    <p>  -netdev user,id=net0</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Configuração Recomendada:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Placa-mãe com suporte a Intel VT-d/AMD-Vi</li>
                    <li>16GB+ RAM</li>
                    <li>SSD NVMe de alta velocidade (500GB+)</li>
                    <li>GPU com suporte a Vulkan 1.3+</li>
                    <li>TPM 2.0 para segurança avançada</li>
                    <li>Conexão de rede de alta velocidade</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Ambiente de Desenvolvimento:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Linux ou macOS para desenvolvimento</li>
                    <li>Docker/Podman para containers de build</li>
                    <li>Nix para gerenciamento de pacotes desenvolvimento</li>
                    <li>CI/CD com GitHub Actions ou GitLab CI</li>
                    <li>QEMU/KVM para testes de virtualização</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle>Processo de Desenvolvimento</CardTitle>
              <CardDescription>
                Metodologia e ferramentas para contribuição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Modelo de Desenvolvimento:</h3>
                  <p className="mb-2">Desenvolvimento baseado em trunk com feature flags:</p>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <p>git clone https://github.com/chimera-os/chimera.git</p>
                    <p>cd chimera</p>
                    <p>nix-shell</p>
                    <p>make setup-dev</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Pipeline de CI/CD:</h3>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <p>name: Chimera Build Pipeline</p>
                    <p>on: [push, pull_request]</p>
                    <p>jobs:</p>
                    <p>  build:</p>
                    <p>    runs-on: self-hosted-builder</p>
                    <p>    steps:</p>
                    <p>      - uses: actions/checkout@v3</p>
                    <p>      - name: Setup Nix</p>
                    <p>        uses: cachix/install-nix-action@v17</p>
                    <p>      - name: Build Kernel</p>
                    <p>        run: nix-build -A kernel</p>
                    <p>      - name: Test</p>
                    <p>        run: nix-build -A tests</p>
                    <p>      - name: Package</p>
                    <p>        run: nix-build -A iso</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Certificações e Compliance:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>UEFI Secure Boot</li>
                    <li>FIPS 140-2 para criptografia</li>
                    <li>Auditoria de licenças (GPL, MIT, Windows EULA)</li>
                    <li>CE/FCC para hardware de referência</li>
                    <li>ISO 27001 para processos de desenvolvimento</li>
                  </ul>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="px-6">
                    Baixar Whitepaper Técnico
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPlan;
