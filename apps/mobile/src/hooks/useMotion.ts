/**
 * Lendly Motion Hooks & Utilities
 * Reusable animation hooks and helpers
 */

import { useEffect, useRef } from 'react';
import { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { animations, spring, duration, easing } from '../constants/motion';

// Haptics hook
export const useHaptics = () => {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
    }
  };

  return { triggerHaptic };
};

// Fade slide up animation hook
export const useFadeSlideUp = (delay = 0, durationOverride?: number) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: durationOverride || animations.fadeSlideUp.duration,
        easing: animations.fadeSlideUp.easing,
      });
      translateY.value = withTiming(0, {
        duration: durationOverride || animations.fadeSlideUp.duration,
        easing: animations.fadeSlideUp.easing,
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, durationOverride]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle, opacity, translateY };
};

// Scale pop animation hook
export const useScalePop = (springConfig = spring.default) => {
  const scale = useSharedValue(1);

  const animateIn = () => {
    scale.value = withSpring(1.05, springConfig, () => {
      scale.value = withSpring(1, springConfig);
    });
  };

  const animateOut = () => {
    scale.value = withSpring(0.96, springConfig);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, animateIn, animateOut, scale };
};

// Count up animation hook
export const useCountUp = (targetValue: number, durationOverride?: number) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(targetValue, {
      duration: durationOverride || animations.countUp.duration,
      easing: animations.countUp.easing,
    });
  }, [targetValue, durationOverride]);

  const animatedStyle = useAnimatedStyle(() => ({
    // This would be used with a custom component that displays the animated number
  }));

  return { animatedValue, animatedStyle };
};

// Parallax header animation hook
export const useParallaxHeader = (scrollY: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      animations.parallaxHeader.range,
      'clamp'
    );

    return {
      transform: [{ translateY }],
    };
  });

  return { animatedStyle };
};

// Shimmer animation hook
export const useShimmer = () => {
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withTiming(1, {
      duration: animations.shimmer.duration,
      easing: animations.shimmer.easing,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerValue.value, [0, 1], [-100, 100]);
    
    return {
      transform: [{ translateX }],
    };
  });

  return { animatedStyle, shimmerValue };
};

// Bottom sheet animation hook
export const useBottomSheet = () => {
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  const show = () => {
    translateY.value = withSpring(0, spring.default);
    opacity.value = withTiming(1, {
      duration: duration.fast,
      easing: easing.out,
    });
  };

  const hide = () => {
    translateY.value = withSpring(1000, spring.default);
    opacity.value = withTiming(0, {
      duration: duration.fast,
      easing: easing.out,
    });
  };

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { 
    show, 
    hide, 
    sheetAnimatedStyle, 
    backdropAnimatedStyle,
    translateY,
    opacity,
  };
};

// Press glow animation hook
export const usePressGlow = () => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0);

  const animatePress = () => {
    scale.value = withTiming(1.02, {
      duration: animations.pressGlow.duration,
      easing: animations.pressGlow.easing,
    });
    shadowOpacity.value = withTiming(0.3, {
      duration: animations.pressGlow.duration,
      easing: animations.pressGlow.easing,
    });
  };

  const animateRelease = () => {
    scale.value = withTiming(1, {
      duration: animations.pressGlow.duration,
      easing: animations.pressGlow.easing,
    });
    shadowOpacity.value = withTiming(0, {
      duration: animations.pressGlow.duration,
      easing: animations.pressGlow.easing,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }));

  return { animatedStyle, animatePress, animateRelease };
};

// Toggle animation hook
export const useToggle = (initialValue = false) => {
  const isOn = useSharedValue(initialValue);
  const knobTranslateX = useSharedValue(initialValue ? 20 : 0);

  const toggle = () => {
    isOn.value = !isOn.value;
    knobTranslateX.value = withTiming(isOn.value ? 20 : 0, {
      duration: animations.toggleMorph.duration,
      easing: animations.toggleMorph.easing,
    });
  };

  const knobAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobTranslateX.value }],
  }));

  return { 
    isOn, 
    toggle, 
    knobAnimatedStyle,
    knobTranslateX,
  };
};

// Card tilt animation hook
export const useCardTilt = () => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const translateZ = useSharedValue(0);

  const animateHover = (gesture: any) => {
    rotateX.value = withTiming(gesture.translationY * 0.1, {
      duration: animations.cardTilt.duration,
      easing: animations.cardTilt.easing,
    });
    rotateY.value = withTiming(-gesture.translationX * 0.1, {
      duration: animations.cardTilt.duration,
      easing: animations.cardTilt.easing,
    });
    translateZ.value = withTiming(4, {
      duration: animations.cardTilt.duration,
      easing: animations.cardTilt.easing,
    });
  };

  const animateRelease = () => {
    rotateX.value = withTiming(0, {
      duration: animations.cardTilt.duration,
      easing: animations.cardTilt.easing,
    });
    rotateY.value = withTiming(0, {
      duration: animations.cardTilt.duration,
      easing: animations.cardTilt.easing,
    });
    translateZ.value = withTiming(0, {
      duration: animations.cardTilt.duration,
      easing: animations.cardTilt.easing,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { translateZ: translateZ.value },
    ],
  }));

  return { animatedStyle, animateHover, animateRelease };
};

// Progress ring animation hook
export const useProgressRing = (progress: number) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: animations.progressRing.duration,
      easing: animations.progressRing.easing,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    strokeDasharray: `${animatedProgress.value * 100} 100`,
  }));

  return { animatedStyle, animatedProgress };
};

// RTL support hook
export const useRTL = () => {
  const isRTL = true; // Force RTL for Hebrew

  const rtlStyle = (style: any) => {
    if (!isRTL) return style;
    
    return {
      ...style,
      transform: style.transform?.map((t: any) => {
        if (t.translateX) {
          return { ...t, translateX: -t.translateX };
        }
        return t;
      }),
    };
  };

  return { isRTL, rtlStyle };
};

// Reduced motion detection hook
export const useReducedMotion = () => {
  const isReducedMotion = false; // TODO: Implement actual reduced motion detection

  const getDuration = (baseDuration: number) => {
    return isReducedMotion ? baseDuration * 0.6 : baseDuration;
  };

  const getEasing = (baseEasing: any) => {
    return isReducedMotion ? Easing.linear : baseEasing;
  };

  return { isReducedMotion, getDuration, getEasing };
};
