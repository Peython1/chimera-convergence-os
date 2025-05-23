
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ImplementationTimelineTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cronograma de Implementação</CardTitle>
        <CardDescription>
          Fases detalhadas e marcos para o desenvolvimento real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fase</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Entregas</TableHead>
              <TableHead>Responsáveis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Preparação</TableCell>
              <TableCell>2 meses</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Infraestrutura de desenvolvimento</li>
                  <li>Escolha de ferramentas e padrões</li>
                  <li>Documentação inicial</li>
                  <li>Recrutamento de colaboradores</li>
                </ul>
              </TableCell>
              <TableCell>Equipe de DevOps & Liderança</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Protótipo MVP</TableCell>
              <TableCell>6 meses</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Kernel mínimo funcional</li>
                  <li>Bootloader UEFI básico</li>
                  <li>Subsistema de janelas simples</li>
                  <li>Suporte a drivers básicos</li>
                  <li>Shell de linha de comando</li>
                </ul>
              </TableCell>
              <TableCell>Especialistas Kernel & Sistema</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Desenvolvimento Alpha</TableCell>
              <TableCell>12 meses</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Integração completa dos subsistemas</li>
                  <li>Universal Search operacional</li>
                  <li>Compatibilidade com 20+ aplicativos</li>
                  <li>Suporte a hardware popular</li>
                  <li>Gerenciador de pacotes básico</li>
                </ul>
              </TableCell>
              <TableCell>Time completo</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Polimento Beta</TableCell>
              <TableCell>8 meses</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Correções de bugs e otimizações</li>
                  <li>Melhorias de performance</li>
                  <li>Documentação abrangente</li>
                  <li>Distribuição para testadores beta</li>
                  <li>Programa de certificação de hardware</li>
                </ul>
              </TableCell>
              <TableCell>QA & Comunidade</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Lançamento v1.0</TableCell>
              <TableCell>4 meses</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Estabilização final</li>
                  <li>Compatibilidade empresarial</li>
                  <li>Certificações de segurança</li>
                  <li>Canais de distribuição</li>
                  <li>Suporte ao cliente</li>
                </ul>
              </TableCell>
              <TableCell>Operações & Marketing</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-2">Métricas de Acompanhamento</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cobertura de testes (meta: &gt;85%)</li>
            <li>Compatibilidade de hardware (meta: 95% dos dispositivos populares)</li>
            <li>Performance comparativa (meta: no máximo 10% mais lento que nativos)</li>
            <li>Memória utilizada (meta: máximo 2GB para sistema base)</li>
            <li>Tempo de inicialização (meta: &lt;15 segundos em hardware moderno)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImplementationTimelineTab;
