/**
 * Lendly Motion Playground
 * Interactive screen to test and preview all motion tokens and animations
 */

import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useFadeSlideUp, useScalePop, useCountUp, useHaptics } from '../hooks/useMotion';
import { colors, gradients, elevation } from '../constants/theme';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { BottomSheet } from '../components/ui/BottomSheet';
import { SearchBar } from '../components/ui/SearchBar';
import { CategoryCard } from '../components/ui/CategoryCard';
import { ListingCard } from '../components/ui/ListingCard';
import { DepositWidget } from '../components/ui/DepositWidget';
import { InsuranceToggle } from '../components/ui/InsuranceToggle';
import { Skeleton, SkeletonCard, SkeletonText } from '../components/ui/Skeleton';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Toast } from '../components/ui/Toast';
import { iconMap } from '../constants/icons';
import { he } from '../i18n/he';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PlaygroundScreen: React.FC = () => {
  const { triggerHaptic } = useHaptics();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [searchValue, setSearchValue] = useState('');
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [progress, setProgress] = useState(0.3);

  const { animatedStyle: fadeSlideStyle } = useFadeSlideUp(0);
  const { animatedStyle: scalePopStyle, animateIn } = useScalePop();
  const { animatedValue: countValue } = useCountUp(1234);

  const handleButtonPress = () => {
    triggerHaptic('success');
    setShowToast(true);
    setToastType('success');
  };

  const handleErrorPress = () => {
    triggerHaptic('error');
    setShowToast(true);
    setToastType('error');
  };

  const handleWarningPress = () => {
    triggerHaptic('warning');
    setShowToast(true);
    setToastType('warning');
  };

  const handleInfoPress = () => {
    triggerHaptic('light');
    setShowToast(true);
    setToastType('info');
  };

  const handleProgressChange = () => {
    setProgress(prev => prev >= 1 ? 0 : prev + 0.2);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface.light }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[
            {
              padding: 20,
              backgroundColor: colors.surface.light,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray[200],
            },
            fadeSlideStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            {he.appName} Motion Playground
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.text.secondary,
              fontFamily: 'Rubik',
              textAlign: 'center',
            }}
          >
            Test all animations and motion tokens
          </Text>
        </Animated.View>

        {/* Motion Tokens Section */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              marginBottom: 16,
              textAlign: 'right',
            }}
          >
            Motion Tokens
          </Text>

          {/* Fade Slide Up */}
          <Animated.View
            style={[
              {
                backgroundColor: colors.primary[50],
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                ...elevation.sm,
              },
              fadeSlideStyle,
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.primary[700],
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              Fade Slide Up
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                fontFamily: 'Rubik',
                textAlign: 'right',
              }}
            >
              opacity: 0→1, translateY: 16→0
            </Text>
          </Animated.View>

          {/* Scale Pop */}
          <AnimatedPressable
            style={[
              {
                backgroundColor: colors.secondary[50],
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                ...elevation.sm,
              },
              scalePopStyle,
            ]}
            onPress={() => {
              animateIn();
              triggerHaptic('light');
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.secondary[700],
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              Scale Pop (Tap me!)
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                fontFamily: 'Rubik',
                textAlign: 'right',
              }}
            >
              scale: 0.96→1 with spring overshoot
            </Text>
          </AnimatedPressable>

          {/* Count Up */}
          <View
            style={{
              backgroundColor: colors.cyan[50],
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              ...elevation.sm,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.cyan[700],
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              Count Up Animation
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                fontFamily: 'Rubik',
                color: colors.cyan[500],
                textAlign: 'center',
              }}
            >
              {he.currency}{countValue.value.toFixed(0)}
            </Text>
          </View>
        </View>

        {/* UI Components Section */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              marginBottom: 16,
              textAlign: 'right',
            }}
          >
            UI Components
          </Text>

          {/* Animated Buttons */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Animated Buttons
            </Text>
            <View style={{ gap: 12 }}>
              <AnimatedButton
                title="Primary Button"
                onPress={handleButtonPress}
                variant="primary"
                fullWidth
              />
              <AnimatedButton
                title="Secondary Button"
                onPress={handleErrorPress}
                variant="secondary"
                fullWidth
              />
              <AnimatedButton
                title="Outline Button"
                onPress={handleWarningPress}
                variant="outline"
                fullWidth
              />
              <AnimatedButton
                title="Ghost Button"
                onPress={handleInfoPress}
                variant="ghost"
                fullWidth
              />
            </View>
          </View>

          {/* Search Bar */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Search Bar
            </Text>
            <SearchBar
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="חפש ציוד..."
            />
          </View>

          {/* Category Cards */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Category Cards
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              <CategoryCard
                title="מצלמות"
                icon="camera"
                onPress={() => triggerHaptic('light')}
              />
              <CategoryCard
                title="רחפנים"
                icon="drone"
                onPress={() => triggerHaptic('light')}
              />
              <CategoryCard
                title="כלי עבודה"
                icon="wrench"
                onPress={() => triggerHaptic('light')}
              />
            </ScrollView>
          </View>

          {/* Listing Card */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Listing Card
            </Text>
            <ListingCard
              id="1"
              title="מצלמת DSLR מקצועית"
              price={150}
              rating={4.8}
              distance={2.5}
              image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
              category="מצלמות"
              verified
              insured
              onPress={(id) => triggerHaptic('medium')}
              onLike={(id) => triggerHaptic('light')}
              onShare={(id) => triggerHaptic('light')}
            />
          </View>

          {/* Deposit Widget */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Deposit Widget
            </Text>
            <DepositWidget
              baseDeposit={500}
              insuranceDeposit={100}
              totalDeposit={insuranceEnabled ? 600 : 500}
              hasInsurance={insuranceEnabled}
              onInsuranceToggle={() => setInsuranceEnabled(!insuranceEnabled)}
            />
          </View>

          {/* Insurance Toggle */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Insurance Toggle
            </Text>
            <View style={{ paddingHorizontal: 20 }}>
              <InsuranceToggle
                value={insuranceEnabled}
                onValueChange={setInsuranceEnabled}
              />
            </View>
          </View>

          {/* Progress Ring */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Progress Ring
            </Text>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <ProgressRing
                progress={progress}
                size={120}
                showPercentage
              />
              <Pressable
                onPress={handleProgressChange}
                style={{
                  marginTop: 16,
                  backgroundColor: colors.primary[500],
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.surface.light,
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Rubik',
                  }}
                >
                  Change Progress
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Skeletons */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Skeleton Loading
            </Text>
            <View style={{ paddingHorizontal: 20 }}>
              <SkeletonCard />
            </View>
          </View>

          {/* Bottom Sheet Trigger */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: 'right',
              }}
            >
              Bottom Sheet
            </Text>
            <AnimatedButton
              title="Open Bottom Sheet"
              onPress={() => setShowBottomSheet(true)}
              variant="outline"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        height="60%"
      >
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              marginBottom: 16,
              textAlign: 'right',
            }}
          >
            Bottom Sheet Content
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.text.secondary,
              fontFamily: 'Rubik',
              textAlign: 'right',
              marginBottom: 20,
            }}
          >
            This is a sample bottom sheet with spring animations and backdrop blur.
          </Text>
          <AnimatedButton
            title="Close Sheet"
            onPress={() => setShowBottomSheet(false)}
            variant="primary"
            fullWidth
          />
        </View>
      </BottomSheet>

      {/* Toast */}
      <Toast
        visible={showToast}
        message={toastType === 'success' ? 'הפעולה הושלמה בהצלחה!' : 
                toastType === 'error' ? 'אירעה שגיאה' :
                toastType === 'warning' ? 'אזהרה' : 'מידע'}
        type={toastType}
        onHide={() => setShowToast(false)}
        duration={2000}
      />
    </View>
  );
};
