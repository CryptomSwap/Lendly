import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { TopBar } from '../../src/components/ui/TopBar';
import { ChecklistStep } from '../../src/components/ui/ChecklistStep';
import { BottomAction } from '../../src/components/ui/BottomAction';
import { he } from '../../src/i18n/he';

export default function PickupChecklist() {
  const [serial, setSerial] = React.useState('');
  const steps = Array.from({ length: 6 }).map((_, i) => ({ id: i }));
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={he.pickup.title} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 120, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {steps.map(s => (
            <ChecklistStep key={s.id} label={`צילום ${s.id + 1}`} onPress={() => {}} />
          ))}
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ textAlign: 'right', marginBottom: 6 }}>{he.pickup.serial}</Text>
          <TextInput value={serial} onChangeText={setSerial} placeholder={he.pickup.serial} placeholderTextColor="#94A3B8" style={{ borderWidth: 1, borderColor: 'rgba(2,6,23,0.06)', borderRadius: 14, padding: 12, textAlign: 'right', backgroundColor: '#fff' }} />
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff' }}>
        <BottomAction label={he.pickup.confirm} onPress={() => {}} />
      </View>
    </View>
  );
}


