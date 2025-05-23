
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const RepositoryStructureTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estrutura do Repositório</CardTitle>
        <CardDescription>
          Organização dos diretórios e módulos para desenvolvimento real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] rounded-md border p-4">
          <div className="font-mono">
            <p className="font-bold">chimera-os/</p>
            <p className="ml-4">├── .github/</p>
            <p className="ml-8">│   ├── workflows/         # CI/CD para testes e builds</p>
            <p className="ml-8">│   ├── ISSUE_TEMPLATE/    # Templates para issues</p>
            <p className="ml-8">│   └── CONTRIBUTING.md    # Guia para contribuidores</p>
            <p className="ml-4">├── kernel/</p>
            <p className="ml-8">│   ├── core/              # Núcleo em Rust</p>
            <p className="ml-12">│   │   ├── src/          # Código fonte do kernel</p>
            <p className="ml-12">│   │   ├── Cargo.toml    # Dependências Rust</p>
            <p className="ml-12">│   │   └── build.rs      # Script de build</p>
            <p className="ml-8">│   ├── windows-compat/    # Camada de compatibilidade Windows</p>
            <p className="ml-12">│   │   ├── src/          </p>
            <p className="ml-12">│   │   └── win32-api/    # Implementação de APIs Win32</p>
            <p className="ml-8">│   ├── linux-compat/      # Compatibilidade Linux</p>
            <p className="ml-12">│   │   ├── src/          </p>
            <p className="ml-12">│   │   └── syscalls/     # Implementação de syscalls Linux</p>
            <p className="ml-8">│   └── drivers/           # Framework de drivers híbridos</p>
            <p className="ml-4">├── ui/</p>
            <p className="ml-8">│   ├── chimera-shell/     # Interface principal</p>
            <p className="ml-12">│   │   ├── src/          # Código fonte React + Tauri</p>
            <p className="ml-12">│   │   ├── package.json  # Dependências JS</p>
            <p className="ml-12">│   │   └── tauri.conf.json # Config Tauri</p>
            <p className="ml-8">│   ├── win-theme/         # Temas estilo Windows</p>
            <p className="ml-8">│   └── linux-theme/       # Temas estilo Linux</p>
            <p className="ml-4">├── tools/</p>
            <p className="ml-8">│   ├── chimera-cli/       # Ferramenta de linha de comando</p>
            <p className="ml-8">│   ├── package-manager/   # Gerenciador de pacotes unificado</p>
            <p className="ml-8">│   └── port-tools/        # Ferramentas de portabilidade</p>
            <p className="ml-4">├── platform/</p>
            <p className="ml-8">│   ├── bootloader/        # Bootloader UEFI híbrido</p>
            <p className="ml-8">│   ├── virtualization/    # Integração QEMU/Virtio</p>
            <p className="ml-8">│   └── security/          # TPM e módulos de segurança</p>
            <p className="ml-4">├── docs/</p>
            <p className="ml-8">│   ├── architecture/      # Documentação técnica</p>
            <p className="ml-8">│   ├── api/               # Referência de APIs</p>
            <p className="ml-8">│   └── user-guide/        # Guia para usuários</p>
            <p className="ml-4">├── tests/</p>
            <p className="ml-8">│   ├── unit/              # Testes unitários</p>
            <p className="ml-8">│   ├── integration/       # Testes de integração</p>
            <p className="ml-8">│   └── hardware/          # Testes de compatibilidade</p>
            <p className="ml-4">└── scripts/</p>
            <p className="ml-8">    ├── build/             # Scripts de build</p>
            <p className="ml-8">    ├── deploy/            # Scripts de implantação</p>
            <p className="ml-8">    └── ci/                # Scripts de CI/CD</p>
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-2">Padrões de Desenvolvimento</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Toda nova funcionalidade requer testes unitários</li>
              <li>Documentação em formato Markdown em cada módulo</li>
              <li>Versão semântica (SemVer) para releases</li>
              <li>Branches nomeadas por feature (feature/nome-da-feature)</li>
              <li>Pull requests obrigatórios para qualquer alteração no main</li>
              <li>Code reviews por pelo menos 2 mantenedores do projeto</li>
            </ul>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RepositoryStructureTab;
