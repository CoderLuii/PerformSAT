import React, { useState } from 'react';
import AnswerChoiceList from './shared/AnswerChoiceList';
import QuestionRenderer from './QuestionRenderer';
import SolutionExplanation from './SolutionExplanation';
import { LANDING_DEMO_ITEMS } from '../data/landingDemoItems';

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '');

/**
 * LandingTryIt — the landing page's "try a real question" demo.
 *
 * Four real bank items, rendered with the app's own AnswerChoiceList and
 * SolutionExplanation, so what a visitor sees after "Check answer" is what a
 * student sees in a drill: the marked choice, the worked explanation with its
 * SAT Pattern badge, and the label the answer is filed under. No account, no
 * network; state is local to the widget.
 *
 * @param {{ onStart: () => void }} props — `onStart` opens the signup funnel.
 */
const LandingTryIt = ({ onStart }) => {
  const items = LANDING_DEMO_ITEMS;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const item = items[idx];
  const isRight = checked && picked === item.correctAnswer;
  const go = (i) => {
    setIdx(((i % items.length) + items.length) % items.length);
    setPicked(null);
    setChecked(false);
  };

  return (
    <div className="lp-try" id="try">
      <div className="lp-try-bar">
        <span className="lp-try-bar-label">Try a real question</span>
        <div className="lp-try-tabs" role="tablist" aria-label="Sample questions">
          {items.map((it, i) => (
            <button
              type="button"
              role="tab"
              aria-selected={i === idx}
              className={`lp-try-tab${i === idx ? ' is-on' : ''}`}
              key={it.id}
              onClick={() => go(i)}
            >
              <span className="lp-try-tab-n">{i + 1}</span>
              <span className="lp-try-tab-long">{it.section === 'math' ? 'Math' : 'Reading & Writing'}</span>
              <span className="lp-try-tab-short" aria-hidden="true">{it.section === 'math' ? 'Math' : 'R&W'}</span>
            </button>
          ))}
        </div>
        <span className="lp-try-bar-meta">{item.filedUnder} · {cap(item.difficulty)}</span>
      </div>

      <div className={`lp-try-body${item.passage ? ' has-passage' : ''}`}>
        {item.passage && (
          <div className="lp-try-passage"><QuestionRenderer content={item.passage} /></div>
        )}
        <div className="lp-try-q">
          <div className="lp-try-stem"><QuestionRenderer content={item.question} /></div>
          <AnswerChoiceList
            choices={item.choices}
            selectedId={picked}
            showResult={checked}
            correctId={item.correctAnswer}
            onSelect={(id) => { if (!checked) setPicked(id); }}
            crossOutControls={false}
          />
          <div className="lp-try-actions">
            {!checked ? (
              <button
                type="button"
                className="lp-btn lp-btn-orange lp-try-check"
                disabled={!picked}
                onClick={() => setChecked(true)}
              >
                Check answer
              </button>
            ) : (
              <>
                <span className={`lp-try-verdict ${isRight ? 'is-right' : 'is-wrong'}`}>{isRight ? 'Correct' : 'Not quite'}</span>
                <span className="lp-try-filed">Filed under <strong>{item.filedUnder}</strong></span>
                <button type="button" className="lp-try-next" onClick={() => go(idx + 1)}>
                  Try another<ArrowRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {checked && (
        <div className="lp-try-after">
          <div className="lp-try-learn">
            <span className="lp-try-learn-eyebrow">What SEVA does with this</span>
            <p>
              {isRight ? `A hit on ${item.filedUnder}, logged.` : `A miss on ${item.filedUnder}, logged.`}
              {' '}In the app, every answer is logged against its question type. After your diagnostic,
              your misses are grouped by the habit behind them, priced in points, and turned into your first drill.
            </p>
          </div>
          <div className="lp-try-expl">
            <SolutionExplanation explanation={item.explanation} isCorrect={isRight} />
          </div>
          <div className="lp-try-cta">
            <button type="button" className="lp-btn lp-btn-orange" onClick={onStart}>
              Start your free diagnostic<ArrowRight />
            </button>
            <span className="lp-try-cta-note">40 questions · about an hour · free</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingTryIt;
