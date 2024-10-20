import { Image, Text, View, StyleSheet, TextInput, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import UserPanel from '@/components/UserPanel';
import RelayEnvironment from '@/components/RelayEnvironment';
import { ActivityIndicator } from 'react-native-paper';

import React, { useContext, useState } from "react";
import { router } from 'expo-router';
import { AppContext } from '@/components/AppContext';


export default function LoginScreen() {
  const { appState, setPhoneNumber, setToken } = useContext(AppContext)!;
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const authToken = async () => {
    setLoading(true);
    try {
      const url = 'https://api.staging.v2.tnid.com/auth/token';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'telephone_number': appState.phoneNumber.replace('+', ''), "otp_code": otp})
      });
      const json = await response.json();
      if (json['message']) {
        alert(json['message']);
      } else {
        setToken(json['access_token'])
        router.navigate('/spam-reports');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView>
        <ThemedText type="title">OTP Validation</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={setOtp}
          onSubmitEditing={authToken}
          value={otp}
          placeholder="OTP"
          keyboardType="phone-pad"
        />
        <Button title="Submit" onPress={authToken} />
        <ActivityIndicator animating={loading} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  }
});
