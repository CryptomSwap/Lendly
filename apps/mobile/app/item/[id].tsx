import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TopBar } from '../../src/components/ui/TopBar';
import { InsuranceSwitch } from '../../src/components/ui/InsuranceSwitch';
import { DepositWidget } from '../../src/components/ui/DepositWidget';
import { BottomAction } from '../../src/components/ui/BottomAction';
import { he } from '../../src/i18n/he';

export default function ItemScreen() {
  const { id } = useLocalSearchParams();
  const [insured, setInsured] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={String(id)} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 140 }}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800' }} style={{ width: '100%', height: 260 }} resizeMode="cover" />
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 18, marginBottom: 12 }}>{he.item.description}</Text>
          <Text style={{ textAlign: 'right', color: '#64748B' }}>—</Text>
          <View style={{ height: 16 }} />
          <Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 18, marginBottom: 12 }}>{he.item.availability}</Text>
          <Text style={{ textAlign: 'right', color: '#64748B' }}>—</Text>
          <View style={{ height: 16 }} />
          <Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 18, marginBottom: 12 }}>{he.item.location}</Text>
          <Text style={{ textAlign: 'right', color: '#64748B' }}>—</Text>
          <View style={{ height: 16 }} />
          <Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 18, marginBottom: 12 }}>{he.item.reviews}</Text>
          <Text style={{ textAlign: 'right', color: '#64748B' }}>—</Text>
          <View style={{ height: 20 }} />
          <InsuranceSwitch value={insured} onValueChange={setInsured} />
          <View style={{ height: 12 }} />
          <DepositWidget baseDeposit={500} insuranceDeposit={120} totalDeposit={insured ? 620 : 500} hasInsurance={insured} />
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#ffffff' }}>
        <BottomAction label={he.item.reserve} onPress={() => {}} />
      </View>
    </View>
  );
}


