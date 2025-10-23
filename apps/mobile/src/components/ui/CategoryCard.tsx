/**
 * Lendly Category Card Component
 * Animated category card with tilt and bounce effects
 */

import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useHaptics, useCardTilt } from '../../hooks/useMotion';
import { colors, gradients, elevation } from '../../constants/theme';
import { iconMap, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CategoryCardProps {
  title: string;
  icon: keyof typeof iconMap;
  image?: string;
  onPress: () => void;
  gradient?: string[];
  disabled?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  image,
  onPress,
  gradient = gradients.primary,
  disabled = false,
}) => {
  const { triggerHaptic } = useHaptics();
  const { animatedStyle: tiltStyle, animateHover, animateRelease } = useCardTilt();
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const IconComponent = iconMap[icon];

  const handlePress = () => {
    if (disabled) return;
    
    triggerHaptic('light');
    onPress();
  };

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const opacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.5 : opacity.value,
  }));

  return (
    <AnimatedPressable
      style={[
        {
          width: 120,
          height: 140,
          borderRadius: 20,
          overflow: 'hidden',
          marginHorizontal: 8,
          marginVertical: 4,
          ...elevation.md,
        },
        scaleAnimatedStyle,
        opacityAnimatedStyle,
        tiltStyle,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      {/* Background Image or Gradient */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      ) : (
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}

      {/* Overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <IconComponent
            size={iconConfig.largeSize}
            color={colors.surface.light}
            strokeWidth={iconConfig.strokeWidth}
          />
        </View>

        {/* Title */}
        <Text
          style={{
            color: colors.surface.light,
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Rubik',
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </AnimatedPressable>
  );
};
