/**
 * Lendly Animated Button Component
 * Primary button with gradient fill and scale animations
 */

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useHaptics, useScalePop, usePressGlow } from '../hooks/useMotion';
import { colors, gradients, spring, duration, easing } from '../constants/theme';
import { he } from '../i18n/he';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  hapticFeedback?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  hapticFeedback = true,
}) => {
  const { triggerHaptic } = useHaptics();
  const { animatedStyle: scaleStyle, animateIn, animateOut } = useScalePop();
  const { animatedStyle: glowStyle, animatePress, animateRelease } = usePressGlow();
  
  const gradientProgress = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handlePress = () => {
    if (disabled || loading) return;
    
    if (hapticFeedback) {
      triggerHaptic('light');
    }
    
    // Animate gradient fill
    gradientProgress.value = withTiming(1, {
      duration: duration.base,
      easing: easing.out,
    });
    
    onPress();
  };

  const handlePressIn = () => {
    if (disabled || loading) return;
    animateIn();
    animatePress();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    animateOut();
    animateRelease();
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.5 : opacity.value,
  }));

  const gradientAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolateColor(
      gradientProgress.value,
      [0, 1],
      [-100, 0]
    );
    
    return {
      transform: [{ translateX }],
    };
  });

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: 40,
          paddingHorizontal: 16,
          fontSize: 14,
        };
      case 'lg':
        return {
          height: 56,
          paddingHorizontal: 32,
          fontSize: 18,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: 24,
          fontSize: 16,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.secondary[500],
          textColor: colors.surface.light,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary[500],
          textColor: colors.primary[500],
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          textColor: colors.primary[500],
        };
      default:
        return {
          backgroundColor: colors.primary[500],
          textColor: colors.surface.light,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  if (variant === 'primary') {
    return (
      <AnimatedPressable
        style={[
          {
            height: sizeStyles.height,
            borderRadius: 24,
            overflow: 'hidden',
            width: fullWidth ? '100%' : 'auto',
          },
          buttonAnimatedStyle,
          scaleStyle,
          glowStyle,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
      >
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: sizeStyles.paddingHorizontal,
          }}
        >
          {icon && (
            <View style={{ marginRight: 8 }}>
              {icon}
            </View>
          )}
          <Text
            style={{
              color: variantStyles.textColor,
              fontSize: sizeStyles.fontSize,
              fontWeight: '600',
              fontFamily: 'Rubik',
              textAlign: 'center',
            }}
          >
            {loading ? he.loading : title}
          </Text>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[
        {
          height: sizeStyles.height,
          borderRadius: 24,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth ? '100%' : 'auto',
          ...variantStyles,
        },
        buttonAnimatedStyle,
        scaleStyle,
        glowStyle,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
    >
      {icon && (
        <View style={{ marginRight: 8 }}>
          {icon}
        </View>
      )}
      <Text
        style={{
          color: variantStyles.textColor,
          fontSize: sizeStyles.fontSize,
          fontWeight: '600',
          fontFamily: 'Rubik',
          textAlign: 'center',
        }}
      >
        {loading ? he.loading : title}
      </Text>
    </AnimatedPressable>
  );
};
