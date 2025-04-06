
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface NarratorProps {
  audioUrl?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentSection?: string;
  audioStartTime?: number;
  audioEndTime?: number;
}

const Narrator = ({ 
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Changed to a reliable test audio URL
  isPlaying, 
  onTogglePlay,
  currentSection,
  audioStartTime = 0,
  audioEndTime
}: NarratorProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log("Narrator component mounted");
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      console.log("Audio element created with URL:", audioUrl);
      
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log("Audio can play through");
        setIsLoaded(true);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error("Error loading audio:", e);
      });

      audioRef.current.addEventListener('ended', () => {
        console.log("Audio ended");
        onTogglePlay();
      });

      audioRef.current.volume = volume;
      audioRef.current.load();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  // Control playback based on isPlaying prop
  useEffect(() => {
    console.log("isPlaying changed:", isPlaying, "isLoaded:", isLoaded);
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      console.log("Starting audio playback", "audioStartTime:", audioStartTime);
      if (audioStartTime && audioRef.current.currentTime !== audioStartTime) {
        audioRef.current.currentTime = audioStartTime;
      }
      
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
      });
    } else {
      console.log("Pausing audio");
      audioRef.current.pause();
    }

    // Optional: Handle ending time
    if (audioEndTime && isPlaying) {
      console.log("Setting end time check at:", audioEndTime);
      const checkTime = setInterval(() => {
        if (audioRef.current && audioRef.current.currentTime >= audioEndTime) {
          console.log("Reached end time, stopping");
          audioRef.current.pause();
          onTogglePlay();
          clearInterval(checkTime);
        }
      }, 100);
      
      return () => clearInterval(checkTime);
    }
  }, [isPlaying, isLoaded, audioStartTime, audioEndTime, currentSection]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-eclipse-medium bg-opacity-80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleMute} 
          className="text-white hover:text-eclipse-accent"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        
        {isPlaying && (
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-eclipse-gold text-sm">Narrating</span>
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-eclipse-accent animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-3 bg-eclipse-accent animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-3 bg-eclipse-accent animate-pulse" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Narrator;
