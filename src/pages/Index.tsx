import React, { useState, useEffect, useRef } from 'react';
import { storyContent } from '@/data/storyContent';
import StorySection from '@/components/StorySection';
import ScrollProgress from '@/components/ScrollProgress';
import { Button } from '@/components/ui/button';
import { Moon, SunMoon, Volume2, VolumeX, ChevronDown, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const [activeSection, setActiveSection] = useState(storyContent[0].id);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Scroll animation refs for welcome screen
  const { elementRef: welcomeTitleRef } = useScrollAnimation({ 
    animation: 'sequential-chars',
    duration: 1.5
  });
  
  const { elementRef: welcomeSubtitleRef } = useScrollAnimation({ 
    animation: 'parallax-reveal', 
    delay: 0.5,
    duration: 1.2
  });
  
  const { elementRef: welcomeTextRef } = useScrollAnimation({ 
    animation: 'slide-up', 
    delay: 0.8,
    duration: 1.0
  });
  
  const { elementRef: welcomeButtonRef } = useScrollAnimation({ 
    animation: 'zoom-in', 
    delay: 1.2,
    duration: 0.8
  });
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the current section data
  const currentSection = storyContent.find(section => section.id === activeSection);

  // Background audio setup
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Invisible Dreams.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle audio mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else if (!showWelcome) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  }, [isMuted, showWelcome]);

  // Handle section change
  const handleSectionInView = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const startExperience = () => {
    setShowWelcome(false);
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Calculate parallax styles based on scroll position
  const getParallaxStyle = (speed: number = 0.5) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`
    };
  };

  // Create the crimson moon eclipse effect with parallax
  const EclipseEffect = () => (
    <div 
      className="fixed top-20 right-20 z-0 opacity-60"
      style={getParallaxStyle(-0.2)}
    >
      <div className="eclipse-circle w-32 h-32 rounded-full bg-eclipse-accent animate-moon-glow animate-float"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-eclipse-dark">
      {/* Parallax stars background */}
      <div 
        className="fixed inset-0 bg-starry-sky z-0 opacity-50"
        style={getParallaxStyle(0.1)}
      ></div>
      
      {/* Welcome overlay */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-6">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 10}s`,
                  animation: 'float 10s ease-in-out infinite'
                }}
              ></div>
            ))}
            
            <div 
              className="absolute top-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(196, 30, 58, 0.6) 0%, rgba(15, 11, 26, 0) 70%)',
                filter: 'blur(20px)',
                animation: 'pulse 4s ease-in-out infinite'
              }}
            ></div>
          </div>
          
          <h1 
            ref={welcomeTitleRef}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-serif mb-6 text-center text-glow invisible-until-scroll relative z-10"
          >
            Eclipsed Hearts
          </h1>
          <h2 
            ref={welcomeSubtitleRef}
            className="text-xl md:text-2xl text-eclipse-gold font-serif mb-8 text-center invisible-until-scroll relative z-10"
          >
            日蝕の心 - Nisshoku no Kokoro
          </h2>
          <div 
            ref={welcomeTextRef}
            className="invisible-until-scroll relative z-10"
          >
            <p className="text-center text-lg mb-8 max-w-xl text-white">
              Experience a tale of love, fate, and rebirth through an immersive journey.
              <br /><br />
              <span className="text-eclipse-gold">Scroll to progress through the story.</span>
            </p>
          </div>
          <div 
            ref={welcomeButtonRef}
            className="invisible-until-scroll relative z-10"
          >
            <Button 
              onClick={startExperience}
              className="bg-eclipse-accent hover:bg-eclipse-gold text-black text-lg px-8 py-6 relative overflow-hidden group"
            >
              <span className="relative z-10">Begin the Journey</span>
              <span className="absolute inset-0 bg-eclipse-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
            </Button>
          </div>
          
          <div className="absolute bottom-12 animate-bounce">
            <ChevronDown className="text-eclipse-gold" size={28} />
          </div>
        </div>
      )}
      
      <ScrollProgress />
      
      <EclipseEffect />
      
      {/* Audio control button */}
      <div className="fixed bottom-4 right-4 z-50 bg-eclipse-medium bg-opacity-80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleMute} 
          className="text-white hover:text-eclipse-accent"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
      </div>
      
      <div className="story-container">
        {storyContent && storyContent.length > 0 ? (
          storyContent.map((section) => (
            <StorySection
              key={section.id}
              id={section.id}
              title={section.title}
              subtitle={section.subtitle}
              paragraphs={section.paragraphs || []} 
              background={section.background}
              character={section.character}
              animation={section.animation}
              isActive={activeSection === section.id}
              onSectionInView={() => handleSectionInView(section.id)}
            />
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-white text-2xl">Loading story content...</p>
          </div>
        )}
      </div>

      {/* Navigate Chapters Section */}
      <section className="py-16 bg-gradient-to-b from-eclipse-dark to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl md:text-2xl font-cinzel text-eclipse-gold mb-8 animate-pulse-glow">
              Navigate Chapters
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="font-cinzel bg-eclipse-accent text-black hover:bg-eclipse-gold transition-all duration-300 rounded-full px-6 py-3 shadow-lg shadow-eclipse-accent/30"
              >
                Chapter 1 (Current)
              </Button>
              <a href="https://storyweb2.vercel.app" className="inline-block">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-cinzel text-eclipse-gold border-eclipse-gold hover:bg-eclipse-gold hover:text-black transition-all duration-300 rounded-full px-6 py-3"
                  
                >
                  Chapter 2
                </Button>
              </a>
              <a href="https://storyweb2.vercel.app/chapter2" className="inline-block">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-cinzel text-eclipse-gold border-eclipse-gold hover:bg-eclipse-gold hover:text-black transition-all duration-300 rounded-full px-6 py-3"
                >
                  Chapter 3
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Social Media Links */}
      <footer className="bg-gradient-to-b from-gray-900 to-eclipse-dark py-8 text-center text-sm text-muted-foreground relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-eclipse-gold mb-4">
            © Copyright BHARATH. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-eclipse-gold hover:text-eclipse-accent transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a 
              href="https://facebook.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-eclipse-gold hover:text-eclipse-accent transition-colors duration-300"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://www.instagram.com/_bharath.s?igsh=MXZkOWltZHZybGcxNQ==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-eclipse-gold hover:text-eclipse-accent transition-colors duration-300"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-eclipse-gold hover:text-eclipse-accent transition-colors duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
