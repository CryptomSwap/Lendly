/**
 * Lendly Listing Card Component
 * Animated listing card with parallax images and micro-interactions
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
import { colors, elevation } from '../../constants/theme';
import { iconMap, iconConfig } from '../../constants/icons';
import { he } from '../../i18n/he';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  distance: number;
  image: string;
  category: string;
  verified?: boolean;
  insured?: boolean;
  onPress: (id: string) => void;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  liked?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  price,
  rating,
  distance,
  image,
  category,
  verified = false,
  insured = false,
  onPress,
  onLike,
  onShare,
  liked = false,
}) => {
  const { triggerHaptic } = useHaptics();
  const { animatedStyle: tiltStyle, animateHover, animateRelease } = useCardTilt();
  
  const scale = useSharedValue(1);
  const imageTranslateY = useSharedValue(0);
  const likeScale = useSharedValue(1);

  const StarIcon = iconMap.star;
  const HeartIcon = iconMap.heart;
  const ShareIcon = iconMap.share;
  const VerifiedIcon = iconMap.shield;
  const LocationIcon = iconMap.mapPin;

  const handlePress = () => {
    triggerHaptic('light');
    onPress(id);
  };

  const handleLike = () => {
    if (onLike) {
      triggerHaptic('light');
      likeScale.value = withSpring(1.2, { damping: 10 }, () => {
        likeScale.value = withSpring(1, { damping: 10 });
      });
      onLike(id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      triggerHaptic('light');
      onShare(id);
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    imageTranslateY.value = withSpring(-4, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    imageTranslateY.value = withSpring(0, { damping: 15, stiffness: 300 });
  };

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imageTranslateY.value }],
  }));

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: colors.surface.light,
          borderRadius: 20,
          overflow: 'hidden',
          marginHorizontal: 8,
          marginVertical: 4,
          ...elevation.md,
        },
        scaleAnimatedStyle,
        tiltStyle,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {/* Image Container */}
      <View
        style={{
          height: 180,
          overflow: 'hidden',
        }}
      >
        <Animated.Image
          source={{ uri: image }}
          style={[
            {
              width: '100%',
              height: '100%',
            },
            imageAnimatedStyle,
          ]}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
          }}
        />

        {/* Action Buttons */}
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {/* Like Button */}
          {onLike && (
            <Pressable
              onPress={handleLike}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Animated.View style={likeAnimatedStyle}>
                <HeartIcon
                  size={16}
                  color={liked ? colors.semantic.danger : colors.gray[400]}
                  fill={liked ? colors.semantic.danger : 'transparent'}
                  strokeWidth={iconConfig.strokeWidth}
                />
              </Animated.View>
            </Pressable>
          )}

          {/* Share Button */}
          {onShare && (
            <Pressable
              onPress={handleShare}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ShareIcon
                size={16}
                color={colors.gray[600]}
                strokeWidth={iconConfig.strokeWidth}
              />
            </Pressable>
          )}
        </View>

        {/* Verified Badge */}
        {verified && (
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: colors.semantic.success,
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <VerifiedIcon
              size={12}
              color={colors.surface.light}
              strokeWidth={iconConfig.strokeWidth}
            />
            <Text
              style={{
                color: colors.surface.light,
                fontSize: 10,
                fontWeight: '600',
                fontFamily: 'Rubik',
                marginLeft: 4,
              }}
            >
              {he.verifiedBadge}
            </Text>
          </View>
        )}

        {/* Insured Badge */}
        {insured && (
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              backgroundColor: colors.secondary[500],
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                color: colors.surface.light,
                fontSize: 10,
                fontWeight: '600',
                fontFamily: 'Rubik',
              }}
            >
              {he.insured}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View
        style={{
          padding: 16,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            fontFamily: 'Rubik',
            color: colors.text.primary,
            marginBottom: 8,
            textAlign: 'right',
          }}
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Category */}
        <Text
          style={{
            fontSize: 12,
            color: colors.text.secondary,
            fontFamily: 'Rubik',
            marginBottom: 8,
            textAlign: 'right',
          }}
        >
          {category}
        </Text>

        {/* Bottom Row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Price */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.primary[500],
            }}
          >
            {he.currency}{price}
          </Text>

          {/* Rating & Distance */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Rating */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <StarIcon
                size={14}
                color={colors.semantic.warning}
                fill={colors.semantic.warning}
                strokeWidth={iconConfig.strokeWidth}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text.secondary,
                  fontFamily: 'Rubik',
                }}
              >
                {rating.toFixed(1)}
              </Text>
            </View>

            {/* Distance */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <LocationIcon
                size={14}
                color={colors.text.tertiary}
                strokeWidth={iconConfig.strokeWidth}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text.tertiary,
                  fontFamily: 'Rubik',
                }}
              >
                {distance}{he.km}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
};
