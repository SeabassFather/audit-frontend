let ctx;
function getCtx(){
  if (!ctx && typeof window !== "undefined") {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}
function envGain(duration=0.15, attack=0.005, sustain=0.08, release=0.06){
  const audio = getCtx(); if(!audio) return null;
  const g = audio.createGain();
  const t0 = audio.currentTime;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.9, t0 + attack);
  g.gain.linearRampToValueAtTime(0.45, t0 + attack + sustain);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + sustain + release);
  return { g, tEnd: t0 + attack + sustain + release };
}
function pitchTone(freq=880, duration=0.12, type="sine"){
  const audio = getCtx(); if(!audio) return;
  const o = audio.createOscillator();
  const e = envGain(duration);
  if (!e) return;
  o.type = type;
  o.frequency.value = freq;
  o.connect(e.g); e.g.connect(audio.destination);
  o.start();
  o.stop(e.tEnd);
}
export function playClick(){               // subtle UI tick
  const audio = getCtx(); if(!audio) return;
  const o = audio.createOscillator();
  const n = audio.createNoise ? audio.createNoise() : null;
  const e = envGain(0.10, 0.002, 0.05, 0.05);
  o.type = "square"; o.frequency.value = 2400;
  o.connect(e.g); e.g.connect(audio.destination);
  o.start(); o.stop(e.tEnd);
}
export function playSwish(){               // page-change swish
  const audio = getCtx(); if(!audio) return;
  const o = audio.createOscillator();
  const e = envGain(0.28, 0.01, 0.18, 0.09);
  o.type = "sawtooth";
  const t0 = audio.currentTime;
  o.frequency.setValueAtTime(1800, t0);
  o.frequency.exponentialRampToValueAtTime(280, t0 + 0.26);
  o.connect(e.g); e.g.connect(audio.destination);
  o.start(); o.stop(e.tEnd);
}
export function playSuccess(){             // form submit success
  const audio = getCtx(); if(!audio) return;
  const o1 = audio.createOscillator(); const e1 = envGain(0.25, 0.004, 0.12, 0.12);
  const o2 = audio.createOscillator(); const e2 = envGain(0.25, 0.004, 0.12, 0.12);
  o1.type="sine"; o2.type="sine";
  const t0 = audio.currentTime;
  o1.frequency.setValueAtTime(880, t0);
  o2.frequency.setValueAtTime(1320, t0);       // major sixth above
  o1.connect(e1.g); e1.g.connect(audio.destination);
  o2.connect(e2.g); e2.g.connect(audio.destination);
  o1.start(); o2.start();
  o1.stop(e1.tEnd); o2.stop(e2.tEnd);
}