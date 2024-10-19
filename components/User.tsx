import React from "react";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Props = {
  user: {
    firstName: string;
    lastName: string;
    id: string;
    username: string;
  };
};

export default function User({ user }: Props): React.ReactElement {
  return (
    <ThemedView>
      <ThemedText>{user.id}</ThemedText>
      <ThemedText>{user.firstName}</ThemedText>
      <ThemedText>{user.lastName}</ThemedText>
      <ThemedText>{user.username}</ThemedText>
    </ThemedView>
  );
}
