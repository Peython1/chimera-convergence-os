
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const PageHeader = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">ChimeraOS - Implementação Real</h1>
      <p className="text-muted-foreground">
        Planejamento de transição da simulação para o desenvolvimento real
      </p>
      <div className="flex justify-center mt-4 space-x-2">
        <Button variant="outline" asChild>
          <Link to="/project-plan">
            Voltar ao Plano de Projeto
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
