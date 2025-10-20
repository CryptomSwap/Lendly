/**
 * Lendly Progress Ring Component
 * Animated circular progress indicator
 */

import React from 'react';
import { View, Text } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useProgressRing } from '../../hooks/useMotion';
import { colors } from '../../constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = colors.primary[500],
  backgroundColor = colors.gray[200],
  showPercentage = false,
  children,
}) => {
  const { animatedStyle } = useProgressRing(progress);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    strokeDasharray: `${progress * circumference} ${circumference}`,
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={circleAnimatedStyle}
        />
      </Svg>

      {/* Center Content */}
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children || (
          showPercentage && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
              }}
            >
              {Math.round(progress * 100)}%
            </Text>
          )
        )}
      </View>
    </View>
  );
};
