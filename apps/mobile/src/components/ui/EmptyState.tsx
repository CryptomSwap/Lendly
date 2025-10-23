import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';
import { icons, IconKey, iconConfig } from '../../constants/icons';

interface EmptyStateProps {
  icon: IconKey;
  title: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle }) => {
  const pulse = useSharedValue(1);
  React.useEffect(() => {
    const loop = () => {
      pulse.value = withTiming(1.04, { duration: 900 }, () => {
        pulse.value = withTiming(1, { duration: 900 }, loop);
      });
    };
    loop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const r = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));
  const Icon = icons[icon];

  return (
    <View style={{ alignItems: 'center', padding: 24 }}>
      <Animated.View style={[{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#ECFEFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 }, r]}>
        <Icon size={iconConfig.size} color={theme.colors.accent} strokeWidth={iconConfig.strokeWidth} />
      </Animated.View>
      <Text style={{ fontFamily: typography.families.primary, fontSize: 16, color: theme.colors.text.primary, textAlign: 'center' }}>{title}</Text>
      {subtitle && <Text style={{ marginTop: 6, fontFamily: typography.families.secondary, fontSize: 13, color: theme.colors.text.muted, textAlign: 'center' }}>{subtitle}</Text>}
    </View>
  );
};


