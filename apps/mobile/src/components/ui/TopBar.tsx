import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle, right, left }) => {
  return (
    <BlurView
      intensity={20}
      tint="light"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        zIndex: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 24,
          paddingHorizontal: 20,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {right}
          <View style={{ flex: 1 }} />
          {left}
        </View>
        {title && (
          <Animated.Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              fontFamily: typography.families.primary,
              color: theme.colors.text.primary,
              textAlign: 'center',
            }}
          >
            {title}
          </Animated.Text>
        )}
        {subtitle && (
          <Animated.Text
            style={{
              fontSize: 13,
              fontFamily: typography.families.primary,
              color: theme.colors.text.muted,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            {subtitle}
          </Animated.Text>
        )}
      </View>
    </BlurView>
  );
};


