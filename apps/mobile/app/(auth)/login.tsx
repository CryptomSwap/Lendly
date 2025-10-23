import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { HEBREW_COPY } from '@lendly/shared';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('שגיאה', 'שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-900 text-right mb-2">
          {HEBREW_COPY.HERO_TITLE}
        </Text>
        <Text className="text-lg text-gray-600 text-right">
          התחבר לחשבון שלך
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 text-right mb-2">
            {HEBREW_COPY.FORMS.EMAIL}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-right"
            placeholder={HEBREW_COPY.FORMS.EMAIL}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textAlign="right"
          />
        </View>

        <TouchableOpacity
          className="bg-primary-600 rounded-lg py-4 mt-6"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading ? 'מתחבר...' : HEBREW_COPY.FORMS.LOGIN}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push('/(auth)/register')}
        >
          <Text className="text-primary-600 text-center text-base">
            אין לך חשבון? הרשם כאן
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
