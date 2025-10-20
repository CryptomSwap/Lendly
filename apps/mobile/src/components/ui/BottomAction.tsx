import React from 'react';
import { View, Pressable, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';

interface BottomActionProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const BottomAction: React.FC<BottomActionProps> = ({ label, onPress, disabled }) => {
  const scale = useSharedValue(1);
  const r = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={{ padding: 16 }}>
      <Animated.View style={[{ borderRadius: 999, overflow: 'hidden' }, r]}>
        <Pressable
          disabled={disabled}
          onPressIn={() => (scale.value = withSpring(0.98, { damping: 16, stiffness: 240 }))}
          onPressOut={() => (scale.value = withSpring(1, { damping: 16, stiffness: 240 }))}
          onPress={onPress}
        >
          <LinearGradient
            colors={theme.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ height: 52, borderRadius: 999, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: '#fff', fontFamily: typography.families.primary, fontSize: 16, fontWeight: '700' }}>{label}</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
};


