/* ============================================
   TEST INNOVATORS STYLE - PRACTICE TEST LAYOUT

   Copy this ENTIRE file to: src/components/PracticeTestLayout.jsx
   ============================================ */

import React, { useState } from 'react';
import { MathText } from './MathText';
import { colors, typography, radius, shadows } from '../design/tokens';
import { FlagIcon, TimerIcon, ArrowLeftIcon, ArrowRightIcon } from '../design/icons';

/* ============================================
   STYLES - Matches Test Innovators exactly
   ============================================ */
const styles = {
  // Main container
  container: {
    fontFamily: typography.fontFamily,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: colors.surface.gray,
    minHeight: '100vh',
  },

  // Header with test info
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '15px 20px',
    backgroundColor: colors.surface.white,
    borderRadius: radius.sm,
    boxShadow: shadows.sm,
  },

  headerTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text.primary,
  },

  headerInfo: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },

  timer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '18px',
    fontWeight: '600',
    color: colors.semantic.info,
  },

  // Question card
  questionCard: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0',
    backgroundColor: colors.surface.white,
    borderRadius: radius.sm,
    boxShadow: shadows.md,
    overflow: 'hidden',
  },

  // Left side - Question content
  questionSide: {
    padding: '30px',
    borderRight: `1px solid ${colors.surface.grayDark}`,
  },

  questionNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: colors.surface.dark,
    color: colors.text.inverse,
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    marginBottom: '20px',
  },

  questionText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: colors.text.primary,
    marginBottom: '20px',
  },

  diagramContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
  },

  // Right side - Answers
  answerSide: {
    padding: '30px',
    backgroundColor: colors.surface.offWhite,
  },

  // Navigation buttons at top of answer side
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '25px',
  },

  navButton: {
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    border: `1px solid ${colors.surface.grayMedium}`,
    borderRadius: '4px',
    backgroundColor: colors.surface.white,
    color: colors.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  navButtonPrimary: {
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: colors.semantic.info,
    color: colors.text.inverse,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  // Answer choices
  choicesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  choiceItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: `1px solid ${colors.surface.grayDark}`,
    backgroundColor: colors.surface.white,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  choiceItemSelected: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: `2px solid ${colors.semantic.info}`,
    backgroundColor: colors.semantic.infoLight,
    cursor: 'pointer',
  },

  choiceItemCorrect: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: `2px solid ${colors.semantic.success}`,
    backgroundColor: colors.semantic.successLight,
    cursor: 'pointer',
  },

  choiceItemWrong: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: `2px solid ${colors.semantic.error}`,
    backgroundColor: colors.semantic.errorLight,
    cursor: 'pointer',
  },

  choiceLetter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: `2px solid ${colors.surface.grayMedium}`,
    marginRight: '15px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text.secondary,
    flexShrink: 0,
  },

  choiceLetterSelected: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: `2px solid ${colors.semantic.info}`,
    backgroundColor: colors.semantic.info,
    marginRight: '15px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text.inverse,
    flexShrink: 0,
  },

  choiceLetterCorrect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: `2px solid ${colors.semantic.success}`,
    backgroundColor: colors.semantic.success,
    marginRight: '15px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text.inverse,
    flexShrink: 0,
  },

  choiceText: {
    fontSize: '16px',
    color: colors.text.primary,
    flex: 1,
  },

  // Student response percentage (for review mode)
  choicePercent: {
    fontSize: '12px',
    color: colors.text.muted,
    marginLeft: '10px',
  },

  // Flag for later
  flagButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    border: `1px solid ${colors.surface.grayDark}`,
    borderRadius: '6px',
    backgroundColor: colors.surface.white,
    color: colors.text.secondary,
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  flagButtonActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    border: `1px solid ${colors.accent.orange}`,
    borderRadius: '6px',
    backgroundColor: colors.accent.orangeLight,
    color: colors.accent.orangeHover,
    fontSize: '13px',
    cursor: 'pointer',
  },

  // Fill-in-the-blank input
  fillInInput: {
    width: '200px',
    padding: '15px 20px',
    fontSize: '18px',
    textAlign: 'center',
    border: `2px solid ${colors.surface.grayDark}`,
    borderRadius: '6px',
    marginBottom: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },

  correctAnswerLabel: {
    fontSize: '14px',
    color: colors.text.secondary,
    marginTop: '10px',
  },

  correctAnswerValue: {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.semantic.success,
  },

  // Progress bar
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  progressBar: {
    width: '200px',
    height: '6px',
    backgroundColor: colors.surface.grayDark,
    borderRadius: '3px',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.semantic.info,
    transition: 'width 0.3s',
  },

  progressText: {
    fontSize: '14px',
    color: colors.text.secondary,
  },

  // Question navigation dots
  questionDots: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '20px',
    backgroundColor: colors.surface.white,
    borderRadius: radius.sm,
    marginTop: '20px',
    boxShadow: shadows.sm,
  },

  questionDot: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: `1px solid ${colors.surface.grayDark}`,
    backgroundColor: colors.surface.white,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  questionDotCurrent: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: `2px solid ${colors.semantic.info}`,
    backgroundColor: colors.semantic.infoLight,
    fontSize: '13px',
    fontWeight: '600',
    color: colors.semantic.info,
    cursor: 'pointer',
  },

  questionDotAnswered: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: `1px solid ${colors.semantic.success}`,
    backgroundColor: colors.semantic.successLight,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.semantic.success,
    cursor: 'pointer',
  },

  questionDotFlagged: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: `1px solid ${colors.accent.orange}`,
    backgroundColor: colors.accent.orangeLight,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.accent.orangeHover,
    cursor: 'pointer',
  },
};


/* ============================================
   MAIN COMPONENT
   ============================================ */
const PracticeTestLayout = ({
  testTitle = "Practice Test 1",
  module = 1,
  questions = [],
  onComplete,
  showReview = false,  // Set to true after submission to show correct answers
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeRemaining] = useState(35 * 60); // 35 minutes in seconds

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (choiceId) => {
    if (showReview) return; // Can't change answers in review mode
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: choiceId
    }));
  };

  // Handle fill-in-the-blank
  const handleFillInAnswer = (value) => {
    if (showReview) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  // Handle flagging
  const handleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  // Navigation
  const goToQuestion = (index) => setCurrentIndex(index);
  const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, totalQuestions - 1));
  const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  // Get choice style based on state
  const getChoiceStyle = (choiceId) => {
    const isSelected = answers[currentQuestion.id] === choiceId;
    const isCorrect = choiceId === currentQuestion.correctAnswer;

    if (showReview) {
      if (isCorrect) return styles.choiceItemCorrect;
      if (isSelected && !isCorrect) return styles.choiceItemWrong;
    }

    return isSelected ? styles.choiceItemSelected : styles.choiceItem;
  };

  const getLetterStyle = (choiceId) => {
    const isSelected = answers[currentQuestion.id] === choiceId;
    const isCorrect = choiceId === currentQuestion.correctAnswer;

    if (showReview && isCorrect) return styles.choiceLetterCorrect;
    return isSelected ? styles.choiceLetterSelected : styles.choiceLetter;
  };

  // Get dot style
  const getDotStyle = (index) => {
    const q = questions[index];
    if (index === currentIndex) return styles.questionDotCurrent;
    if (flagged[q.id]) return styles.questionDotFlagged;
    if (answers[q.id]) return styles.questionDotAnswered;
    return styles.questionDot;
  };

  if (!currentQuestion) return <div>No questions loaded</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          {testTitle} - Module {module}
        </div>
        <div style={styles.headerInfo}>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(Object.keys(answers).length / totalQuestions) * 100}%`
                }}
              />
            </div>
            <span style={styles.progressText}>
              {Object.keys(answers).length}/{totalQuestions}
            </span>
          </div>
          <div style={styles.timer}>
            <TimerIcon size={18} color={colors.semantic.info} />
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div style={styles.questionCard}>
        {/* Left Side - Question */}
        <div style={styles.questionSide}>
          <div style={styles.questionNumber}>{currentIndex + 1}</div>

          {/* Diagram (if exists) */}
          {currentQuestion.diagram && (
            <div style={styles.diagramContainer}>
              {/* Your diagram component goes here */}
              {/* <QuestionDiagram diagram={currentQuestion.diagram} /> */}
              <div style={{
                width: 300,
                height: 250,
                backgroundColor: colors.surface.offWhite,
                border: `1px solid ${colors.surface.grayMedium}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.text.muted
              }}>
                [Diagram: {currentQuestion.diagram.type}]
              </div>
            </div>
          )}

          {/* Question Text */}
          <div style={styles.questionText}>
            <MathText>{currentQuestion.question}</MathText>
          </div>
        </div>

        {/* Right Side - Answers */}
        <div style={styles.answerSide}>
          {/* Navigation Buttons */}
          <div style={styles.navButtons}>
            <button
              style={styles.navButton}
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <ArrowLeftIcon size={14} color="currentColor" />
              Prev. Question
            </button>
            <button
              style={styles.navButtonPrimary}
              onClick={goNext}
              disabled={currentIndex === totalQuestions - 1}
            >
              Next Question
              <ArrowRightIcon size={14} color="currentColor" />
            </button>
          </div>

          {/* Multiple Choice */}
          {currentQuestion.type !== 'fill-in' && (
            <ul style={styles.choicesList}>
              {currentQuestion.choices.map((choice) => (
                <li
                  key={choice.id}
                  style={getChoiceStyle(choice.id)}
                  onClick={() => handleSelectAnswer(choice.id)}
                >
                  <span style={getLetterStyle(choice.id)}>
                    {choice.id}
                  </span>
                  <span style={styles.choiceText}>
                    <MathText>{choice.text}</MathText>
                  </span>
                  {showReview && currentQuestion.stats && (
                    <span style={styles.choicePercent}>
                      {currentQuestion.stats[choice.id]}%
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Fill in the Blank */}
          {currentQuestion.type === 'fill-in' && (
            <div style={{ textAlign: 'center' }}>
              <input
                type="text"
                style={styles.fillInInput}
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleFillInAnswer(e.target.value)}
                placeholder="Your answer"
                disabled={showReview}
              />
              {showReview && (
                <div>
                  <div style={styles.correctAnswerLabel}>Correct Answer:</div>
                  <div style={styles.correctAnswerValue}>
                    <MathText>{currentQuestion.correctAnswer}</MathText>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Flag Button */}
          <button
            style={flagged[currentQuestion.id] ? styles.flagButtonActive : styles.flagButton}
            onClick={handleFlag}
          >
            <FlagIcon size={16} color={flagged[currentQuestion.id] ? colors.accent.orangeHover : colors.text.secondary} />
            {flagged[currentQuestion.id] ? 'Flagged for Review' : 'Flag for Later'}
          </button>
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div style={styles.questionDots}>
        {questions.map((q, index) => (
          <div
            key={q.id}
            style={getDotStyle(index)}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeTestLayout;


/* ============================================
   USAGE EXAMPLE
   ============================================

import PracticeTestLayout from './components/PracticeTestLayout';
import { practiceTest1 } from './data/practiceTest1';

function App() {
  return (
    <PracticeTestLayout
      testTitle="Practice Test 1"
      module={1}
      questions={practiceTest1.module1}
      showReview={false}
    />
  );
}

============================================ */
