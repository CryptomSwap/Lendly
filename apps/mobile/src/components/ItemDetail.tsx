import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HEBREW_COPY, formatCurrency, formatDate } from '@lendly/shared';
import { Item, Booking } from '@lendly/shared';

interface ItemDetailProps {
  item: Item;
  onReserve: () => void;
  depositQuote?: any;
  insuranceEnabled: boolean;
  onInsuranceToggle: (enabled: boolean) => void;
}

export default function ItemDetail({
  item,
  onReserve,
  depositQuote,
  insuranceEnabled,
  onInsuranceToggle,
}: ItemDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Image Gallery */}
      <View className="h-64 bg-gray-200">
        {item.images.length > 0 ? (
          <Image
            source={{ uri: item.images[selectedImageIndex] }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="image-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2">אין תמונות</Text>
          </View>
        )}
      </View>

      <View className="px-6 py-4">
        {/* Title and Price */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 text-right mb-2">
            {item.title}
          </Text>
          <Text className="text-3xl font-bold text-primary-600 text-right">
            {formatCurrency(item.dailyPriceILS)} / יום
          </Text>
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 text-right mb-2">
            תיאור
          </Text>
          <Text className="text-gray-700 text-right leading-6">
            {item.description}
          </Text>
        </View>

        {/* Specs */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 text-right mb-3">
            מפרטים טכניים
          </Text>
          <View className="bg-gray-50 rounded-lg p-4">
            {Object.entries(item.specs).map(([key, value]) => (
              <View key={key} className="flex-row justify-between py-2 border-b border-gray-200 last:border-b-0">
                <Text className="text-gray-600 text-right">{key}:</Text>
                <Text className="text-gray-900 text-right font-medium">{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Owner Info */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 text-right mb-3">
            בעל הציוד
          </Text>
          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center ml-3">
                <Ionicons name="person" size={24} color="#0EA5E9" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 text-right">
                  {item.owner?.name}
                </Text>
                <Text className="text-gray-600 text-right">
                  {item.owner?.verified ? 'מאומת' : 'לא מאומת'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 text-right mb-3">
            מיקום
          </Text>
          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 text-right mr-2">
                {item.city}
              </Text>
            </View>
          </View>
        </View>

        {/* Reserve Button */}
        <TouchableOpacity
          className="bg-primary-600 rounded-lg py-4 mb-4"
          onPress={onReserve}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {HEBREW_COPY.RESERVE_BUTTON}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
