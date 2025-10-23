/** Icon Map — curated */
import { Search, Calendar, Map as MapIcon, MapPin as Pin, Shield, Wallet, Camera, Drone, Wrench, Music, Tent, MessageCircle as Chat, User, Star, Check, AlertCircle } from 'lucide-react-native';

export const icons = {
  search: Search,
  calendar: Calendar,
  map: MapIcon,
  pin: Pin,
  shield: Shield,
  wallet: Wallet,
  camera: Camera,
  drone: Drone,
  wrench: Wrench,
  music: Music,
  tent: Tent,
  chat: Chat,
  user: User,
  star: Star,
  check: Check,
  alert: AlertCircle,
} as const;

export const iconConfig = { strokeWidth: 1.75, size: 24 } as const;

export type IconKey = keyof typeof icons;
