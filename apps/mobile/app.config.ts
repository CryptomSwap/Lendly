import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Lendly',
  slug: 'lendly-israel',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'co.il.lendly.mobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'co.il.lendly.mobile',
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'האפליקציה זקוקה לגישה למיקום כדי למצוא ציוד קרוב אליך.',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'האפליקציה זקוקה לגישה למצלמה כדי לצלם את הציוד.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'האפליקציה זקוקה לגישה לתמונות כדי לצלם את הציוד.',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#ffffff',
        sounds: ['./assets/notification.wav'],
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'your-project-id',
    },
  },
  experiments: {
    typedRoutes: true,
  },
});
