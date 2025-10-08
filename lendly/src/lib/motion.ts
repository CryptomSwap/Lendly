// Motion utilities using CSS classes (framer-style helpers)

export interface MotionConfig {
  duration?: number
  delay?: number
  ease?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
}

/**
 * Generate CSS transition classes
 * @param properties CSS properties to animate
 * @param config Motion configuration
 * @returns CSS classes string
 */
export function motion(
  properties: string[] = ['all'],
  config: MotionConfig = {}
): string {
  const { duration = 200, delay = 0, ease = 'ease' } = config
  
  const transitions = properties.map(prop => 
    `${prop} ${duration}ms ${ease}${delay > 0 ? ` ${delay}ms` : ''}`
  ).join(', ')
  
  return `transition-[${transitions}]`
}

/**
 * Hover animation classes
 * @param config Motion configuration
 * @returns CSS classes for hover animations
 */
export function hoverMotion(config: MotionConfig = {}): string {
  return motion(['transform', 'box-shadow'], config)
}

/**
 * Scale animation on hover
 * @param scale Scale factor (default: 1.05)
 * @param config Motion configuration
 * @returns CSS classes
 */
export function hoverScale(scale: number = 1.05, config: MotionConfig = {}): string {
  return `${hoverMotion(config)} hover:scale-[${scale}]`
}

/**
 * Lift animation on hover (translateY + shadow)
 * @param translateY Y translation in pixels (default: -2)
 * @param config Motion configuration
 * @returns CSS classes
 */
export function hoverLift(translateY: number = -2, config: MotionConfig = {}): string {
  return `${hoverMotion(config)} hover:-translate-y-[${translateY}px] hover:shadow-lg`
}

/**
 * Fade in animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function fadeIn(config: MotionConfig = {}): string {
  return `${motion(['opacity'], config)} animate-fade-in`
}

/**
 * Slide up animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function slideUp(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-slide-up`
}

/**
 * Scale in animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function scaleIn(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-scale-in`
}

/**
 * Stagger animation for multiple elements
 * @param index Element index
 * @param staggerDelay Delay between elements in ms (default: 100)
 * @param config Motion configuration
 * @returns CSS classes with delay
 */
export function stagger(
  index: number,
  staggerDelay: number = 100,
  config: MotionConfig = {}
): string {
  const delay = index * staggerDelay
  return motion(['opacity', 'transform'], { ...config, delay })
}

/**
 * Pulse animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function pulse(config: MotionConfig = {}): string {
  return `${motion(['opacity'], config)} animate-pulse`
}

/**
 * Bounce animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function bounce(config: MotionConfig = {}): string {
  return `${motion(['transform'], config)} animate-bounce`
}

/**
 * Spin animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function spin(config: MotionConfig = {}): string {
  return `${motion(['transform'], config)} animate-spin`
}

/**
 * Shimmer loading animation
 * @returns CSS classes for shimmer effect
 */
export function shimmer(): string {
  return 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]'
}

/**
 * Card hover animation (combines lift + scale)
 * @param config Motion configuration
 * @returns CSS classes
 */
export function cardHover(config: MotionConfig = {}): string {
  return `${hoverMotion(config)} hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`
}

/**
 * Button press animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function buttonPress(config: MotionConfig = {}): string {
  return `${motion(['transform'], config)} active:scale-95`
}

/**
 * Modal backdrop animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function modalBackdrop(config: MotionConfig = {}): string {
  return `${motion(['opacity'], config)} animate-fade-in`
}

/**
 * Modal content animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function modalContent(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-scale-in`
}

/**
 * Toast animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function toast(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-slide-up`
}

/**
 * Page transition animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function pageTransition(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-fade-in`
}

/**
 * List item animation with stagger
 * @param index Item index
 * @param config Motion configuration
 * @returns CSS classes
 */
export function listItem(index: number, config: MotionConfig = {}): string {
  return stagger(index, 50, config)
}

/**
 * Grid item animation with stagger
 * @param index Item index
 * @param config Motion configuration
 * @returns CSS classes
 */
export function gridItem(index: number, config: MotionConfig = {}): string {
  return stagger(index, 100, config)
}

/**
 * Search bar focus animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function searchFocus(config: MotionConfig = {}): string {
  return `${motion(['transform', 'box-shadow'], config)} focus:scale-[1.01] focus:shadow-md`
}

/**
 * Filter change animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function filterChange(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-fade-in`
}

/**
 * Map pin animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function mapPin(config: MotionConfig = {}): string {
  return `${motion(['transform'], config)} hover:scale-110`
}

/**
 * Success animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function success(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-bounce`
}

/**
 * Error animation
 * @param config Motion configuration
 * @returns CSS classes
 */
export function error(config: MotionConfig = {}): string {
  return `${motion(['opacity', 'transform'], config)} animate-pulse`
}
