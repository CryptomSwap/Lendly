import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TopBar } from '../../src/components/ui/TopBar';
import { BottomAction } from '../../src/components/ui/BottomAction';
import { he } from '../../src/i18n/he';

export default function OwnerDashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={he.owner.dashboard} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 120 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: 'right', marginBottom: 8 }}>— {he.results.title}</Text>
          <Text style={{ textAlign: 'right', marginBottom: 8 }}>— {he.owner.dashboard}</Text>
          <Text style={{ textAlign: 'right', marginBottom: 8 }}>— {he.owner.new}</Text>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff' }}>
        <BottomAction label={he.owner.new} onPress={() => {}} />
      </View>
    </View>
  );
}


