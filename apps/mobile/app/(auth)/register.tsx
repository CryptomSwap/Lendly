import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { HEBREW_COPY } from '@lendly/shared';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות הנדרשים');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('שגיאה', 'שגיאה בהרשמה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-900 text-right mb-2">
          הרשמה ל-Lendly
        </Text>
        <Text className="text-lg text-gray-600 text-right">
          צור חשבון חדש
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 text-right mb-2">
            {HEBREW_COPY.FORMS.NAME}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-right"
            placeholder={HEBREW_COPY.FORMS.NAME}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            textAlign="right"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 text-right mb-2">
            {HEBREW_COPY.FORMS.EMAIL}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-right"
            placeholder={HEBREW_COPY.FORMS.EMAIL}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            textAlign="right"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 text-right mb-2">
            {HEBREW_COPY.FORMS.PHONE}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-right"
            placeholder={HEBREW_COPY.FORMS.PHONE}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            textAlign="right"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 text-right mb-2">
            {HEBREW_COPY.FORMS.PASSWORD}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-right"
            placeholder={HEBREW_COPY.FORMS.PASSWORD}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            textAlign="right"
          />
        </View>

        <TouchableOpacity
          className="bg-primary-600 rounded-lg py-4 mt-6"
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading ? 'נרשם...' : HEBREW_COPY.FORMS.REGISTER}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push('/(auth)/login')}
        >
          <Text className="text-primary-600 text-center text-base">
            יש לך חשבון? התחבר כאן
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
