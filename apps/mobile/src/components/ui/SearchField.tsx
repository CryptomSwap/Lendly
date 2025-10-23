import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';
import { icons, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

interface SearchFieldProps {
  onPress: () => void;
  city?: string;
  datesLabel?: string;
  categoryLabel?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({ onPress, city, datesLabel, categoryLabel }) => {
  const pressed = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => ({ transform: [{ scale: withTiming(pressed.value ? 0.98 : 1, { duration: 120 }) }] }));

  const SearchIcon = icons.search;

  return (
    <Animated.View style={[{ borderRadius: theme.radii['3xl'] }, rStyle]}>
      <Pressable
        onPressIn={() => (pressed.value = 1)}
        onPressOut={() => (pressed.value = 0)}
        onPress={onPress}
        style={{
          overflow: 'hidden',
          borderRadius: theme.radii['3xl'],
          borderWidth: 1,
          borderColor: 'rgba(2,6,23,0.06)',
        }}
      >
        <BlurView intensity={18} tint="light" style={{ padding: 14, backgroundColor: theme.glass.background }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#ECFEFF',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 8,
            }}>
              <SearchIcon size={iconConfig.size} color={theme.colors.accent} strokeWidth={iconConfig.strokeWidth} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: typography.body18.fontSize,
                lineHeight: typography.body18.lineHeight,
                fontFamily: typography.families.primary,
                color: theme.colors.text.primary,
                textAlign: 'right',
              }}>
                {city || he.search.city}
              </Text>
              <Text style={{
                fontSize: typography.caption.fontSize,
                lineHeight: typography.caption.lineHeight,
                fontFamily: typography.families.secondary,
                color: theme.colors.text.muted,
                textAlign: 'right',
              }}>
                {(datesLabel || he.search.dates) + ' • ' + (categoryLabel || he.search.category)}
              </Text>
            </View>
          </View>
        </BlurView>
      </Pressable>
    </Animated.View>
  );
};


