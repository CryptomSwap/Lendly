import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TopBar } from '../../src/components/ui/TopBar';
import { BottomAction } from '../../src/components/ui/BottomAction';
import { he } from '../../src/i18n/he';

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={String(id)} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 120 }}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#ECFEFF', borderRadius: 14, padding: 12, marginBottom: 12 }}>
            <Text style={{ textAlign: 'right' }}>{he.booking.expires}</Text>
          </View>
          <Text style={{ textAlign: 'right', marginBottom: 16 }}>—</Text>
          <BottomAction label={he.booking.openChat} onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  );
}


