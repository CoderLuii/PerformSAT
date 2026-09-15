import React, { useState } from 'react';
import SolutionExplanation from './SolutionExplanation';
import { MathText } from './MathText';
import { colors, typography, shadows } from '../design/tokens';
import { CheckIcon, CrossIcon } from '../design/icons';

const PracticeLesson = ({ lesson, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]); // Track all answers for results
  const [showResults, setShowResults] = useState(false);

  const questions = lesson.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleSelectAnswer = (choiceId) => {
    if (hasSubmitted) return;
    setSelectedAnswer(choiceId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || hasSubmitted) return;
    setHasSubmitted(true);
    setAnswers([...answers, {
      questionId: currentQuestion.id,
      selected: selectedAnswer,
      correct: currentQuestion.correctAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer
    }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setAnswers([]);
    setShowResults(false);
  };

  const correctCount = answers.filter(a => a.isCorrect).length;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Results View
  if (showResults) {
    return (
      <div style={{
        fontFamily: typography.fontFamily,
        maxWidth: '700px',
        margin: '0 auto',
        padding: '40px 20px',
      }}>
        <div style={{
          background: colors.surface.white,
          borderRadius: '24px',
          padding: '48px',
          boxShadow: shadows.lg,
          textAlign: 'center',
        }}>
          {/* Score Circle */}
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: scorePercentage >= 80
              ? `linear-gradient(135deg, ${colors.semantic.success}, ${colors.semantic.success})`
              : scorePercentage >= 60
                ? `linear-gradient(135deg, ${colors.accent.orange}, ${colors.accent.orange})`
                : `linear-gradient(135deg, ${colors.semantic.error}, ${colors.semantic.error})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}>
            <span style={{
              fontSize: '42px',
              fontWeight: '700',
              color: 'white',
              lineHeight: '1',
            }}>
              {correctCount}/{totalQuestions}
            </span>
            <span style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
              marginTop: '4px',
            }}>
              correct
            </span>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: colors.text.primary,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            {scorePercentage >= 80 ? 'Excellent!' : scorePercentage >= 60 ? 'Good effort!' : 'Keep practicing!'}
          </h2>
          <p style={{
            fontSize: '17px',
            color: colors.text.secondary,
            margin: '0 0 40px',
          }}>
            {scorePercentage >= 80
              ? "You've mastered this topic."
              : scorePercentage >= 60
                ? "You're getting there. Review the explanations below."
                : "Review the video lesson and try again."}
          </p>

          {/* Missed Questions Review */}
          {answers.some(a => !a.isCorrect) && (
            <div style={{
              textAlign: 'left',
              marginBottom: '32px',
              padding: '24px',
              background: colors.surface.gray,
              borderRadius: '16px',
            }}>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                color: colors.text.secondary,
                margin: '0 0 16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Review Missed Questions
              </h3>
              {answers.filter(a => !a.isCorrect).map((answer, idx) => {
                const q = questions.find(q => q.id === answer.questionId);
                return (
                  <div key={idx} style={{
                    padding: '16px 0',
                    borderBottom: idx < answers.filter(a => !a.isCorrect).length - 1
                      ? `1px solid ${colors.surface.grayDark}`
                      : 'none',
                  }}>
                    <p style={{
                      fontSize: '15px',
                      color: colors.text.primary,
                      margin: '0 0 8px',
                      fontWeight: '500',
                    }}>
                      <MathText>{q?.question}</MathText>
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: colors.text.secondary,
                      margin: '0',
                    }}>
                      <span style={{ color: colors.semantic.error }}>Your answer: <MathText>{answer.selected}</MathText></span>
                      {' | '}
                      <span style={{ color: colors.semantic.success }}>Correct: <MathText>{answer.correct}</MathText></span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={handleTryAgain}
              style={{
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                color: colors.text.primary,
                background: colors.surface.gray,
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = colors.surface.grayMedium}
              onMouseOut={(e) => e.currentTarget.style.background = colors.surface.gray}
            >
              Try Again
            </button>
            <button
              onClick={onComplete}
              style={{
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: colors.accent.orange,
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question View
  return (
    <div style={{
      fontFamily: typography.fontFamily,
      maxWidth: '700px',
      margin: '0 auto',
      padding: '20px',
    }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: colors.text.secondary,
          }}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span style={{
            fontSize: '14px',
            color: colors.text.muted,
          }}>
            {answers.filter(a => a.isCorrect).length} correct so far
          </span>
        </div>
        <div style={{
          height: '6px',
          background: colors.surface.gray,
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((currentQuestionIndex + (hasSubmitted ? 1 : 0)) / totalQuestions) * 100}%`,
            background: colors.accent.orange,
            borderRadius: '3px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{
        background: colors.surface.white,
        borderRadius: '20px',
        padding: '32px',
        boxShadow: shadows.md,
        marginBottom: '24px',
      }}>
        {/* Question Text */}
        <p style={{
          fontSize: '19px',
          fontWeight: '500',
          color: colors.text.primary,
          lineHeight: '1.6',
          margin: '0 0 28px',
        }}>
          <MathText>{currentQuestion?.question}</MathText>
        </p>

        {/* Answer Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentQuestion?.choices.map((choice) => {
            const isSelected = selectedAnswer === choice.id;
            const isCorrectChoice = choice.id === currentQuestion.correctAnswer;

            let backgroundColor = colors.surface.gray;
            let borderColor = 'transparent';
            let textColor = colors.text.primary;

            if (hasSubmitted) {
              if (isCorrectChoice) {
                backgroundColor = 'rgba(52, 199, 89, 0.12)';
                borderColor = colors.semantic.success;
                textColor = colors.semantic.success;
              } else if (isSelected && !isCorrectChoice) {
                backgroundColor = 'rgba(255, 59, 48, 0.12)';
                borderColor = colors.semantic.error;
                textColor = colors.semantic.error;
              }
            } else if (isSelected) {
              backgroundColor = 'rgba(234, 88, 12, 0.12)';
              borderColor = colors.accent.orange;
            }

            return (
              <button
                key={choice.id}
                onClick={() => handleSelectAnswer(choice.id)}
                disabled={hasSubmitted}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '14px',
                  cursor: hasSubmitted ? 'default' : 'pointer',
                  textAlign: 'left',
                  fontFamily: typography.fontFamily,
                  transition: 'all 0.2s ease',
                  opacity: hasSubmitted && !isSelected && !isCorrectChoice ? 0.5 : 1,
                }}
                onMouseOver={(e) => {
                  if (!hasSubmitted && !isSelected) {
                    e.currentTarget.style.background = colors.surface.grayDark;
                  }
                }}
                onMouseOut={(e) => {
                  if (!hasSubmitted && !isSelected) {
                    e.currentTarget.style.background = colors.surface.gray;
                  }
                }}
              >
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isSelected || (hasSubmitted && isCorrectChoice)
                    ? (hasSubmitted
                        ? (isCorrectChoice ? colors.semantic.success : colors.semantic.error)
                        : colors.accent.orange)
                    : colors.surface.white,
                  border: `2px solid ${isSelected || (hasSubmitted && isCorrectChoice)
                    ? 'transparent'
                    : colors.surface.grayMedium}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isSelected || (hasSubmitted && isCorrectChoice)
                    ? 'white'
                    : colors.text.secondary,
                  flexShrink: 0,
                }}>
                  {hasSubmitted && isCorrectChoice ? <CheckIcon size={16} color="currentColor" /> :
                   hasSubmitted && isSelected && !isCorrectChoice ? <CrossIcon size={16} color="currentColor" /> :
                   choice.id}
                </span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: textColor,
                }}>
                  <MathText>{choice.text}</MathText>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation (shown after submit) */}
      {hasSubmitted && currentQuestion?.explanation && (
        <div style={{
          background: isCorrect
            ? 'rgba(52, 199, 89, 0.08)'
            : 'rgba(255, 59, 48, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          borderLeft: `4px solid ${isCorrect ? colors.semantic.success : colors.semantic.error}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px',
          }}>
            <span style={{
              fontSize: '18px',
            }}>
              {isCorrect ? <CheckIcon size={18} color="currentColor" /> : <CrossIcon size={18} color="currentColor" />}
            </span>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isCorrect ? colors.semantic.success : colors.semantic.error,
            }}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <SolutionExplanation explanation={currentQuestion.explanation} />
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: selectedAnswer ? 'white' : colors.text.muted,
              background: selectedAnswer
                ? colors.accent.orange
                : colors.surface.gray,
              border: 'none',
              borderRadius: '12px',
              cursor: selectedAnswer ? 'pointer' : 'default',
              fontFamily: typography.fontFamily,
              transition: 'all 0.2s ease',
              boxShadow: selectedAnswer ? '0 4px 14px rgba(234, 88, 12, 0.35)' : 'none',
            }}
            onMouseOver={(e) => {
              if (selectedAnswer) e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: colors.accent.orange,
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeLesson;
