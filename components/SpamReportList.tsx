import { View } from 'react-native';

import { graphql } from 'relay-runtime';
import { usePreloadedQuery } from 'react-relay';
import { DataTable } from 'react-native-paper';

export const SpamReportQuery = graphql`
  query SpamReportListQuery {
    spamReports {
      id
      timestamp
      fromNumber
      channelType
      issueType
      status
      user {
        username
        firstName
        middleName
        lastName
      }
    }
  }
`;

type Props = {
  queryReference: PreloadedQuery<SpamReportQueryType>,
};

export default function SpamReportList({ queryReference }: Props) {
  data = usePreloadedQuery(SpamReportQuery, queryReference);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Time</DataTable.Title>
        <DataTable.Title>From</DataTable.Title>
        <DataTable.Title>Channel</DataTable.Title>
        <DataTable.Title>Issue</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        <DataTable.Title>Reported by</DataTable.Title>
      </DataTable.Header>
      {data['spamReports'].map(report =>
        <DataTable.Row key={report.id}>
          <DataTable.Cell>{report.timestamp}</DataTable.Cell>
          <DataTable.Cell>{report.fromNumber}</DataTable.Cell>
          <DataTable.Cell>{report.channelType}</DataTable.Cell>
          <DataTable.Cell>{report.issueType}</DataTable.Cell>
          <DataTable.Cell>{report.status}</DataTable.Cell>
          <DataTable.Cell>{report.firstName} {report.middleName} {report.LastName}</DataTable.Cell>
        </DataTable.Row>
      )}
    </DataTable>
  );
}
