import React, { useMemo, useState } from 'react';
import { LEARN_SECTIONS, LEARN_UNITS, getChapter } from '../../data/chapters';
import './LearnTab.css';

// Pill labels for the section switcher — short forms of the section headers.
const SECTION_PILL_LABELS = {
  strategy: 'The Digital SAT',
  reading: 'Reading',
  writing: 'Writing',
  math: 'Math',
};

const FILTER_STORAGE_KEY = 'learn:sectionFilter';

const readStoredFilter = () => {
  try {
    const v = window.localStorage.getItem(FILTER_STORAGE_KEY);
    return v === 'all' || LEARN_SECTIONS.some((s) => s.id === v) ? v : 'all';
  } catch {
    return 'all';
  }
};

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

/**
 * Learn tab — the SEVA textbook's table of contents.
 *
 * DESIGN (2026-07-17): rebuilt from the user's "SEVA Learn Index (standalone)"
 * mockup, the TOC companion to the chapter-reader rebuild: warm cream canvas,
 * "The SEVA Textbook" masthead, navy-active segmented section filter, and
 * 2-column chapter cards (purple number chip → lime check once read, title +
 * read time, blurb, hover chevron). Systems unchanged: section filter persists
 * to localStorage, chapters number continuously within a section, read state
 * comes from the chaptersRead map.
 *
 * @param {Object} props
 * @param {Object} props.chaptersRead - map of { [chapterId]: { completed } }
 * @param {(chapterId: string) => void} props.onOpenChapter - open the reader
 * @returns {JSX.Element}
 */
const LearnTab = ({ chaptersRead = {}, onOpenChapter }) => {
  const isRead = (id) => !!chaptersRead[id]?.completed;

  const [sectionFilter, setSectionFilter] = useState(readStoredFilter);
  const selectFilter = (id) => {
    setSectionFilter(id);
    try { window.localStorage.setItem(FILTER_STORAGE_KEY, id); } catch { /* private mode */ }
  };

  // Build the render model once: sections → units → numbered chapters, with
  // per-section read counts. Chapters are numbered continuously within a section.
  const sections = useMemo(() => {
    return LEARN_SECTIONS.map((section) => {
      const units = LEARN_UNITS
        .filter((u) => u.section === section.id && u.chapterIds.length > 0)
        .map((u) => ({
          ...u,
          chapters: u.chapterIds.map((id) => getChapter(id)).filter(Boolean),
        }))
        .filter((u) => u.chapters.length > 0);

      let n = 0;
      const numberedUnits = units.map((u) => ({
        ...u,
        chapters: u.chapters.map((c) => ({ chapter: c, number: ++n })),
      }));

      const total = n;
      const completed = numberedUnits.reduce(
        (acc, u) => acc + u.chapters.filter(({ chapter }) => isRead(chapter.id)).length,
        0,
      );

      return { ...section, units: numberedUnits, total, completed };
    }).filter((s) => s.total > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- isRead is a per-render arrow whose only input is chaptersRead, already a dependency; adding it would recompute every render
  }, [chaptersRead]);

  return (
    <div className="lt-root">
      <div className="lt-container">
        <header className="lt-page-head">
          <h1 className="lt-page-title">The SEVA Textbook</h1>
          <p className="lt-page-sub">Everything the digital SAT tests, explained plainly — one chapter at a time.</p>
        </header>

        <div className="lt-seg" role="tablist" aria-label="Filter chapters by section">
          {[{ id: 'all', label: 'All' }, ...LEARN_SECTIONS.map((s) => ({ id: s.id, label: SECTION_PILL_LABELS[s.id] || s.label }))].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={sectionFilter === tab.id}
              className={`lt-seg-btn${sectionFilter === tab.id ? ' is-active' : ''}`}
              onClick={() => selectFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {sections.filter((s) => sectionFilter === 'all' || s.id === sectionFilter).map((section) => (
          <section key={section.id} className="lt-section">
            <div className="lt-section-head">
              <h2 className="lt-section-title">{section.label}</h2>
              <span className="lt-section-progress">{section.completed} of {section.total} read</span>
            </div>

            {section.units.map((unit) => (
              <div key={unit.id} className="lt-unit">
                <h3 className="lt-unit-title">{unit.label}</h3>
                <div className="lt-card-grid">
                  {unit.chapters.map(({ chapter, number }) => {
                    const read = isRead(chapter.id);
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        className={`lt-card${read ? ' is-read' : ''}`}
                        onClick={() => onOpenChapter(chapter.id)}
                      >
                        <span className="lt-card-num" aria-hidden="true">
                          {read ? <CheckIcon /> : number}
                        </span>
                        <span className="lt-card-body">
                          <span className="lt-card-toprow">
                            <span className="lt-card-title">{chapter.title}</span>
                            <span className="lt-card-time">{read ? 'Read' : `${chapter.readMinutes} min`}</span>
                          </span>
                          <span className="lt-card-blurb">{chapter.blurb}</span>
                        </span>
                        <span className="lt-card-go" aria-hidden="true"><ChevronRight /></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default LearnTab;
