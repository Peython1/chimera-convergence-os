
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Download } from "lucide-react";
import { useProjectConfig } from '@/hooks/useProjectConfig';

const BuildScriptsCard = () => {
  const { ROOT_DIR, RUST_TARGET } = useProjectConfig();
  
  return (
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
  );
};

export default BuildScriptsCard;
