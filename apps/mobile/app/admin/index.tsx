import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TopBar } from '../../src/components/ui/TopBar';
import { he } from '../../src/i18n/he';

export default function AdminScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14' }}>
      <TopBar title={he.admin || 'ניהול'} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 60 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: 'right', color: '#E2E8F0' }}>—</Text>
        </View>
      </ScrollView>
    </View>
  );
}


