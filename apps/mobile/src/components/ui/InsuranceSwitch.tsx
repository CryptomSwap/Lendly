import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';
import { icons, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

interface InsuranceSwitchProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
}

export const InsuranceSwitch: React.FC<InsuranceSwitchProps> = ({ value, onValueChange }) => {
  const x = useSharedValue(value ? 20 : 0);
  const rKnob = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  React.useEffect(() => { x.value = withTiming(value ? 20 : 0, { duration: 180 }); }, [value]);

  const Shield = icons.shield;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Shield size={iconConfig.size} color={value ? theme.colors.accentAlt : theme.colors.text.muted} strokeWidth={iconConfig.strokeWidth} />
        <Text style={{ marginRight: 8, fontFamily: typography.families.primary, color: theme.colors.text.primary, fontSize: 15, textAlign: 'right' }}>{he.item.addInsurance}</Text>
      </View>
      <Pressable
        onPress={() => onValueChange(!value)}
        style={{ width: 44, height: 24, borderRadius: 12, padding: 2, backgroundColor: value ? theme.colors.accentAlt : theme.colors.muted }}
      >
        <Animated.View style={[{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' }, rKnob]} />
      </Pressable>
    </View>
  );
};


