
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface CharacterPortraitProps {
  name: string;
  image: string;
  position: 'left' | 'right' | 'center';
  description: string;
}

const CharacterPortrait = ({ name, image, position, description }: CharacterPortraitProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { elementRef: animationRef, isVisible } = useScrollAnimation({ 
    threshold: 0.2,
    animation: 'blur-fade',
    duration: 1.2
  });

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax movement based on scroll
  const getParallaxStyle = () => {
    const moveDirection = position === 'left' ? 1 : -1;
    const parallaxAmount = scrollPosition * 0.05 * moveDirection;
    
    return {
      transform: `translateY(${parallaxAmount}px)`
    };
  };

  // Position classes with improved positioning to prevent text overlap
  const positionClasses = {
    left: 'left-0 -translate-x-1/4',
    right: 'right-0 translate-x-1/4', // Move it further to the right
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <div 
      ref={animationRef}
      className={cn(
        'invisible-until-scroll character-portrait absolute bottom-10 md:bottom-20 z-10',
        positionClasses[position]
      )}
      style={getParallaxStyle()}
    >
      <div className="flex flex-col items-center relative">
        {/* Character glow effect */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-eclipse-accent opacity-20 scale-75"></div>
        
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-eclipse-accent group">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        </div>
        
        <div className="mt-4 text-center">
          <h4 className="font-serif text-xl md:text-2xl text-white text-shadow relative overflow-hidden">
            <span className={cn(
              "inline-block relative",
              isVisible && "after:absolute after:bg-eclipse-accent after:h-[2px] after:w-full after:left-0 after:bottom-0 after:origin-left after:scale-x-100 after:transition-transform after:duration-1000"
            )}>
              {name}
            </span>
          </h4>
          <p className="text-sm md:text-base text-muted-foreground max-w-xs mt-2 opacity-0 translate-y-4 transition-all duration-700 delay-300" 
             style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterPortrait;
