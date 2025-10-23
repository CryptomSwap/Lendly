'use client';

import { forwardRef, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends Omit<ButtonProps, 'onClick'>, Omit<MotionProps, 'children'> {
  onPress?: () => void;
  isLoading?: boolean;
  icon?: ReactNode;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children: ReactNode;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    onPress, 
    isLoading = false, 
    icon, 
    ariaLabel, 
    variant = 'primary',
    className,
    children,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || isLoading;

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return 'bg-blue-600 hover:bg-blue-700 text-white';
        case 'secondary':
          return 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100';
        case 'ghost':
          return 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300';
        case 'danger':
          return 'bg-red-600 hover:bg-red-700 text-white';
        default:
          return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Button
          ref={ref}
          onClick={onPress}
          disabled={isDisabled}
          className={cn(
            'relative transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'shadow-sm hover:shadow-md',
            getVariantStyles(),
            className
          )}
          aria-label={ariaLabel}
          aria-busy={isLoading}
          {...props}
        >
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={isLoading ? { opacity: 0.7 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              icon && <span className="flex-shrink-0">{icon}</span>
            )}
            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
              {children}
            </span>
          </motion.div>
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };
export type { AnimatedButtonProps };