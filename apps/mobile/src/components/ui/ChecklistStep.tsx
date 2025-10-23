import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';
import { icons, iconConfig } from '../../constants/icons';

interface ChecklistStepProps {
  label: string;
  uri?: string;
  completed?: boolean;
  onPress: () => void;
}

export const ChecklistStep: React.FC<ChecklistStepProps> = ({ label, uri, completed, onPress }) => {
  const opacity = useSharedValue(completed ? 1 : 0.6);
  React.useEffect(() => { opacity.value = withTiming(completed ? 1 : 0.6, { duration: 200 }); }, [completed]);
  const r = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const Check = icons.check;

  return (
    <Pressable onPress={onPress} style={{ width: '48%', marginBottom: 12 }}>
      <Animated.View style={[{ borderRadius: 16, overflow: 'hidden', backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: 'rgba(2,6,23,0.06)' }, r]}>
        {uri ? (
          <Image source={{ uri }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
        ) : (
          <View style={{ width: '100%', height: 120, backgroundColor: theme.colors.surfaceElev }} />
        )}
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          {completed && (
            <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#E7FBEA', justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
              <Check size={14} color={theme.colors.success} strokeWidth={iconConfig.strokeWidth} />
            </View>
          )}
          <Text style={{ flex: 1, fontFamily: typography.families.primary, color: theme.colors.text.primary, textAlign: 'right' }}>{label}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};


