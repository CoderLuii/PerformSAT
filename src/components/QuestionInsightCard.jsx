/**
 * QuestionInsightCard — Expandable per-question trap/approach card
 *
 * Shows what trap the student fell into on a specific question
 * and the correct approach to solve it. Collapsed by default.
 */

import React, { useState } from 'react';
import { MathText } from './MathText';
import { ChevronDownIcon, ChevronUpIcon } from '../design/icons';

const TRAP_TYPE_LABELS = {
  partial_calculation: 'Partial Calculation Trap',
  sign_error: 'Sign Error',
  misread_stem: 'Misread Question',
  wrong_formula: 'Wrong Formula',
  unit_confusion: 'Unit Confusion',
  distractor: 'Distractor Answer',
  conceptual_misunderstanding: 'Conceptual Gap',
  unknown: 'Error Pattern',
};

const QuestionInsightCard = ({ insight, questionLabel }) => {
  const [expanded, setExpanded] = useState(false);

  if (!insight) return null;

  const trapLabel = TRAP_TYPE_LABELS[insight.trapType] || TRAP_TYPE_LABELS.unknown;

  return (
    <div style={{
      borderRadius: '12px', border: '1px solid var(--color-slate-100)',
      background: '#fff', overflow: 'hidden',
      transition: 'box-shadow 0.2s ease',
      boxShadow: expanded ? '0 4px 16px rgba(0,0,0,0.06)' : '0 1px 4px rgba(0,0,0,0.02)',
    }}>
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '12px 16px', border: 'none', background: 'none',
          cursor: 'pointer', gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: '700',
            color: 'var(--color-slate-500)', fontVariantNumeric: 'tabular-nums',
          }}>
            {questionLabel}
          </span>
          <span style={{
            padding: '2px 8px', borderRadius: '6px',
            background: 'rgba(147, 51, 234, 0.08)',
            fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '600',
            color: '#9333ea',
          }}>
            {trapLabel}
          </span>
        </div>
        {expanded ? <ChevronUpIcon size={16} color="var(--color-slate-400)" /> : <ChevronDownIcon size={16} color="var(--color-slate-400)" />}
      </button>

      {/* Expanded content */}
      <div className={`diag-collapsible${expanded ? ' diag-expanded' : ''}`}>
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {insight.trapExplanation && (
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-slate-400)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                What happened
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-slate-700)', lineHeight: '1.5' }}>
                <MathText>{insight.trapExplanation}</MathText>
              </div>
            </div>
          )}
          {insight.correctApproach && (
            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--color-success-50, #f0fdf4)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-success-700, #15803d)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                How to solve it
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-success-800, #166534)', lineHeight: '1.5' }}>
                <MathText>{insight.correctApproach}</MathText>
              </div>
            </div>
          )}
          {/* Review-skill button removed — used to link into the legacy
              LearnWorkspace lesson reader, which is gone. */}
        </div>
      </div>
    </div>
  );
};

export default QuestionInsightCard;
