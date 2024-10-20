import { Image, StyleSheet, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SpamReportPanel from '@/components/SpamReportPanel';
import RelayEnvironment from '@/components/RelayEnvironment';
import { router } from 'expo-router';

export default function SpamReportsScreen() {
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
      <ThemedView>
        <ThemedText type="title">Spam Reports</ThemedText>
      </ThemedView>
      <Button title="Add" onPress={() => {router.push('/add-spam-report')}} />
      <SpamReportPanel />
    </ParallaxScrollView>
    </RelayEnvironment>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});
