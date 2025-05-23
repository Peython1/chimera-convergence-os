
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BuildScriptsCard from './resources/BuildScriptsCard';
import ConfigurationGuideCard from './resources/ConfigurationGuideCard';
import DriverApiExampleCard from './resources/DriverApiExampleCard';
import DevelopmentInfrastructureCard from './resources/DevelopmentInfrastructureCard';

const ResourcesTab = () => {
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
          <BuildScriptsCard />
          <ConfigurationGuideCard />
          <DriverApiExampleCard />
          <DevelopmentInfrastructureCard />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
