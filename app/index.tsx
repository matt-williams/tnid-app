import { Image, Text, View, StyleSheet, TextInput, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import ThemedButton from '@/components/ThemedButton';
import UserPanel from '@/components/UserPanel';
import RelayEnvironment from '@/components/RelayEnvironment';

import React, { useState } from "react";


export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const createUserOtp = async () => {
    try {
      const url = 'https://api.staging.v2.tnid.com/auth/create_user_otp';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'telephone_number': phoneNumber.replace('^+', '')})
      });
      const json = await response.json();
      //setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  };

  return (
    <RelayEnvironment>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Login</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />
        <Button title="Log in" onPress={createUserOtp} />
        <UserPanel />
      </ThemedView>
    </ParallaxScrollView>
    </RelayEnvironment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
/*
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
*/
});
