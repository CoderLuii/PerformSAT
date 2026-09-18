import React, { useMemo, useRef, useEffect } from 'react';
import LearnRail from './LearnRail';
import AiTutorChat from '../AiTutorChat';
import { renderRichText } from '../RichMathText';
import ContentTabRenderer from './ContentTabRenderer';
import { PrimaryButton } from '../ui/Button';
import { getContentTabForLesson } from '../../data/contentTabs/lessonContentIndex';
import './LearnWorkspace.css';

const LearnWorkspace = ({
  moduleId,
  moduleLessons,
  moduleTitle,
  activeLessonId,
  onSelectLesson,
  onBack,
  onMarkComplete,
  isLessonCompleted,
  moduleProgress,
  renderLessonContent,
  videoTranscript,
  videoTimestamp,
  currentLesson,
}) => {
  const stageRef = useRef(null);
  const prevLessonId = useRef(activeLessonId);
  const contentTab = getContentTabForLesson(moduleId, activeLessonId);

  useEffect(() => {
    if (prevLessonId.current !== activeLessonId && stageRef.current) {
      stageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevLessonId.current = activeLessonId;
  }, [activeLessonId]);

  const { prevLesson, nextLesson } = useMemo(() => {
    const idx = moduleLessons.findIndex(l => l.id === activeLessonId);
    return {
      currentIndex: idx,
      prevLesson: idx > 0 ? moduleLessons[idx - 1] : null,
      nextLesson: idx < moduleLessons.length - 1 ? moduleLessons[idx + 1] : null,
    };
  }, [moduleLessons, activeLessonId]);

  const handlePrev = () => {
    if (prevLesson) onSelectLesson(prevLesson.id);
  };

  const handleNext = () => {
    if (nextLesson) onSelectLesson(nextLesson.id);
  };

  const handleMarkCompleteAndNext = () => {
    onMarkComplete(moduleId, activeLessonId);
    if (nextLesson) onSelectLesson(nextLesson.id);
  };

  const isCompleted = isLessonCompleted(moduleId, activeLessonId);
  const isVideoLesson = currentLesson?.type === 'video';

  return (
    <div className="learn-workspace">
      {/* LEFT: Course Rail */}
      <LearnRail
        moduleLessons={moduleLessons}
        moduleTitle={moduleTitle}
        activeLessonId={activeLessonId}
        onSelectLesson={onSelectLesson}
        onBack={onBack}
        isLessonCompleted={isLessonCompleted}
        moduleId={moduleId}
        moduleProgress={moduleProgress}
      />

      {/* CENTER: Lesson Stage */}
      <div className="lesson-stage" ref={stageRef}>
        {currentLesson && (
          <>
            {/* Header */}
            <div className="lesson-stage__header">
              {currentLesson.hero?.tagline && (
                <span className="lesson-stage__tagline">{currentLesson.hero.tagline}</span>
              )}
              <h1 className="lesson-stage__title">{currentLesson.title}</h1>
              {currentLesson.hero?.subtitle && (
                <p className="lesson-stage__subtitle">{currentLesson.hero.subtitle}</p>
              )}
            </div>

            {/* Video player (if video lesson). Uses a plain YouTube
                embed iframe — the legacy YT iframe-API integration
                (with transcript sync) was removed when the lesson-reader
                flow was excised. Embed is sufficient for play/pause and
                can be upgraded later if transcript sync is needed. */}
            {isVideoLesson && currentLesson.videoId && (
              <div className="lesson-stage__video-container">
                <iframe
                  key={currentLesson.videoId}
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1`}
                  title={currentLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 0 }}
                />
              </div>
            )}

            {/* Video Summary: compact module content for video lessons */}
            {isVideoLesson && contentTab?.sections?.learn?.summary && (
              <div className="lesson-stage__video-summary">
                <h3 className="lesson-stage__video-summary-title">Video summary</h3>
                <p className="lesson-stage__video-summary-text">
                  {renderRichText(contentTab.sections.learn.summary)}
                </p>
              </div>
            )}

            {/* Content: original lesson blocks for non-video, or content tabs */}
            {!isVideoLesson && contentTab ? (
              <div className="lesson-stage__content-blocks">
                <ContentTabRenderer contentTab={contentTab} />
              </div>
            ) : currentLesson.content?.blocks ? (
              <div className="lesson-stage__content-blocks">
                {renderLessonContent()}
              </div>
            ) : null}

            {/* Previous / Complete / Next */}
            <div className="lesson-stage__nav">
              <button
                className="lesson-stage__nav-btn"
                onClick={handlePrev}
                disabled={!prevLesson}
              >
                ← Previous
              </button>

              <PrimaryButton
                onClick={handleMarkCompleteAndNext}
                style={isCompleted ? { background: 'var(--color-success-600)', boxShadow: '0 2px 8px rgba(52, 199, 89, 0.2)' } : {}}
              >
                {isCompleted ? '✓ Completed' : 'Mark Complete & Continue'}
              </PrimaryButton>

              <button
                className="lesson-stage__nav-btn"
                onClick={handleNext}
                disabled={!nextLesson}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>

      {/* RIGHT: AI Coach Pane (persistent) */}
      <aside className="ai-coach-pane">
        <AiTutorChat
          key={`${moduleId}_${activeLessonId}`}
          isOpen={true}
          onClose={() => {}}
          moduleId={moduleId}
          lessonId={activeLessonId}
          lessonTitle={currentLesson?.title}
          isVideoLesson={isVideoLesson}
          videoTranscript={videoTranscript}
          videoTimestamp={videoTimestamp}
          premiumLearnMode={true}
        />
      </aside>
    </div>
  );
};

export default LearnWorkspace;
