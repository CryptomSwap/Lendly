import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFadeSlideUp, useHaptics } from '../../src/hooks/useMotion';
import { colors, gradients, elevation } from '../../src/constants/theme';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { CategoryCard } from '../../src/components/ui/CategoryCard';
import { ListingCard } from '../../src/components/ui/ListingCard';
import { iconMap } from '../../src/constants/icons';
import { he } from '../../src/i18n/he';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const { triggerHaptic } = useHaptics();
  const [searchValue, setSearchValue] = useState('');
  const [showSearchSheet, setShowSearchSheet] = useState(false);

  const { animatedStyle: heroStyle } = useFadeSlideUp(0);
  const { animatedStyle: categoriesStyle } = useFadeSlideUp(200);
  const { animatedStyle: featuredStyle } = useFadeSlideUp(400);
  const { animatedStyle: ctaStyle } = useFadeSlideUp(600);

  const handleSearch = () => {
    triggerHaptic('medium');
    router.push('/results');
  };

  const handleCategoryPress = (category: string) => {
    triggerHaptic('light');
    router.push('/results');
  };

  const handleListingPress = (id: string) => {
    triggerHaptic('light');
    router.push(`/item/${id}`);
  };

  const handlePublishPress = () => {
    triggerHaptic('success');
    router.push('/owner/new');
  };

  const handleSearchExpand = () => {
    setShowSearchSheet(true);
  };

  const handleSearchCollapse = () => {
    setShowSearchSheet(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface.light }}>
      {/* Top Bar with Blur */}
      <BlurView
        intensity={20}
        tint="light"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          zIndex: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Animated.Text
            style={[
              {
                fontSize: 24,
                fontWeight: '800',
                fontFamily: 'Rubik',
                color: colors.text.primary,
                textAlign: 'center',
                marginBottom: 8,
              },
              heroStyle,
            ]}
          >
            {he.appName}
          </Animated.Text>
          <Animated.Text
            style={[
              {
                fontSize: 14,
                fontFamily: 'Rubik',
                color: colors.text.secondary,
                textAlign: 'center',
              },
              heroStyle,
            ]}
          >
            {he.appNameHebrew}
          </Animated.Text>
        </View>
      </BlurView>

      <AnimatedScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 140, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            {
              paddingHorizontal: 20,
              marginBottom: 32,
            },
            heroStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              textAlign: 'right',
              marginBottom: 12,
              lineHeight: 36,
            }}
          >
            {he.tagline}
          </Text>
          
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Rubik',
              color: colors.text.secondary,
              textAlign: 'right',
              marginBottom: 24,
              lineHeight: 24,
            }}
          >
            {he.subtitle}
          </Text>
          
          {/* Search Bar */}
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            onExpand={handleSearchExpand}
            onCollapse={handleSearchCollapse}
            placeholder={he.placeholders.searchEquipment}
          />

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              marginTop: 16,
            }}
          >
            <AnimatedButton
              title={he.searchAction}
              onPress={handleSearch}
              variant="primary"
              size="lg"
            />
            <AnimatedButton
              title={he.publishEquipment}
              onPress={handlePublishPress}
              variant="outline"
              size="lg"
            />
          </View>
        </Animated.View>

        {/* Categories Grid */}
        <Animated.View
          style={[
            {
              marginBottom: 32,
            },
            categoriesStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              textAlign: 'right',
              marginBottom: 16,
              paddingHorizontal: 20,
            }}
          >
            קטגוריות פופולריות
          </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <CategoryCard
              title={he.categories.cameras}
              icon="camera"
              onPress={() => handleCategoryPress('cameras')}
            />
            <CategoryCard
              title={he.categories.drones}
              icon="drone"
              onPress={() => handleCategoryPress('drones')}
            />
            <CategoryCard
              title={he.categories.tools}
              icon="wrench"
              onPress={() => handleCategoryPress('tools')}
            />
            <CategoryCard
              title={he.categories.music}
              icon="music"
              onPress={() => handleCategoryPress('music')}
            />
            <CategoryCard
              title={he.categories.camping}
              icon="tent"
              onPress={() => handleCategoryPress('camping')}
            />
          </ScrollView>
        </Animated.View>

        {/* Featured Listings */}
        <Animated.View
          style={[
            {
              marginBottom: 32,
            },
            featuredStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              textAlign: 'right',
              marginBottom: 16,
              paddingHorizontal: 20,
            }}
          >
            מומלצים עבורך
                </Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <ListingCard
              id="1"
              title="מצלמת DSLR מקצועית"
              price={150}
              rating={4.8}
              distance={2.5}
              image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
              category={he.categories.cameras}
              verified
              insured
              onPress={handleListingPress}
              onLike={(id) => triggerHaptic('light')}
              onShare={(id) => triggerHaptic('light')}
            />
            <ListingCard
              id="2"
              title="רחפן DJI Mavic Pro"
              price={200}
              rating={4.9}
              distance={1.8}
              image="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400"
              category={he.categories.drones}
              verified
              onPress={handleListingPress}
              onLike={(id) => triggerHaptic('light')}
              onShare={(id) => triggerHaptic('light')}
            />
            <ListingCard
              id="3"
              title="ערכת כלי עבודה מקצועית"
              price={80}
              rating={4.7}
              distance={3.2}
              image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"
              category={he.categories.tools}
              insured
              onPress={handleListingPress}
              onLike={(id) => triggerHaptic('light')}
              onShare={(id) => triggerHaptic('light')}
            />
          </ScrollView>
        </Animated.View>

        {/* Safety Points */}
        <Animated.View
          style={[
            {
              paddingHorizontal: 20,
              marginBottom: 32,
            },
            ctaStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              fontFamily: 'Rubik',
              color: colors.text.primary,
              textAlign: 'right',
              marginBottom: 16,
            }}
          >
            למה לבחור ב-{he.appName}?
          </Text>
          
          <View style={{ gap: 16 }}>
            {[
              'ציוד מאומת ומבוטח',
              'תשלום בטוח ומאובטח',
              'תמיכה 24/7',
              'מחירים תחרותיים',
            ].map((point, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.primary[50],
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.primary[500],
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.surface.light,
                      fontSize: 14,
                      fontWeight: '600',
                    }}
                  >
                    ✓
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Rubik',
                    color: colors.text.primary,
                    textAlign: 'right',
                    flex: 1,
                  }}
                >
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* CTA Section */}
        <Animated.View
          style={[
            {
              paddingHorizontal: 20,
            },
            ctaStyle,
          ]}
        >
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: 24,
              ...elevation.md,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                fontFamily: 'Rubik',
                color: colors.surface.light,
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
            יש לך ציוד להשכרה?
          </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Rubik',
                color: colors.surface.light,
                textAlign: 'right',
                marginBottom: 20,
                opacity: 0.9,
              }}
            >
            הצטרף לקהילת המפרסמים שלנו והתחל להרוויח
            </Text>
            <AnimatedButton
              title={he.publishEquipment}
              onPress={handlePublishPress}
              variant="secondary"
              fullWidth
            />
          </LinearGradient>
        </Animated.View>
      </AnimatedScrollView>
      </View>
  );
}
