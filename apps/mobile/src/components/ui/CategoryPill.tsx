import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';
import { icons, IconKey, iconConfig } from '../../constants/icons';

interface CategoryPillProps {
  label: string;
  icon: IconKey;
  onPress: () => void;
  active?: boolean;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label, icon, onPress, active = false }) => {
  const scale = useSharedValue(1);
  const rStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const Icon = icons[icon];

  return (
    <Animated.View style={[{ marginHorizontal: 6 }, rStyle]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 999,
          backgroundColor: active ? '#E6FFFB' : 'rgba(255,255,255,0.7)',
          borderWidth: 1,
          borderColor: active ? theme.colors.accent : 'rgba(2,6,23,0.06)',
        }}
      >
        <Icon size={18} color={active ? theme.colors.accent : theme.colors.text.muted} strokeWidth={iconConfig.strokeWidth} />
        <Text
          style={{
            marginRight: 8,
            fontSize: 14,
            fontFamily: typography.families.primary,
            color: active ? theme.colors.accent : theme.colors.text.primary,
            textAlign: 'right',
          }}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};


