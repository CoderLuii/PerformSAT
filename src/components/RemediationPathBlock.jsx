/**
 * RemediationPathBlock — "Your Learning Path"
 *
 * Renders the top weakness-to-lesson connections as action cards.
 * Each card: [Weakness] → [Lesson] → [Practice] → [+pts]
 *
 * Placed in the primary layer of the diagnostic view so students
 * see the action before the detailed diagnosis.
 */

import React from 'react';
import { ArrowRightIcon, BookOpenIcon, PencilIcon } from '../design/icons';

const SEVERITY_DOT = {
  critical: '#dc2626',
  significant: '#f59e0b',
  moderate: '#f59e0b',
  warning: '#f59e0b',
};

const RemediationPathBlock = ({ items, onNavigateToModule }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ padding: '36px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 36px', marginBottom: '8px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'var(--color-brand-orange-100, #fff7ed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-brand-orange-600)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: '700',
          color: 'var(--color-slate-900)', letterSpacing: '-0.02em', margin: 0,
        }}>
          Your Learning Path
        </h3>
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-slate-500)', padding: '0 36px', marginBottom: '8px' }}>
        Fix these to recover the most points:
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 36px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{
            background: '#fff', borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            padding: '20px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Severity accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
              background: SEVERITY_DOT[item.severity] || SEVERITY_DOT.moderate,
            }} />

            {/* Card content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Header: weakness name + estimated gain */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--color-brand-orange-100, #fff7ed)',
                    color: 'var(--color-brand-orange-600)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '800', flexShrink: 0,
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: '16px', fontWeight: '600',
                    color: 'var(--color-slate-900)', lineHeight: '1.4',
                  }}>
                    {item.weaknessName}
                  </div>
                </div>
                {item.estimatedGain && (
                  <div style={{
                    flexShrink: 0, padding: '4px 10px', borderRadius: '8px',
                    background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
                    fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: '700',
                    color: '#16a34a', whiteSpace: 'nowrap',
                  }}>
                    +{item.estimatedGain} pts
                  </div>
                )}
              </div>

              {/* Steps flow */}
              <div className="remediation-steps-flow">
                {item.steps.map((step, si) => (
                  <React.Fragment key={si}>
                    {si > 0 && (
                      <div className="remediation-arrow">
                        <ArrowRightIcon size={14} color="var(--color-slate-300)" />
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (onNavigateToModule) {
                          onNavigateToModule(step.moduleId);
                        } else {
                          console.warn('RemediationPathBlock: onNavigateToModule not provided');
                        }
                      }}
                      disabled={!onNavigateToModule}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 14px', borderRadius: '10px',
                        border: 'none', cursor: onNavigateToModule ? 'pointer' : 'default',
                        background: step.type === 'lesson'
                          ? 'var(--color-brand-orange-500, #f97316)'
                          : 'var(--color-slate-100)',
                        color: step.type === 'lesson' ? '#fff' : 'var(--color-slate-700)',
                        fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: '600',
                        transition: 'all 0.2s ease',
                        opacity: onNavigateToModule ? 1 : 0.5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step.type === 'lesson' ? <BookOpenIcon size={15} /> : <PencilIcon size={15} />}
                      <span>{step.label}</span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemediationPathBlock;
