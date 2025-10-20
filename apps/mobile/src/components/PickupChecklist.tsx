import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { HEBREW_COPY } from '@lendly/shared';

interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  completed: boolean;
  image?: string;
  note?: string;
}

interface PickupChecklistProps {
  onComplete: (data: { photos: string[]; serial: string; conditionCheck: boolean }) => void;
}

export default function PickupChecklist({ onComplete }: PickupChecklistProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: '1', label: 'צילום כללי של הציוד', required: true, completed: false },
    { id: '2', label: 'צילום מספר סידורי', required: true, completed: false },
    { id: '3', label: 'צילום מצב חיצוני', required: true, completed: false },
    { id: '4', label: 'צילום אביזרים נלווים', required: true, completed: false },
    { id: '5', label: 'צילום סוללה/מקור חשמל', required: true, completed: false },
    { id: '6', label: 'צילום תיק/אריזה', required: true, completed: false },
  ]);
  
  const [serialNumber, setSerialNumber] = useState('');
  const [conditionCheck, setConditionCheck] = useState(false);

  const updateChecklistItem = (id: string, updates: Partial<ChecklistItem>) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const takePhoto = async (itemId: string) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('שגיאה', 'נדרשת הרשאה לגישה למצלמה');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateChecklistItem(itemId, { 
        completed: true, 
        image: result.assets[0].uri 
      });
    }
  };

  const handleComplete = () => {
    const photos = checklistItems
      .filter(item => item.image)
      .map(item => item.image!);
    
    if (photos.length < 6) {
      Alert.alert('שגיאה', 'נדרש לצלם את כל התמונות הנדרשות');
      return;
    }

    if (!serialNumber.trim()) {
      Alert.alert('שגיאה', 'נדרש למלא את מספר הסידורי');
      return;
    }

    if (!conditionCheck) {
      Alert.alert('שגיאה', 'נדרש לאשר את בדיקת התקינות');
      return;
    }

    onComplete({
      photos,
      serial: serialNumber,
      conditionCheck,
    });
  };

  const allRequiredCompleted = checklistItems.every(item => 
    !item.required || item.completed
  ) && serialNumber.trim() && conditionCheck;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-20 pb-8">
        <Text className="text-2xl font-bold text-gray-900 text-right mb-6">
          {HEBREW_COPY.CHECKLIST.PICKUP_TITLE}
        </Text>

        {/* Checklist Items */}
        <View className="space-y-4 mb-6">
          {checklistItems.map((item) => (
            <View key={item.id} className="bg-gray-50 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-base font-medium text-gray-900 text-right flex-1">
                  {item.label}
                </Text>
                {item.required && (
                  <Text className="text-red-500 text-sm">*</Text>
                )}
              </View>
              
              {item.image ? (
                <View className="mb-3">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-32 rounded-lg"
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <TouchableOpacity
                  className="bg-primary-600 rounded-lg py-3 mb-3"
                  onPress={() => takePhoto(item.id)}
                >
                  <Text className="text-white text-center font-medium">
                    {HEBREW_COPY.CHECKLIST.PHOTOS_REQUIRED}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Serial Number */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 text-right mb-3">
            {HEBREW_COPY.CHECKLIST.SERIAL_NUMBER}
          </Text>
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="text-gray-700 text-right">
              הזן את מספר הסידורי של הציוד
            </Text>
            <View className="mt-3">
              <Text className="text-sm text-gray-600 text-right mb-2">
                מספר סידורי:
              </Text>
              <View className="bg-white border border-gray-300 rounded-lg px-4 py-3">
                <Text className="text-right">
                  {serialNumber || 'הזן מספר סידורי...'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Condition Check */}
        <View className="mb-6">
          <TouchableOpacity
            className="flex-row items-center justify-between bg-gray-50 rounded-lg p-4"
            onPress={() => setConditionCheck(!conditionCheck)}
          >
            <Text className="text-base font-medium text-gray-900 text-right flex-1">
              {HEBREW_COPY.CHECKLIST.CONDITION_CHECK}
            </Text>
            <Ionicons
              name={conditionCheck ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={conditionCheck ? '#10B981' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          className={`rounded-lg py-4 ${
            allRequiredCompleted ? 'bg-primary-600' : 'bg-gray-300'
          }`}
          onPress={handleComplete}
          disabled={!allRequiredCompleted}
        >
          <Text className={`text-center text-lg font-semibold ${
            allRequiredCompleted ? 'text-white' : 'text-gray-500'
          }`}>
            {HEBREW_COPY.CHECKLIST.COMPLETE}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
