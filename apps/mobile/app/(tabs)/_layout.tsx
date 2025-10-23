import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HEBREW_COPY } from '@lendly/shared';

export default function TabLayout() {
  return (
    <View className="flex-1 bg-white">
      {/* Tab Content */}
      <View className="flex-1">
        {/* This will be replaced by the actual screen content */}
      </View>

      {/* Bottom Tab Bar */}
      <View className="bg-white border-t border-gray-200 px-4 py-2">
        <View className="flex-row justify-around">
          <TouchableOpacity
            className="items-center py-2"
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="home-outline" size={24} color="#6B7280" />
            <Text className="text-xs text-gray-600 mt-1">
              {HEBREW_COPY.NAV.HOME}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center py-2"
            onPress={() => router.push('/(tabs)/browse')}
          >
            <Ionicons name="grid-outline" size={24} color="#6B7280" />
            <Text className="text-xs text-gray-600 mt-1">
              {HEBREW_COPY.NAV.BROWSE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center py-2"
            onPress={() => router.push('/owner/list')}
          >
            <Ionicons name="list-outline" size={24} color="#6B7280" />
            <Text className="text-xs text-gray-600 mt-1">
              {HEBREW_COPY.NAV.MY_LISTINGS}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center py-2"
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#6B7280" />
            <Text className="text-xs text-gray-600 mt-1">
              {HEBREW_COPY.NAV.SETTINGS}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
