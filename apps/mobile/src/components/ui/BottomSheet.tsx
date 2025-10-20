/**
 * Lendly Bottom Sheet Component
 * Modal bottom sheet with spring animations and backdrop blur
 */

import React, { useEffect } from 'react';
import { Modal, Pressable, View, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useBottomSheet } from '../../hooks/useMotion';
import { colors, elevation } from '../../constants/theme';
import { spring, duration, easing } from '../../constants/motion';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | string;
  snapPoints?: number[];
  enablePanDownToClose?: boolean;
  backdropDismiss?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height = '80%',
  snapPoints = [0.3, 0.6, 0.9],
  enablePanDownToClose = true,
  backdropDismiss = true,
}) => {
  const { 
    show, 
    hide, 
    sheetAnimatedStyle, 
    backdropAnimatedStyle,
    translateY,
    opacity,
  } = useBottomSheet();

  const sheetHeight = typeof height === 'string' 
    ? screenHeight * parseFloat(height) / 100 
    : height;

  useEffect(() => {
    if (visible) {
      show();
    } else {
      hide();
    }
  }, [visible]);

  const handleBackdropPress = () => {
    if (backdropDismiss) {
      onClose();
    }
  };

  const handleSheetPress = (event: any) => {
    // Prevent backdrop press when tapping on sheet content
    event.stopPropagation();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
          },
          backdropAnimatedStyle,
        ]}
      >
        {/* Backdrop */}
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onPress={handleBackdropPress}
        >
          <BlurView
            intensity={20}
            tint="dark"
            style={{
              flex: 1,
            }}
          />
        </Pressable>

        {/* Sheet Content */}
        <Animated.View
          style={[
            {
              height: sheetHeight,
              backgroundColor: colors.surface.light,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              ...elevation.lg,
            },
            sheetAnimatedStyle,
          ]}
          onStartShouldSetResponder={handleSheetPress}
        >
          {/* Handle */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: colors.gray[300],
              borderRadius: 2,
              alignSelf: 'center',
              marginTop: 12,
              marginBottom: 8,
            }}
          />

          {/* Content */}
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
