
import { useEffect, useRef, useState } from 'react';

export type AnimationType = 
  | 'fade-in' 
  | 'slide-up' 
  | 'slide-left' 
  | 'slide-right' 
  | 'zoom-in' 
  | 'reveal' 
  | 'eclipse-reveal' 
  | 'flicker-in' 
  | 'dream-fade' 
  | 'heartbeat' 
  | 'eclipse-pulse'
  | 'parallax-reveal'
  | 'sequential-chars'
  | 'float-in'
  | 'blur-fade';

interface UseScrollAnimationOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  animation?: AnimationType;
  delay?: number;
  once?: boolean;
  duration?: number;
  distance?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply the animation class based on the option provided
            const animationClass = options.animation || 'fade-in';
            entry.target.classList.add('visible-on-scroll');
            entry.target.classList.add(`animation-${animationClass}`);
            
            // If duration is specified, add a style for animation-duration
            if (options.duration) {
              (entry.target as HTMLElement).style.animationDuration = `${options.duration}s`;
            }
            
            // If delay is specified, add a style for animation-delay
            if (options.delay) {
              (entry.target as HTMLElement).style.animationDelay = `${options.delay}s`;
            }
            
            // If distance is specified (for parallax), add a data attribute
            if (options.distance) {
              entry.target.setAttribute('data-parallax-distance', options.distance.toString());
            }
            
            setIsVisible(true);
            
            // Once the animation has played, we can unobserve if once is true (default)
            if (options.once !== false) {
              observer.unobserve(entry.target);
            }
          } else if (options.once === false) {
            // If once is false, we remove the class when element is not in view
            entry.target.classList.remove('visible-on-scroll');
            entry.target.classList.remove(`animation-${options.animation || 'fade-in'}`);
            setIsVisible(false);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
      }
    );

    const currentElement = elementRef.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.threshold, options.root, options.rootMargin, options.animation, options.delay, options.once, options.duration, options.distance]);

  return { elementRef, isVisible };
};
