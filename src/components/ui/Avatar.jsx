import React, { useState } from 'react';
import { radius, typography } from '../../design/tokens';

/**
 * Preset avatar sizes — one scale, all consumers on it.
 * sidebar/sm lists = sm, plan-hero/results/diagnostic = md,
 * home-dashboard hero = lg, Profile hero = xl.
 */
export const AVATAR_SIZES = { sm: 24, md: 36, lg: 56, xl: 88 };

/**
 * Avatar — the student's face everywhere in the app.
 *
 * Renders the uploaded profile photo (`user.photoDataUrl`, a small data-URL
 * JPEG stored on the user doc) when present, otherwise the familiar
 * first-initial circle. One component so the sidebar, profile hero, and any
 * future surface stay visually in sync.
 *
 * A corrupt/truncated photoDataUrl falls back to the initial circle via
 * onError — never a broken-image glyph. The dataUrl renders ONLY inside
 * an <img src>; never interpolate it into markup.
 *
 * @param {object} props
 * @param {object} props.user - needs firstName/email and optional photoDataUrl
 * @param {number} [props.size] - px square (prefer AVATAR_SIZES presets)
 * @param {string} [props.background] - CSS background for the initial fallback
 * @param {number} [props.fontSize] - initial-letter size, defaults to size*0.4
 */
const Avatar = ({ user, size = AVATAR_SIZES.md, background = 'var(--color-brand-primary)', fontSize }) => {
  // Per-src error tracking: if THIS dataUrl failed to decode, fall back to
  // initials. A later photo change (new src) gets a fresh attempt.
  const [failedSrc, setFailedSrc] = useState(null);
  // `||` (not `??`) is load-bearing: an empty-string firstName must fall
  // through to email; the trailing literal guards name[0] from ever crashing.
  const name = user?.firstName || user?.email || 'Student';
  const common = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: radius.full,
    flexShrink: 0,
  };

  const showPhoto = user?.photoDataUrl && user.photoDataUrl !== failedSrc;

  if (showPhoto) {
    return (
      <img
        src={user.photoDataUrl}
        alt={`Avatar for ${name}`}
        onError={() => setFailedSrc(user.photoDataUrl)}
        style={{ ...common, objectFit: 'cover', display: 'block' }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Avatar for ${name}`}
      style={{
        ...common,
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: `${fontSize || Math.round(size * 0.4)}px`,
        fontWeight: typography.weights.bold,
      }}
    >
      {(name || 'S')[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
