/**
 * Lendly Toast Component
 * Animated toast notifications with success/error styles
 */

import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useHaptics } from '../../hooks/useMotion';
import { colors, gradients } from '../../constants/theme';
import { iconMap, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CheckIcon = iconMap.checkCircle;
const AlertIcon = iconMap.alertCircle;
const InfoIcon = iconMap.info;
const CloseIcon = iconMap.close;

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide: () => void;
  onPress?: () => void;
  actionText?: string;
  onActionPress?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
  duration = 3000,
  onHide,
  onPress,
  actionText,
  onActionPress,
}) => {
  const { triggerHaptic } = useHaptics();
  
  const translateX = useSharedValue(100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      // Show animation
      translateX.value = withSpring(0, { damping: 15, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      
      // Trigger haptic feedback
      triggerHaptic(type === 'success' ? 'success' : type === 'error' ? 'error' : 'light');
      
      // Auto hide
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [visible]);

  const hideToast = () => {
    translateX.value = withTiming(100, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 }, () => {
      runOnJS(onHide)();
    });
  };

  const handlePress = () => {
    if (onPress) {
      triggerHaptic('light');
      onPress();
    }
  };

  const handleActionPress = () => {
    if (onActionPress) {
      triggerHaptic('light');
      onActionPress();
    }
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckIcon,
          color: colors.semantic.success,
          gradient: gradients.success,
          backgroundColor: colors.semantic.success + '10',
        };
      case 'error':
        return {
          icon: AlertIcon,
          color: colors.semantic.danger,
          gradient: [colors.semantic.danger, colors.semantic.danger],
          backgroundColor: colors.semantic.danger + '10',
        };
      case 'warning':
        return {
          icon: AlertIcon,
          color: colors.semantic.warning,
          gradient: [colors.semantic.warning, colors.semantic.warning],
          backgroundColor: colors.semantic.warning + '10',
        };
      case 'info':
        return {
          icon: InfoIcon,
          color: colors.semantic.info,
          gradient: [colors.semantic.info, colors.semantic.info],
          backgroundColor: colors.semantic.info + '10',
        };
      default:
        return {
          icon: CheckIcon,
          color: colors.semantic.success,
          gradient: gradients.success,
          backgroundColor: colors.semantic.success + '10',
        };
    }
  };

  const typeConfig = getTypeConfig();
  const IconComponent = typeConfig.icon;

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }, { scale: scale.value }], opacity: opacity.value }));

  if (!visible) return null;

  return (
    <AnimatedPressable
      style={[
        {
          position: 'absolute',
          top: 60,
          left: 20,
          right: 20,
          borderRadius: 16,
          overflow: 'hidden',
          ...colors.elevation.lg,
        },
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      <LinearGradient
        colors={typeConfig.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <IconComponent
            size={iconConfig.defaultSize}
            color={colors.surface.light}
            strokeWidth={iconConfig.strokeWidth}
          />
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Rubik',
              color: colors.surface.light,
              textAlign: 'right',
              marginBottom: actionText ? 4 : 0,
            }}
          >
            {message}
          </Text>
          
          {/* Action Button */}
          {actionText && onActionPress && (
            <Pressable
              onPress={handleActionPress}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Rubik',
                  color: colors.surface.light,
                }}
              >
                {actionText}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Close Button */}
        <Pressable
          onPress={hideToast}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
          }}
        >
          <CloseIcon
            size={14}
            color={colors.surface.light}
            strokeWidth={iconConfig.strokeWidth}
          />
        </Pressable>
      </LinearGradient>
    </AnimatedPressable>
  );
};
