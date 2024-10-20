const {useRelayEnvironment} = require('react-relay');
import {Suspense} from 'react';
import { loadQuery } from 'react-relay';
import React, { useState, useEffect } from "react";
import SpamReportList, {SpamReportQuery} from '@/components/SpamReportList';
import { ActivityIndicator } from 'react-native-paper';

export default function SpamReportPanel(props) {
  const [queryReference, setQueryReference] = useState(null);

  const environment = useRelayEnvironment();

  useEffect(() => {
    setQueryReference(loadQuery<SpamReportQueryType>(
      environment,
      SpamReportQuery,
      {},
    ));
  }, [environment]);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      {queryReference != null
        ? <SpamReportList queryReference={queryReference} />
        : null
      }
    </Suspense>
  );
}
