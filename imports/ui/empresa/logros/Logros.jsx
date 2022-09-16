import React from 'react';
import { LogrosTable } from '../LogrosTable';
import { Sidebar } from '../Sidebar';

export const Logros = () => {
  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto">
        <article className="prose prose-xl font-bold">
        LOGROS
        </article>
        <LogrosTable />
      </div>
    </Sidebar>
  );
};