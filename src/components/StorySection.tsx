
import React, { useRef, useEffect, useState } from 'react';
import { useScrollAnimation, AnimationType } from '../hooks/useScrollAnimation';
import CharacterPortrait from './CharacterPortrait';
import { cn } from '@/lib/utils';
import { ChevronDown, Sparkles } from 'lucide-react';

interface StorySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  background: string;
  character?: {
    name: string;
    image: string;
    position: 'left' | 'right' | 'center';
    description: string;
  };
  animation?: string;
  isActive: boolean;
  onSectionInView: () => void;
}

const StorySection = ({
  id,
  title,
  subtitle,
  paragraphs,
  background,
  character,
  animation = 'fade-in',
  isActive,
  onSectionInView
}: StorySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Choose different animations based on section id
  let titleAnimation: AnimationType = 'parallax-reveal';
  let subtitleAnimation: AnimationType = 'sequential-chars';
  
  // Customize animations based on section content
  if (id === 'intro') {
    titleAnimation = 'eclipse-reveal';
    subtitleAnimation = 'sequential-chars';
  } else if (id === 'chapter1') {
    titleAnimation = 'flicker-in';
    subtitleAnimation = 'eclipse-pulse';
  } else if (id.includes('section')) {
    // For character sections, use different animations
    titleAnimation = character ? 'heartbeat' : 'parallax-reveal';
  }
  
  const { elementRef: titleRef } = useScrollAnimation({ 
    threshold: 0.2, 
    animation: titleAnimation,
    duration: 1.2
  });
  
  const { elementRef: subtitleRef } = useScrollAnimation({ 
    threshold: 0.2, 
    animation: subtitleAnimation, 
    delay: 0.5,
    duration: 1.5
  });
  
  // For the scroll indicator at the bottom of each section
  const { elementRef: scrollIndicatorRef } = useScrollAnimation({ 
    threshold: 0.9, 
    animation: 'fade-in',
    once: false,
  });

  // For parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor if this section is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onSectionInView();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [id, isActive, onSectionInView]);

  // Improved content spacing to accommodate characters
  const contentClasses = character?.position === 'right' 
    ? 'pr-52 md:pr-80' // Increased right padding for character on right
    : character?.position === 'left'
    ? 'pl-52 md:pl-80' // Increased left padding for character on left
    : '';

  // Determine if this is the first section to show scroll indicator
  const isFirstSection = id === 'intro';
  
  // Add special effects for dream sequences or eclipse moments
  const hasDreamEffect = id === 'section1' || id === 'section3';
  const hasEclipseEffect = id === 'section4' || id === 'intro';

  // Calculate parallax transform based on scroll position
  const getParallaxStyle = (depth = 0.2) => {
    const transform = `translateY(${scrollY * depth}px)`;
    return { transform };
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'story-section min-h-screen px-4 md:px-12 py-32 flex flex-col justify-center relative', // Increased padding-top and padding-bottom
        background,
        isActive ? 'z-10' : 'z-0',
        hasDreamEffect && 'dream-sequence',
        hasEclipseEffect && 'eclipse-sequence'
      )}
    >
      {/* Background parallax elements */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={getParallaxStyle(0.05)}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{opacity: 0.4}}></div>
      </div>
      
      {/* Add floating particles for dream sequences */}
      {hasDreamEffect && (
        <div 
          className="dream-particles absolute inset-0 overflow-hidden pointer-events-none"
          style={getParallaxStyle(0.1)}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute floating-particle bg-white rounded-full opacity-30 
                          w-${1 + (i % 3)} h-${1 + (i % 3)}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 15}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Add eclipse effect for eclipse scenes */}
      {hasEclipseEffect && (
        <div 
          className="eclipse-effect absolute top-20 md:top-40 right-20 md:right-40 pointer-events-none"
          style={getParallaxStyle(-0.1)}
        >
          <div className="eclipse-orb animate-eclipse-pulse">
            <div className="eclipse-shadow"></div>
            <Sparkles className="eclipse-sparkle text-eclipse-gold animate-pulse" size={14} />
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "container max-w-3xl mx-auto relative pb-16", // Added padding at the bottom
          contentClasses
        )}
        style={getParallaxStyle(0.03)}
      >
        <div
          ref={titleRef}
          className="mb-6 invisible-until-scroll"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white text-shadow mb-2 overflow-hidden">
            {title}
          </h2>
          
          {subtitle && (
            <div ref={subtitleRef} className="invisible-until-scroll overflow-hidden">
              <h3 className="text-xl md:text-2xl text-eclipse-gold font-serif italic mb-8">
                {subtitle}
              </h3>
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          {paragraphs && paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => {
              // Create more varied animations based on paragraph content
              let animationType: AnimationType = index % 2 === 0 ? 'slide-left' : 'slide-right';
              
              // Special animations for specific paragraphs
              if (paragraph.includes("dreams") || paragraph.includes("dream")) {
                animationType = 'dream-fade';
              } else if (paragraph.includes("moon") || paragraph.includes("eclipse")) {
                animationType = 'eclipse-reveal';
              } else if (paragraph.includes("heart") || paragraph.includes("love") || 
                         paragraph.includes("chest") || paragraph.includes("ache")) {
                animationType = 'heartbeat';
              } else if (paragraph.includes("flicker") || paragraph.includes("glimpse") || 
                         paragraph.includes("vision")) {
                animationType = 'flicker-in';
              } else if (paragraph.length < 15) {
                // Short, impactful sentences get special treatment
                animationType = 'sequential-chars';
              } else if (index === 0) {
                // First paragraph
                animationType = 'parallax-reveal';
              }
              
              const { elementRef: paragraphRef } = useScrollAnimation({ 
                threshold: 0.1, 
                animation: animationType,
                delay: index * 0.1, // Increased delay for more pronounced staggered effect
                duration: 1 + (index * 0.1) // Slightly varying durations
              });

              return (
                <div
                  key={index}
                  ref={paragraphRef}
                  className={cn(
                    "mb-6 invisible-until-scroll", // Increased bottom margin
                    paragraph.length < 15 && "text-eclipse-accent font-serif text-xl md:text-2xl"
                  )}
                >
                  <p className={cn(
                    "text-lg leading-relaxed text-white bg-eclipse-dark bg-opacity-60 p-2 rounded", // Added background with opacity and padding
                    paragraph.includes("And that's when she felt it.") && "text-xl font-serif italic text-eclipse-gold",
                    paragraph.includes("A girl.") && "text-xl font-serif",
                    paragraph.includes("Or from something else?") && "text-xl font-serif italic"
                  )}>{paragraph}</p>
                </div>
              );
            })
          ) : (
            <p className="text-lg leading-relaxed text-white">Story content is loading...</p>
          )}
        </div>

        {character && (
          <CharacterPortrait
            name={character.name}
            image={character.image}
            position={character.position}
            description={character.description}
          />
        )}
      </div>
      
      {/* Scroll indicator - only show if this is first section or if there are more sections */}
      {(isFirstSection || id !== 'section4') && (
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 invisible-until-scroll"
        >
          <div className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <p className="text-sm mb-2">Scroll to continue</p>
            <ChevronDown className="animate-bounce" size={24} />
          </div>
        </div>
      )}
    </section>
  );
};

export default StorySection;
