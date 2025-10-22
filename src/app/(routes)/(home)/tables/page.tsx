"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SimpleTableDemo from '@/components/tables/SimpleTableDemo';

const TablesDemoPage = () => {
  const [activeTab, setActiveTab] = useState('simple');

  return (
          
            <CardContent>
              <SimpleTableDemo />
            </CardContent>
  );
};

export default TablesDemoPage;