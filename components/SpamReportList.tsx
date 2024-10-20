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

const CHANNEL_TYPES = {
  'MMS': 'MMS',
  'RCS': 'RCS',
  'SMS': 'SMS',
  'VOICE': 'Voice',
};
const ISSUE_TYPES = {
  'FRAUD': 'Fraud',
  'HARASSMENT': 'Harassment',
  'ILLEGAL_CONTENT': 'Illegal content',
  'SCAM': 'Scam',
  'SPAM': 'Spam',
};
const STATUSES = {
  'CLOSED': 'Closed',
  'ESCALATED': 'Escalated',
  'PROCESSING': 'Processing',
  'REJECTED': 'Rejected',
  'SUBMITTED': 'Submitted',
};

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
          <DataTable.Cell>{CHANNEL_TYPES[report.channelType]}</DataTable.Cell>
          <DataTable.Cell>{ISSUE_TYPES[report.issueType]}</DataTable.Cell>
          <DataTable.Cell>{STATUSES[report.status]}</DataTable.Cell>
          <DataTable.Cell>{report.user.firstName} {report.user.lastName}</DataTable.Cell>
        </DataTable.Row>
      )}
    </DataTable>
  );
}
