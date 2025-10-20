/**
 * Lendly Deposit Widget Component
 * Animated deposit calculator with count-up animation
 */

import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useCountUp, useHaptics } from '../../hooks/useMotion';
import { colors, gradients } from '../../constants/theme';
import { iconMap, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

const WalletIcon = iconMap.wallet;
const ShieldIcon = iconMap.shield;

interface DepositWidgetProps {
  baseDeposit: number;
  insuranceDeposit?: number;
  totalDeposit: number;
  hasInsurance?: boolean;
  onInsuranceToggle?: () => void;
  animated?: boolean;
}

export const DepositWidget: React.FC<DepositWidgetProps> = ({
  baseDeposit,
  insuranceDeposit = 0,
  totalDeposit,
  hasInsurance = false,
  onInsuranceToggle,
  animated = true,
}) => {
  const { triggerHaptic } = useHaptics();
  const { animatedValue: animatedTotal } = useCountUp(totalDeposit);
  
  const glowOpacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (animated) {
      // Trigger glow animation when deposit changes
      glowOpacity.value = withTiming(0.3, { duration: 200 }, () => {
        glowOpacity.value = withTiming(0, { duration: 800 });
      });
      
      // Trigger scale animation
      scale.value = withTiming(1.05, { duration: 200 }, () => {
        scale.value = withTiming(1, { duration: 200 });
      });
    }
  }, [totalDeposit, animated]);

  const handleInsuranceToggle = () => {
    if (onInsuranceToggle) {
      triggerHaptic('medium');
      onInsuranceToggle();
    }
  };

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const formatCurrency = (amount: number) => {
    return `${he.currency}${amount.toLocaleString()}`;
  };

  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.surface.light,
          borderRadius: 20,
          padding: 20,
          margin: 16,
          ...colors.elevation.md,
        },
        scaleAnimatedStyle,
      ]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <WalletIcon
          size={iconConfig.largeSize}
          color={colors.primary[500]}
          strokeWidth={iconConfig.strokeWidth}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Rubik',
            color: colors.text.primary,
            marginRight: 12,
            textAlign: 'right',
          }}
        >
          {he.estimatedDeposit}
        </Text>
      </View>

      {/* Deposit Breakdown */}
      <View
        style={{
          marginBottom: 16,
        }}
      >
        {/* Base Deposit */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.text.secondary,
              fontFamily: 'Rubik',
              textAlign: 'right',
            }}
          >
            {he.deposit}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Rubik',
              color: colors.text.primary,
            }}
          >
            {formatCurrency(baseDeposit)}
          </Text>
        </View>

        {/* Insurance Deposit */}
        {hasInsurance && insuranceDeposit > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                fontFamily: 'Rubik',
                textAlign: 'right',
              }}
            >
              {he.insurance}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                fontFamily: 'Rubik',
                color: colors.secondary[500],
              }}
            >
              {formatCurrency(insuranceDeposit)}
            </Text>
          </View>
        )}
      </View>

      {/* Total Deposit */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          paddingTop: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              textAlign: 'right',
            }}
          >
            {he.totalPrice}
          </Text>
          <Animated.Text
            style={[
              {
                fontSize: 24,
                fontWeight: '700',
                fontFamily: 'Rubik',
                color: colors.primary[500],
              },
              glowAnimatedStyle,
            ]}
          >
            {formatCurrency(totalDeposit)}
          </Animated.Text>
        </View>
      </View>

      {/* Insurance Toggle */}
      {onInsuranceToggle && (
        <Pressable
          onPress={handleInsuranceToggle}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: hasInsurance ? colors.secondary[50] : colors.gray[50],
            borderRadius: 12,
            padding: 12,
            borderWidth: 1,
            borderColor: hasInsurance ? colors.secondary[200] : colors.gray[200],
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ShieldIcon
              size={iconConfig.defaultSize}
              color={hasInsurance ? colors.secondary[500] : colors.gray[400]}
              strokeWidth={iconConfig.strokeWidth}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Rubik',
                color: hasInsurance ? colors.secondary[700] : colors.text.secondary,
                marginRight: 8,
                textAlign: 'right',
              }}
            >
              {he.addInsurance}
            </Text>
          </View>

          {/* Toggle Switch */}
          <View
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              backgroundColor: hasInsurance ? colors.secondary[500] : colors.gray[300],
              justifyContent: 'center',
              paddingHorizontal: 2,
            }}
          >
            <Animated.View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.surface.light,
                transform: [{ translateX: hasInsurance ? 20 : 0 }],
              }}
            />
          </View>
        </Pressable>
      )}
    </Animated.View>
  );
};
