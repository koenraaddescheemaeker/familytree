import { useCallback, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';

// Web Audio API based achievement sound generator
export const useAchievementSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const { isSoundMuted } = useGame();

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playAchievementSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Create a pleasant "achievement unlocked" chime sound
      // Using multiple oscillators for a rich, rewarding sound

      // Main chime - ascending notes
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        // Envelope
        const startTime = now + (index * 0.08);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.6);
      });

      // Add a subtle sparkle effect
      const sparkleOsc = audioContext.createOscillator();
      const sparkleGain = audioContext.createGain();
      
      sparkleOsc.type = 'triangle';
      sparkleOsc.frequency.setValueAtTime(2000, now + 0.3);
      sparkleOsc.frequency.exponentialRampToValueAtTime(4000, now + 0.5);
      
      sparkleGain.gain.setValueAtTime(0, now + 0.3);
      sparkleGain.gain.linearRampToValueAtTime(0.05, now + 0.35);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      
      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(audioContext.destination);
      
      sparkleOsc.start(now + 0.3);
      sparkleOsc.stop(now + 0.8);

    } catch (error) {
      console.warn('Could not play achievement sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  const playMemoryMatchSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Short, pleasant "match" sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + 0.25);
    } catch (error) {
      console.warn('Could not play match sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  const playErrorSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Short descending "wrong" sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + 0.25);
    } catch (error) {
      console.warn('Could not play error sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  const playSuccessSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Short ascending "correct" sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + 0.25);
    } catch (error) {
      console.warn('Could not play success sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  const playNotificationSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Pleasant notification "ding" - two-tone bell sound
      const frequencies = [698.46, 880]; // F5, A5 - pleasant interval
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        const startTime = now + (index * 0.12);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5);
      });

      // Add subtle overtone for richness
      const overtone = audioContext.createOscillator();
      const overtoneGain = audioContext.createGain();
      
      overtone.type = 'triangle';
      overtone.frequency.value = 1760; // High harmonic
      
      overtoneGain.gain.setValueAtTime(0, now);
      overtoneGain.gain.linearRampToValueAtTime(0.03, now + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      overtone.connect(overtoneGain);
      overtoneGain.connect(audioContext.destination);
      
      overtone.start(now);
      overtone.stop(now + 0.4);

    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  // Wheel tick sound - mechanical click for spinning wheel
  const playWheelTickSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Short, sharp mechanical tick
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(1200, now);
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.02);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + 0.05);

      // Add a subtle "knock" for depth
      const knockOsc = audioContext.createOscillator();
      const knockGain = audioContext.createGain();
      
      knockOsc.type = 'sine';
      knockOsc.frequency.value = 150;
      
      knockGain.gain.setValueAtTime(0.04, now);
      knockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      
      knockOsc.connect(knockGain);
      knockGain.connect(audioContext.destination);
      
      knockOsc.start(now);
      knockOsc.stop(now + 0.04);

    } catch (error) {
      console.warn('Could not play wheel tick sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  // Jackpot/celebration sound - festive fanfare
  const playJackpotSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Fanfare chord progression
      const chords = [
        [523.25, 659.25, 783.99], // C major
        [587.33, 739.99, 880],     // D major
        [659.25, 830.61, 987.77], // E major
        [783.99, 987.77, 1174.66], // G major (higher)
      ];

      chords.forEach((chord, chordIndex) => {
        chord.forEach((freq) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.type = 'sine';
          oscillator.frequency.value = freq;
          
          const startTime = now + (chordIndex * 0.15);
          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
          gainNode.gain.setValueAtTime(0.08, startTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.start(startTime);
          oscillator.stop(startTime + 0.35);
        });
      });

      // Add sparkle/shimmer effect
      for (let i = 0; i < 8; i++) {
        const sparkle = audioContext.createOscillator();
        const sparkleGain = audioContext.createGain();
        
        sparkle.type = 'triangle';
        const baseFreq = 2000 + Math.random() * 3000;
        sparkle.frequency.value = baseFreq;
        
        const sparkleTime = now + 0.2 + Math.random() * 0.6;
        sparkleGain.gain.setValueAtTime(0, sparkleTime);
        sparkleGain.gain.linearRampToValueAtTime(0.03, sparkleTime + 0.02);
        sparkleGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.15);
        
        sparkle.connect(sparkleGain);
        sparkleGain.connect(audioContext.destination);
        
        sparkle.start(sparkleTime);
        sparkle.stop(sparkleTime + 0.2);
      }

      // Final celebration chord
      const finalFreqs = [1046.50, 1318.51, 1567.98, 2093]; // C6 major with octave
      finalFreqs.forEach((freq) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const startTime = now + 0.6;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.9);
      });

    } catch (error) {
      console.warn('Could not play jackpot sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  // Bonus spin sound - exciting quick burst
  const playBonusSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Quick ascending arpeggio
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A4 to E6
      
      notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        const startTime = now + (index * 0.04);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
      });

      // Add a "power-up" sweep
      const sweep = audioContext.createOscillator();
      const sweepGain = audioContext.createGain();
      
      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(200, now + 0.1);
      sweep.frequency.exponentialRampToValueAtTime(2000, now + 0.35);
      
      sweepGain.gain.setValueAtTime(0, now + 0.1);
      sweepGain.gain.linearRampToValueAtTime(0.03, now + 0.15);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      sweep.connect(sweepGain);
      sweepGain.connect(audioContext.destination);
      
      sweep.start(now + 0.1);
      sweep.stop(now + 0.45);

    } catch (error) {
      console.warn('Could not play bonus sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  // Wheel spin start sound - building anticipation
  const playWheelStartSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Whoosh/spin start sound
      const noise = audioContext.createOscillator();
      const noiseGain = audioContext.createGain();
      
      noise.type = 'sawtooth';
      noise.frequency.setValueAtTime(100, now);
      noise.frequency.exponentialRampToValueAtTime(400, now + 0.3);
      
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      noise.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      noise.start(now);
      noise.stop(now + 0.5);

    } catch (error) {
      console.warn('Could not play wheel start sound:', error);
    }
  }, [getAudioContext, isSoundMuted]);

  return {
    playAchievementSound,
    playMemoryMatchSound,
    playErrorSound,
    playSuccessSound,
    playNotificationSound,
    playWheelTickSound,
    playJackpotSound,
    playBonusSound,
    playWheelStartSound,
  };
};
