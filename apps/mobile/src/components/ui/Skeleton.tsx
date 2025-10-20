/**
 * Lendly Skeleton Component
 * Shimmer loading placeholder with gradient sweep animation
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useShimmer } from '../../hooks/useMotion';
import { colors } from '../../constants/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
  children,
}) => {
  const { animatedStyle: shimmerStyle } = useShimmer();
  
  const shimmerOpacity = useSharedValue(0);

  useEffect(() => {
    shimmerOpacity.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      true
    );
  }, []);

  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmerOpacity.value, [0, 0.5, 1], [0.3, 0.7, 0.3]),
  }));

  if (children) {
    return (
      <View style={[{ width, height, borderRadius, overflow: 'hidden' }, style]}>
        {children}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            shimmerAnimatedStyle,
          ]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              transform: [{ rotate: '12deg' }],
            }}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.gray[200],
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          shimmerStyle,
          shimmerAnimatedStyle,
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            transform: [{ rotate: '12deg' }],
          }}
        />
      </Animated.View>
    </View>
  );
};

// Predefined skeleton components
export const SkeletonText: React.FC<{ lines?: number; width?: string }> = ({ 
  lines = 1, 
  width = '100%' 
}) => (
  <View style={{ gap: 8 }}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height={16}
        width={index === lines - 1 ? '80%' : width}
        borderRadius={4}
      />
    ))}
  </View>
);

export const SkeletonCard: React.FC = () => (
  <View style={{ padding: 16 }}>
    <Skeleton height={180} borderRadius={20} style={{ marginBottom: 16 }} />
    <SkeletonText lines={3} />
  </View>
);

export const SkeletonAvatar: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Skeleton width={size} height={size} borderRadius={size / 2} />
);

export const SkeletonButton: React.FC<{ width?: number }> = ({ width = 120 }) => (
  <Skeleton height={48} width={width} borderRadius={24} />
);
