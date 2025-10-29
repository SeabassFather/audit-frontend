// ═══════════════════════════════════════════════════════════
// 🔊 BULLETPROOF AUDIO SYSTEM
// ═══════════════════════════════════════════════════════════

class AudioSystem {
  constructor() {
    this.enabled = true;
    this.volume = 0.3;
    this.audioContext = null;
    
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('✅ AudioSystem initialized successfully');
      } catch (e) {
        console.warn('⚠️ Web Audio API not supported:', e);
      }
    }
  }

  playHover() {
    if (!this.enabled || !this.audioContext) return;
    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
      gain.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playClick() {
    if (!this.enabled || !this.audioContext) return;
    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.05);
      gain.gain.setValueAtTime(this.volume * 0.25, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.05);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playSwoosh() {
    if (!this.enabled || !this.audioContext) return;
    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.frequency.setValueAtTime(300, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.15);
      gain.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playSuccess() {
    if (!this.enabled || !this.audioContext) return;
    try {
      const osc1 = this.audioContext.createOscillator();
      const osc2 = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioContext.destination);
      osc1.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
      osc2.frequency.setValueAtTime(659.25, this.audioContext.currentTime);
      gain.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
      osc1.start(this.audioContext.currentTime);
      osc2.start(this.audioContext.currentTime);
      osc1.stop(this.audioContext.currentTime + 0.3);
      osc2.stop(this.audioContext.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playWarning() {
    if (!this.enabled || !this.audioContext) return;
    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.audioContext.currentTime);
      gain.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.2);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playToggle() {
    if (!this.enabled || !this.audioContext) return;
    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
      osc.frequency.setValueAtTime(900, this.audioContext.currentTime + 0.05);
      gain.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    console.log('🔊 Audio ' + (this.enabled ? 'ENABLED' : 'DISABLED'));
    return this.enabled;
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
  }
}

// Create singleton instance
const audioSystem = new AudioSystem();

// Export as default
export default audioSystem;

// Also export as named export (backup)
export { audioSystem };
