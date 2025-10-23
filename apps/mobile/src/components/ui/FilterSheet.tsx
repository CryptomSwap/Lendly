import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { typography } from '../../constants/typography';
import { he } from '../../i18n/he';

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({ visible, onClose, onApply, onReset, children }) => {
  const y = useSharedValue(600);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      y.value = withSpring(0, { damping: 26, stiffness: 240 });
      opacity.value = withTiming(0.5, { duration: 200 });
    } else {
      y.value = withSpring(600, { damping: 26, stiffness: 240 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const rSheet = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));
  const rBackdrop = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="none" statusBarTranslucent>
      <Animated.View style={[{ position: 'absolute', inset: 0, backgroundColor: '#000' }, rBackdrop]} />
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: theme.radii['3xl'],
            borderTopRightRadius: theme.radii['3xl'],
            backgroundColor: theme.colors.surface,
            paddingBottom: 24,
          },
          rSheet,
        ]}
      >
        <View style={{ padding: 16 }}>
          <Text style={{
            fontSize: typography.h2.fontSize,
            lineHeight: typography.h2.lineHeight,
            fontFamily: typography.families.primary,
            fontWeight: '700',
            color: theme.colors.text.primary,
            textAlign: 'right',
          }}>{he.filters.title}</Text>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {children}
        </View>

        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 16 }}>
          <Pressable onPress={onReset} style={{
            flex: 1,
            height: 48,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: theme.colors.muted,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ fontFamily: typography.families.primary, color: theme.colors.text.primary }}>{he.filters.reset}</Text>
          </Pressable>
          <Pressable onPress={onApply} style={{
            flex: 1,
            height: 48,
            borderRadius: 999,
            backgroundColor: theme.colors.accent,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ fontFamily: typography.families.primary, color: '#fff' }}>{he.filters.apply}</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
};


