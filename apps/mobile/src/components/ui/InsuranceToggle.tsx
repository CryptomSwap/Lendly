/**
 * Lendly Insurance Toggle Component
 * Animated toggle switch with color morphing and haptic feedback
 */

import React, { useEffect } from 'react';
import { Pressable, View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useHaptics, useToggle } from '../../hooks/useMotion';
import { colors } from '../../constants/theme';
import { iconMap, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

const ShieldIcon = iconMap.shield;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface InsuranceToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const InsuranceToggle: React.FC<InsuranceToggleProps> = ({
  value,
  onValueChange,
  label = he.addInsurance,
  disabled = false,
  showIcon = true,
  size = 'md',
}) => {
  const { triggerHaptic } = useHaptics();
  const { isOn, toggle, knobAnimatedStyle } = useToggle(value);
  
  const backgroundColor = useSharedValue(value ? 1 : 0);
  const scale = useSharedValue(1);

  const handlePress = () => {
    if (disabled) return;
    
    triggerHaptic('light');
    toggle();
    onValueChange(!value);
  };

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withTiming(1, { duration: 100 });
  };

  useEffect(() => {
    backgroundColor.value = withTiming(value ? 1 : 0, {
      duration: 200,
    });
  }, [value]);

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          width: 36,
          height: 20,
          knobSize: 16,
          fontSize: 12,
        };
      case 'lg':
        return {
          width: 56,
          height: 32,
          knobSize: 28,
          fontSize: 16,
        };
      default:
        return {
          width: 44,
          height: 24,
          knobSize: 20,
          fontSize: 14,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [colors.gray[300], colors.secondary[500]]
    ),
  }));

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const opacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.5 : 1,
  }));

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        opacityAnimatedStyle,
      ]}
    >
      {/* Label and Icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginRight: 12,
        }}
      >
        {showIcon && (
          <ShieldIcon
            size={iconConfig.defaultSize}
            color={value ? colors.secondary[500] : colors.gray[400]}
            strokeWidth={iconConfig.strokeWidth}
            style={{ marginRight: 8 }}
          />
        )}
        <Text
          style={{
            fontSize: sizeStyles.fontSize,
            fontWeight: '500',
            fontFamily: 'Rubik',
            color: value ? colors.secondary[700] : colors.text.secondary,
            textAlign: 'right',
            flex: 1,
          }}
        >
          {label}
        </Text>
      </View>

      {/* Toggle Switch */}
      <AnimatedPressable
        style={[
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
            borderRadius: sizeStyles.height / 2,
            justifyContent: 'center',
            paddingHorizontal: 2,
          },
          trackAnimatedStyle,
          scaleAnimatedStyle,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Animated.View
          style={[
            {
              width: sizeStyles.knobSize,
              height: sizeStyles.knobSize,
              borderRadius: sizeStyles.knobSize / 2,
              backgroundColor: colors.surface.light,
              ...colors.elevation.sm,
            },
            knobAnimatedStyle,
          ]}
        />
      </AnimatedPressable>
    </Animated.View>
  );
};
