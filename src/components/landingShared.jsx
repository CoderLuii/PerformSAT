/**
 * landingShared — the few presentational bits both landing pages render, kept
 * in one module so neither page imports the other (a cycle) and neither
 * duplicates the markup.
 *
 * `svgBase` is the stroke-icon default attribute set; `Avatar` is the
 * testimonial portrait that shows initials until the real photo in
 * public/testimonials/ loads (and shows them again if it 404s).
 */
import React from 'react';

/** Shared <svg> defaults for stroke (line) icons. */
export const svgBase = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

/**
 * Testimonial avatar: renders the student's initials, then overlays their
 * photo from public/testimonials/ when it exists. onError hides a missing
 * photo so we never flash a broken-image icon before the real photos land.
 *
 * @param {{ src: string, name: string, size?: number }} props
 */
export const Avatar = ({ src, name, size = 46 }) => {
  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span className="lp-avatar" style={{ width: size, height: size }} aria-hidden="true">
      {initials}
      <img className="lp-avatar-img" src={src} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    </span>
  );
};
