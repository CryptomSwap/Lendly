import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TopBar } from '../../src/components/ui/TopBar';
import { he } from '../../src/i18n/he';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [text, setText] = React.useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={he.chat || 'צ׳אט'} subtitle={String(id)} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 80 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: 'right', marginBottom: 8 }}>{he.common.loading}</Text>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput value={text} onChangeText={setText} placeholder={he.search.placeholder} placeholderTextColor="#94A3B8" style={{ flex: 1, textAlign: 'right' }} />
        <Pressable onPress={() => setText('')} style={{ paddingHorizontal: 12 }}>
          <Text>שלח</Text>
        </Pressable>
      </View>
    </View>
  );
}


