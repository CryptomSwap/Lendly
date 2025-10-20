/**
 * Lendly Search Bar Component
 * Animated search bar with RTL support and expand functionality
 */

import React, { useState } from 'react';
import { TextInput, View, Pressable, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useHaptics } from '../../hooks/useMotion';
import { colors, typography } from '../../constants/theme';
import { iconMap, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

const SearchIcon = iconMap.search;
const FilterIcon = iconMap.filter;
const CloseIcon = iconMap.close;

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onFilterPress?: () => void;
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  showFilter?: boolean;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = he.placeholders.searchEquipment,
  value,
  onChangeText,
  onFocus,
  onBlur,
  onFilterPress,
  expanded = false,
  onExpand,
  onCollapse,
  showFilter = true,
  autoFocus = false,
}) => {
  const { triggerHaptic } = useHaptics();
  const [isFocused, setIsFocused] = useState(false);
  
  const width = useSharedValue(expanded ? 100 : 80);
  const opacity = useSharedValue(expanded ? 1 : 0.7);

  const handleFocus = () => {
    setIsFocused(true);
    if (!expanded && onExpand) {
      triggerHaptic('light');
      onExpand();
    }
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (expanded && onCollapse && !value) {
      onCollapse();
    }
    onBlur?.();
  };

  const handleClear = () => {
    onChangeText('');
    triggerHaptic('light');
  };

  const handleFilterPress = () => {
    triggerHaptic('medium');
    onFilterPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    opacity: opacity.value,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(width.value, [80, 100], [0.5, 1]),
    transform: [
      {
        scale: interpolate(width.value, [80, 100], [0.9, 1]),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface.light,
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginHorizontal: 20,
          marginVertical: 8,
          ...colors.elevation.sm,
        },
        animatedStyle,
      ]}
    >
      {/* Search Icon */}
      <Animated.View style={iconAnimatedStyle}>
        <SearchIcon
          size={iconConfig.defaultSize}
          color={isFocused ? colors.primary[500] : colors.gray[400]}
          strokeWidth={iconConfig.strokeWidth}
        />
      </Animated.View>

      {/* Text Input */}
      <TextInput
        style={{
          flex: 1,
          fontSize: typography.body.fontSize,
          fontFamily: 'Rubik',
          color: colors.text.primary,
          marginHorizontal: 12,
          textAlign: 'right', // RTL support
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[400]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        returnKeyType="search"
        textAlign="right"
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={{
            padding: 4,
            marginRight: 8,
          }}
        >
          <CloseIcon
            size={16}
            color={colors.gray[400]}
            strokeWidth={iconConfig.strokeWidth}
          />
        </Pressable>
      )}

      {/* Filter Button */}
      {showFilter && (
        <Pressable
          onPress={handleFilterPress}
          style={{
            padding: 8,
            marginLeft: 8,
            backgroundColor: colors.primary[50],
            borderRadius: 16,
          }}
        >
          <FilterIcon
            size={iconConfig.defaultSize}
            color={colors.primary[500]}
            strokeWidth={iconConfig.strokeWidth}
          />
        </Pressable>
      )}
    </Animated.View>
  );
};
