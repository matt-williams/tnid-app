import { PaperProvider } from 'react-native-paper';
import AppProvider from '@/components/AppContext';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <PaperProvider>
      <AppProvider>
        <Slot />
      </AppProvider>
    </PaperProvider>
  );
}
