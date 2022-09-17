import React, { useEffect } from 'react';
import { LogrosTable } from '../LogrosTable';
import { Sidebar } from '../Sidebar';
import { Attestations } from '../../../api/attestations/attestations-module';
import { useApi } from '/imports/api/utils/client-utils';

export const Logros = () => {
  const getAttestationCounts = useApi(Attestations.api.getAttestationCounts);
  useEffect(() => {
    getAttestationCounts.call();
  }, []);
  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto h-full">
        <article className="prose prose-xl font-bold">
        LOGROS
        </article>
        {
          getAttestationCounts.res &&
          <LogrosTable attestations={getAttestationCounts.res} />
        }
      </div>
    </Sidebar>
  );
};