import React from 'react';
import { skillTaxonomy } from '../data/skillTaxonomy';
import { colors, radius } from '../design/tokens';
import { cardStyles } from '../design/components';
import { WarningIcon, CheckIcon } from '../design/icons';

/**
 * Quick summary card showing skill-based strengths and weaknesses
 * Displays overall mastery, focus areas, and strong skills
 */
const SkillDiagnosticSummary = ({ diagnosticSummary, onPracticeSkill }) => {
  if (!diagnosticSummary || diagnosticSummary.totalSkillsAttempted === 0) {
    return (
      <div style={cardStyles.subtle}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text.primary, marginBottom: '12px' }}>
          Skill Diagnostic
        </h3>
        <p style={{ fontSize: '14px', color: colors.text.secondary }}>
          Complete some practice questions to see your skill breakdown.
        </p>
      </div>
    );
  }

  const { overallMastery, weakSkills, strongSkills, domainProgress } = diagnosticSummary;

  // Get mastery color
  const getMasteryColor = (mastery) => {
    if (mastery >= 80) return colors.semantic.success;
    if (mastery >= 60) return colors.accent.orange;
    return colors.semantic.error;
  };

  return (
    <div style={cardStyles.subtle}>
      {/* Header with overall readiness */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text.primary, margin: 0 }}>
          SAT Math Readiness
        </h3>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: getMasteryColor(overallMastery)
        }}>
          {overallMastery}%
        </div>
      </div>

      {/* Domain progress bars */}
      <div style={{ marginBottom: '20px' }}>
        {Object.entries(domainProgress).map(([domainId, progress]) => {
          const domain = skillTaxonomy.domains[domainId];
          if (!domain || progress.skillsAttempted === 0) return null;

          return (
            <div key={domainId} style={{ marginBottom: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px'
              }}>
                <span style={{ fontSize: '13px', color: colors.text.secondary, fontWeight: '500' }}>
                  {domain.name}
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: getMasteryColor(progress.avgMastery)
                }}>
                  {progress.avgMastery}%
                </span>
              </div>
              <div style={{
                height: '6px',
                background: colors.surface.grayDark,
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress.avgMastery}%`,
                  background: domain.color,
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weak skills - Focus areas */}
      {weakSkills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <WarningIcon size={16} color={colors.semantic.error} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: colors.semantic.error }}>
              Focus Areas ({weakSkills.length} skill{weakSkills.length !== 1 ? 's' : ''})
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {weakSkills.slice(0, 3).map((item) => (
              <div
                key={item.skillId}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  background: colors.semantic.errorLight,
                  borderRadius: radius.sm,
                  cursor: onPracticeSkill ? 'pointer' : 'default'
                }}
                onClick={() => onPracticeSkill && onPracticeSkill(item.skillId)}
              >
                <span style={{ fontSize: '13px', color: colors.semantic.error }}>
                  {item.skill?.name || item.skillId}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: colors.semantic.error
                  }}>
                    {item.mastery}%
                  </span>
                  {onPracticeSkill && (
                    <span style={{
                      fontSize: '12px',
                      color: colors.semantic.error,
                      padding: '2px 8px',
                      background: colors.semantic.errorBg,
                      borderRadius: '4px'
                    }}>
                      Practice
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strong skills */}
      {strongSkills.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <CheckIcon size={16} color={colors.semantic.success} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: colors.semantic.success }}>
              Strengths ({strongSkills.length} skill{strongSkills.length !== 1 ? 's' : ''})
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {strongSkills.slice(0, 5).map((item) => (
              <span
                key={item.skillId}
                style={{
                  fontSize: '12px',
                  color: colors.semantic.success,
                  background: colors.semantic.successBg,
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}
              >
                {item.skill?.name || item.skillId} - {item.mastery}%
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDiagnosticSummary;
