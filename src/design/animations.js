// Animation keyframes and helpers
// Since we use inline styles, animations are defined as CSS keyframe strings
// injected once into the document head
import { useState as _useState, useEffect as _useEffect, useRef as _useRef } from 'react';

const keyframes = `
@keyframes skeletonPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes slideInUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
}

@keyframes countUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes typingDot {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-4px); }
}

@keyframes progressRing {
  from { stroke-dashoffset: var(--circumference); }
  to { stroke-dashoffset: var(--target-offset); }
}

@keyframes checkmark {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes correctFlash {
  0% { background-color: rgba(22, 163, 74, 0.2); transform: scale(1); }
  50% { background-color: rgba(22, 163, 74, 0.15); transform: scale(1.02); }
  100% { background-color: transparent; transform: scale(1); }
}

@keyframes wrongShake {
  0%, 100% { transform: translateX(0); background-color: rgba(220, 38, 38, 0.1); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(234, 88, 12, 0); }
}

@keyframes chatSlideIn {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Line draw-on for the projected-score trajectory (path needs pathLength="100"
   + stroke-dasharray:100). Timed to land with the score count-up. */
@keyframes drawLine {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Inject keyframes into the document once
let injected = false;
export function injectAnimations() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-perform-animations', '');
  style.textContent = keyframes;
  document.head.appendChild(style);
  injected = true;
}

// Animation presets for inline style usage
export const animations = {
  skeletonPulse: 'skeletonPulse 1.5s ease-in-out infinite',
  fadeIn: 'fadeIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  fadeInUp: 'fadeInUp 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  fadeInDown: 'fadeInDown 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  slideInRight: 'slideInRight 300ms cubic-bezier(0.32, 0.72, 0, 1)',
  slideInLeft: 'slideInLeft 300ms cubic-bezier(0.32, 0.72, 0, 1)',
  slideInUp: 'slideInUp 300ms cubic-bezier(0.32, 0.72, 0, 1)',
  scaleIn: 'scaleIn 300ms cubic-bezier(0.32, 0.72, 0, 1)',
  shake: 'shake 300ms ease',
  countUp: 'countUp 400ms ease-out',
  spin: 'spin 800ms linear infinite',
  checkmark: 'checkmark 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  correctFlash: 'correctFlash 500ms ease-out',
  wrongShake: 'wrongShake 400ms ease',
  pulseGlow: 'pulseGlow 2s ease-in-out infinite',
  chatSlideIn: 'chatSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
};

// useCountUp hook — animates a number from 0 to target
// Usage: const displayValue = useCountUp(targetValue, duration, delay)

export function useCountUp(target, duration = 800, delay = 0) {
  const [value, setValue] = _useState(0);
  const frameRef = _useRef(null);

  _useEffect(() => {
    if (target === 0 || target == null) { setValue(0); return; }

    // Honor reduced-motion: the CSS reduce block can't stop JS number-stepping,
    // so opted-out users would still see the value tick. Jump straight to target.
    if (typeof window !== 'undefined' && window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, delay]);

  return value;
}
