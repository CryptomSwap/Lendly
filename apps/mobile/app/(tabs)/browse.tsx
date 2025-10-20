import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TopBar } from '../../src/components/ui/TopBar';
import { CategoryPill } from '../../src/components/ui/CategoryPill';
import { he } from '../../src/i18n/he';

export default function BrowseScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F9' }}>
      <TopBar title={he.home.categories} />
      <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 40 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <CategoryPill label={he.categories.cameras} icon="camera" onPress={() => {}} />
          <CategoryPill label={he.categories.drones} icon="drone" onPress={() => {}} />
          <CategoryPill label={he.categories.tools} icon="wrench" onPress={() => {}} />
          <CategoryPill label={he.categories.dj} icon="music" onPress={() => {}} />
          <CategoryPill label={he.categories.camping} icon="tent" onPress={() => {}} />
          <CategoryPill label={he.categories.events} icon="calendar" onPress={() => {}} />
        </ScrollView>
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: 'right' }}>{he.common.loading}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { HEBREW_COPY, CATEGORIES } from '@lendly/shared';
import { useSearchStore } from '@/store/search';

export default function BrowseScreen() {
  const { setCategory } = useSearchStore();

  const handleCategoryPress = (category: keyof typeof CATEGORIES) => {
    setCategory(category);
    router.push('/results');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-20 pb-8">
        <Text className="text-2xl font-bold text-gray-900 text-right mb-6">
          {HEBREW_COPY.NAV.BROWSE}
        </Text>

        <View className="space-y-4">
          {Object.entries(CATEGORIES).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              onPress={() => handleCategoryPress(key as keyof typeof CATEGORIES)}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-gray-900 text-right">
                  {value}
                </Text>
                <Text className="text-primary-600 text-lg">←</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Request New Category */}
        <View className="mt-8 bg-gray-50 rounded-lg p-6">
          <Text className="text-lg font-semibold text-gray-900 text-right mb-2">
            לא מוצא את מה שאתה מחפש?
          </Text>
          <Text className="text-gray-600 text-right mb-4">
            בקש להוסיף קטגוריה חדשה
          </Text>
          <TouchableOpacity
            className="bg-primary-600 rounded-lg py-3"
            onPress={() => router.push('/niche/request')}
          >
            <Text className="text-white text-center font-semibold">
              בקש קטגוריה חדשה
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
