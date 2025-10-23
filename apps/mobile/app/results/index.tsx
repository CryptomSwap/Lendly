import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { TopBar } from '../../src/components/ui/TopBar';
import { FilterSheet } from '../../src/components/ui/FilterSheet';
import { ListingCard } from '../../src/components/ui/ListingCard';
import { he } from '../../src/i18n/he';

export default function ResultsScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={he.results.title} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pressable onPress={() => setOpen(true)} style={{ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(2,6,23,0.06)' }}>
            <Text style={{ textAlign: 'right' }}>{he.filters.title}</Text>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ textAlign: 'right', marginBottom: 8 }}>{he.common.loading}</Text>
        </View>
      </ScrollView>
      <FilterSheet visible={open} onClose={() => setOpen(false)} onApply={() => setOpen(false)} onReset={() => {}}>
        <Text style={{ textAlign: 'right', marginBottom: 12 }}>{he.filters.distance}</Text>
        <Text style={{ textAlign: 'right', marginBottom: 12 }}>{he.filters.price}</Text>
        <Text style={{ textAlign: 'right', marginBottom: 12 }}>{he.filters.rating}</Text>
        <Text style={{ textAlign: 'right', marginBottom: 12 }}>{he.filters.availability}</Text>
      </FilterSheet>
    </View>
  );
}


