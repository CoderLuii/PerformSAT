import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, radius, transitions, zIndex } from '../../design/tokens';
import { injectAnimations } from '../../design/animations';
import { useViewport } from '../../hooks/useViewport';
import Wordmark from './Wordmark';
import Mark from './Mark';
import Avatar from './Avatar';

// Navigation items.
//
// `mobileLabel` (optional) is the SHORT form shown only in the mobile bottom tab
// bar, where seven items share a 390px phone. The full `label` stays the
// accessible name (aria-label) and the desktop/tablet/header text, so the
// accessible name still contains the visible one.
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', route: '/app', icon: HomeIcon },
  { id: 'learnTab', label: 'Learn', route: '/app/learn', icon: OpenBookIcon },
  { id: 'modules', label: 'Videos', route: '/app/videos', icon: BookIcon },
  { id: 'practiceTests', label: 'Tests', route: '/app/tests', icon: ClockIcon },
  { id: 'practiceBank', label: 'Practice', route: '/app/practice-bank', icon: TargetIcon },
  { id: 'studyPlan', label: 'Study Plan', mobileLabel: 'Plan', route: '/app/study-plan', icon: StudyPlanIcon },
  { id: 'profile', label: 'Profile', route: '/app/profile', icon: PersonIcon },
];

// COLOR = FUNCTION: tint each nav item by its destination domain so the chrome
// itself reads tri-color. Orange = Home/actions, Purple = Study Plan / focus /
// insights, Green = Practice / mastery, neutral (white) = Tests / Profile.
const NAV_DOMAIN_COLORS = {
  dashboard: 'var(--color-brand-primary)',   // Home → orange
  learnTab: 'var(--color-brand-purple)',      // Learn (textbook / focus) → purple
  modules: 'var(--color-brand-green)',        // Videos (learning) → green
  practiceTests: 'var(--color-white)',        // Tests → neutral
  practiceBank: 'var(--color-brand-green)',   // Practice → green
  studyPlan: 'var(--color-brand-purple)',     // Study Plan → purple
  profile: 'var(--color-white)',              // Profile → neutral
};

// Faint, navy-readable tint of each domain color for hover/active backgrounds.
const NAV_DOMAIN_TINTS = {
  dashboard: 'rgba(234, 88, 12, 0.18)',   // orange tint
  learnTab: 'rgba(176, 146, 221, 0.20)',  // lavender tint
  modules: 'rgba(198, 244, 50, 0.16)',    // lime tint
  practiceTests: 'rgba(255, 255, 255, 0.10)', // neutral white overlay
  practiceBank: 'rgba(198, 244, 50, 0.16)',   // lime tint
  studyPlan: 'rgba(176, 146, 221, 0.20)',     // lavender tint
  profile: 'rgba(255, 255, 255, 0.10)',       // neutral white overlay
};

// AA-safe domain colors for the LIGHT mobile tab bar (vivid fills become -text
// variants so the active icon/label stays legible on the frosted-white surface).
const NAV_DOMAIN_COLORS_ON_LIGHT = {
  dashboard: 'var(--color-brand-primary)',     // Home → orange
  learnTab: 'var(--color-brand-purple-text)',   // Learn → AA purple text
  modules: 'var(--color-brand-green-text)',     // Videos → AA green text
  practiceTests: 'var(--color-brand-navy)',     // Tests → neutral navy
  practiceBank: 'var(--color-brand-green-text)',// Practice → AA green text
  studyPlan: 'var(--color-brand-purple-text)',  // Study Plan → AA purple text
  profile: 'var(--color-brand-navy)',           // Profile → neutral navy
};

function HomeIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BookIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function OpenBookIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ClockIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TargetIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function StudyPlanIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function PersonIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const AppShell = ({ children, currentView, onNavigate, user, onLogout, hideNav = false }) => {
  const { isMobile, isTablet, isDesktop, isCoarsePointer } = useViewport();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  // On touch devices there is no hover, so the hover-to-expand tablet rail
  // would strand every nav label out of reach. In that case we render a
  // permanently labeled compact rail (icon + label stacked) instead.
  const tabletLabelsStacked = isTablet && isCoarsePointer;
  const railExpanded = sidebarExpanded && !isCoarsePointer;

  useEffect(() => { injectAnimations(); }, []);

  // Hide navigation during test-taking
  if (hideNav) {
    return <>{children}</>;
  }

  const activeNavId = currentView === 'list' || currentView === 'lesson' || currentView === 'practice'
    ? 'modules'
    : currentView === 'learnChapter'
    ? 'learnTab'
    : currentView === 'takingTest'
    ? 'practiceTests'
    : currentView === 'diagnosticReport'
    ? 'practiceTests'
    : currentView;

  const handleNavClick = (item) => {
    onNavigate(item.id);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: typography.fontFamily,
      backgroundColor: colors.surface.offWhite,
    }}>
      {/* Desktop Sidebar */}
      {isDesktop && (
        <aside role="navigation" aria-label="Desktop navigation" style={{
          width: '240px',
          backgroundColor: 'var(--color-brand-navy)',
          borderRight: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: zIndex.sticky,
          transition: `width ${transitions.normal}`,
        }}>
          {/* Logo */}
          <div style={{
            padding: `${spacing.xl} ${spacing.xl} ${spacing.lg}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
            onClick={() => onNavigate('dashboard')}
          >
            <Wordmark size="lg" tone="light" />
          </div>

          {/* Nav Items */}
          <nav aria-label="Main navigation" style={{ flex: 1, padding: `0 ${spacing.md}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {NAV_ITEMS.map(item => {
              const isActive = activeNavId === item.id;
              const Icon = item.icon;
              const domainColor = NAV_DOMAIN_COLORS[item.id] || 'var(--color-white)';
              const domainTint = NAV_DOMAIN_TINTS[item.id] || 'rgba(255, 255, 255, 0.10)';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                    padding: `${spacing.sm} ${spacing.md}`,
                    borderRadius: radius.md,
                    border: 'none',
                    background: isActive ? domainTint : 'transparent',
                    boxShadow: isActive ? `inset 3px 0 0 0 ${domainColor}` : 'none',
                    cursor: 'pointer',
                    transition: `all ${transitions.fast}`,
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <Icon color={isActive ? domainColor : 'var(--color-slate-400)'} />
                  <span style={{
                    fontSize: typography.sizes.base,
                    fontWeight: isActive ? typography.weights.semibold : typography.weights.medium,
                    color: isActive ? 'var(--color-white)' : 'var(--color-slate-400)',
                  }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* User section at bottom */}
          {user && (
            <div style={{
              padding: spacing.lg,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
            }}>
              <Avatar user={user} size={36} fontSize={14} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.medium,
                  color: 'var(--color-white)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {user.firstName || 'Student'}
                </div>
                {/* ph-no-capture: keep the email out of PostHog session replays */}
                <div className="ph-no-capture" style={{
                  fontSize: typography.sizes.xs,
                  color: 'var(--color-slate-400)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {user.email}
                </div>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Tablet Side Rail */}
      {isTablet && (
        <aside
          role="navigation"
          aria-label="Tablet navigation"
          onMouseEnter={isCoarsePointer ? undefined : () => setSidebarExpanded(true)}
          onMouseLeave={isCoarsePointer ? undefined : () => setSidebarExpanded(false)}
          style={{
            width: railExpanded ? '240px' : '72px',
            backgroundColor: 'var(--color-brand-navy)',
            borderRight: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: zIndex.sticky,
            transition: `width ${transitions.normal}`,
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <div style={{
            padding: `${spacing.lg} ${railExpanded ? spacing.lg : spacing.md}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            justifyContent: railExpanded ? 'flex-start' : 'center',
          }}
            onClick={() => onNavigate('dashboard')}
          >
            {railExpanded
              ? <Wordmark size="lg" tone="light" />
              : <Mark size={30} />}
          </div>

          {/* Nav Items */}
          <nav aria-label="Main navigation" style={{ flex: 1, padding: `${spacing.sm} ${spacing.xs}`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map(item => {
              const isActive = activeNavId === item.id;
              const Icon = item.icon;
              const domainColor = NAV_DOMAIN_COLORS[item.id] || 'var(--color-white)';
              const domainTint = NAV_DOMAIN_TINTS[item.id] || 'rgba(255, 255, 255, 0.10)';
              const showLabel = railExpanded || tabletLabelsStacked;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  title={showLabel ? undefined : item.label}
                  style={{
                    display: 'flex',
                    flexDirection: tabletLabelsStacked ? 'column' : 'row',
                    alignItems: 'center',
                    gap: tabletLabelsStacked ? '3px' : spacing.sm,
                    padding: tabletLabelsStacked
                      ? `${spacing.sm} 2px`
                      : `${spacing.sm} ${railExpanded ? spacing.md : '0'}`,
                    borderRadius: radius.md,
                    border: 'none',
                    background: isActive ? domainTint : 'transparent',
                    boxShadow: isActive ? `inset 3px 0 0 0 ${domainColor}` : 'none',
                    cursor: 'pointer',
                    transition: `all ${transitions.fast}`,
                    width: '100%',
                    justifyContent: railExpanded ? 'flex-start' : 'center',
                  }}
                >
                  <Icon color={isActive ? domainColor : 'var(--color-slate-400)'} />
                  {showLabel && (
                    <span style={{
                      fontSize: tabletLabelsStacked ? '10px' : typography.sizes.base,
                      fontWeight: isActive ? typography.weights.semibold : typography.weights.medium,
                      color: isActive ? 'var(--color-white)' : 'var(--color-slate-400)',
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                    }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        marginLeft: isDesktop ? '240px' : isTablet ? '72px' : 0,
        marginBottom: isMobile ? '56px' : 0,
        minHeight: '100vh',
        transition: `margin-left ${transitions.normal}`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Desktop/Tablet Header */}
        {!isMobile && !hideNav && (
          <header style={{
            height: '64px',
            padding: `0 ${spacing.xl}`,
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${colors.surface.grayDark}`,
            backgroundColor: 'var(--color-white)',
            position: 'sticky',
            top: 0,
            zIndex: zIndex.sticky - 1,
          }}>
            <h1 style={{
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.semibold,
              color: colors.text.primary,
              margin: 0,
            }}>
              {NAV_ITEMS.find(item => item.id === activeNavId)?.label || 'SEVA'}
            </h1>
          </header>
        )}

        {/* Mobile Header */}
        {isMobile && (
          <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '56px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.surface.grayDark}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: zIndex.sticky,
          }}>
            <Wordmark size="md" tone="dark" />
          </header>
        )}

        {/* Content */}
        <div style={{
          paddingTop: isMobile ? '56px' : 0,
        }}>
          {children}
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      {isMobile && (
        <nav
          aria-label="Mobile navigation"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '56px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: `1px solid ${colors.surface.grayDark}`,
            // SEVEN items on a 390px phone. A flex row of min-width:56px
            // buttons measures 392px and pushes Profile off-screen, which
            // scrolls every page sideways. Equal fractional tracks that are
            // allowed to shrink below their content (minmax(0, 1fr)) pin the
            // bar to exactly the viewport width at any phone size.
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            alignItems: 'stretch',
            zIndex: zIndex.sticky,
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {NAV_ITEMS.map(item => {
            const isActive = activeNavId === item.id;
            const Icon = item.icon;
            const domainColor = NAV_DOMAIN_COLORS_ON_LIGHT[item.id] || 'var(--color-brand-primary)';
            return (
              <button
                key={item.id}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                onClick={() => handleNavClick(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '6px 2px',
                  // A grid item's automatic minimum is its content width, which
                  // would re-widen the bar; 0 lets the track govern instead.
                  minWidth: 0,
                  width: '100%',
                  minHeight: '44px',   // touch target
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  transition: `all ${transitions.fast}`,
                }}
              >
                <Icon color={isActive ? domainColor : 'var(--color-slate-400)'} />
                <span style={{
                  fontSize: '10px',
                  fontWeight: isActive ? typography.weights.semibold : typography.weights.medium,
                  color: isActive ? domainColor : 'var(--color-slate-500)',
                  lineHeight: 1,
                  // One line, always: a wrapped "Study Plan" made its button
                  // 60px tall inside a 56px bar. Anything still too long
                  // ellipsises rather than widening the track.
                  maxWidth: '100%',
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.mobileLabel || item.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export { useViewport };
export default AppShell;
