import { StyleSheet, View, TextInput, Button } from 'react-native';

const { useMutation } = require('react-relay');
import React, { useState, useContext, useCallback, useEffect } from "react";
import { AppContext } from '@/components/AppContext';
import { ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { DatePickerModal, TimePickerModal, registerTranslation, en } from 'react-native-paper-dates'
import PickerSelect from 'react-native-picker-select';

export const AddSpamReportMutation = graphql`
  mutation AddSpamReportMutation(
    $fromNumber: String!,
    $timestamp: NaiveDateTime!,
    $toNumber: String!
  ) {
    createSpamReport(
      channelType: VOICE,
      fromNumber: $fromNumber,
      issueType: FRAUD,
      messageContent: "",
      metadata: "{}",
      timestamp: $timestamp,
      toNumber: $toNumber,
      userNote: ""
    ) {
      id
    }
  }
`;

export default function AddSpamReport() {
  const { appState, setPhoneNumber, setToken } = useContext(AppContext);
  const dateNow = new Date();
  dateNow.setSeconds(0);
  const [date, setDate] = useState(dateNow);
  const [dateVisible, setDateVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [fromNumber, setFromNumber] = useState("");
  const [issue, setIssue] = useState("FRAUD");
  const [commitMutation, isMutationInFlight] = useMutation(AddSpamReportMutation);

  function addSpamReport() {
    commitMutation({
      variables: {
        fromNumber: fromNumber.replace('+', ''),
        // TODO: Plumb this through
        // issueType: issue,
        timestamp: date,
        toNumber: appState.phoneNumber.replace('+', '')
      },
      onError: (error) => alert(error),
      onCompleted: (response) => router.back()
    } );
  }
  useEffect(() => {
    registerTranslation('en', en);
  }, []);
  const onDateDismiss = useCallback(() => {
    setDateVisible(false);
  }, [setDateVisible]);
  const onDateConfirm = useCallback(({ date }) => {
    setDate(date);
    setDateVisible(false);
  }, [setDateVisible]);
  const onTimeDismiss = useCallback(() => {
    setTimeVisible(false);
  }, [setTimeVisible]);
  const onTimeConfirm = useCallback(({ hours, minutes }) => {
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
    setTimeVisible(false);
  }, [setTimeVisible]);

  return  (
    <View>
      <TextInput value={date} editable={false} style={{marginBottom: 0, ...styles.input}} />
      <View style={{flexDirection: "row"}}>
        <Button title="Pick date" onPress={() => setDateVisible(true)} />
        <Button title="Pick time" onPress={() => setTimeVisible(true)} />
      </View>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={dateVisible}
        date={date}
        onConfirm={onDateConfirm}
        onDismiss={onDateDismiss}
      />
      <TimePickerModal
        visible={timeVisible}
        hours={date.getHours()}
        minutes={date.getMinutes()}
        onConfirm={onTimeConfirm}
        onDismiss={onTimeDismiss}
      />
      <TextInput
        style={styles.input}
        value={fromNumber}
        onChangeText={setFromNumber}
        autoComplete="tel"
        placeholder="From phone number"
        keyboardType="phone-pad"
      />
      <PickerSelect
        value={issue}
        onValueChange={value => setIssue(value)}
        items={[{label: 'Fraud', value: 'FRAUD'},
                {label: 'Harrassment', value: 'HARRASSMENT'},
                {label: 'Illegal content', value: 'ILLEGAL_CONTENT'},
                {label: 'Scam', value: 'SCAM'},
                {label: 'Spam', value: 'SPAM'}]}
      />
      <View style={{marginTop: 12}}>
        <Button title="Add" onPress={addSpamReport} />
      </View>
      <ActivityIndicator animating={isMutationInFlight} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  }
});
