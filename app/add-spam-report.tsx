import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import RelayEnvironment from '@/components/RelayEnvironment';
import AddSpamReport from '@/components/AddSpamReport';

export default function AddSpamReportScreen() {
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
        <ThemedText type="title">Add Spam Report</ThemedText>
      </ThemedView>
      <AddSpamReport />
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
