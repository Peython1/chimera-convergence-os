
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectConfig } from "@/hooks/useProjectConfig";
import PageHeader from "@/components/implementation/PageHeader";
import RepositoryStructureTab from "@/components/implementation/RepositoryStructureTab";
import MainComponentsTab from "@/components/implementation/MainComponentsTab";
import ImplementationTimelineTab from "@/components/implementation/ImplementationTimelineTab";
import ResourcesTab from "@/components/implementation/ResourcesTab";

const Implementation = () => {
  return (
    <div className="container mx-auto p-4 bg-background text-foreground">
      <PageHeader />
      
      <Tabs defaultValue="repository" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="repository">Estrutura do Repositório</TabsTrigger>
          <TabsTrigger value="components">Componentes Principais</TabsTrigger>
          <TabsTrigger value="implementation">Cronograma</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="repository">
          <RepositoryStructureTab />
        </TabsContent>
        
        <TabsContent value="components">
          <MainComponentsTab />
        </TabsContent>
        
        <TabsContent value="implementation">
          <ImplementationTimelineTab />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Implementation;
