import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .qc-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          padding: 18px 20px;
          position: relative;
        }

        /* Question row */
        .qc-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }

        /* Q label + text */
        .qc-q-left {
          display: flex; align-items: flex-start;
          gap: 10px; flex: 1; min-width: 0;
          cursor: pointer;
        }
        .qc-q-label {
          font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 800;
          color: #FF9324; flex-shrink: 0;
          line-height: 1.4;
        }
        .qc-q-text {
          font-size: 14px; font-weight: 500;
          color: #222; line-height: 1.6;
        }

        /* Right actions */
        .qc-actions {
          display: flex; align-items: center;
          gap: 6px; flex-shrink: 0;
          margin-left: 8px;
        }
        .qc-btns {
          display: flex; align-items: center; gap: 6px;
        }
        /* Show on hover or when expanded */
        .qc-wrap:not(.qc-expanded) .qc-btns { display: none; }
        .qc-wrap:hover .qc-btns,
        .qc-wrap.qc-expanded .qc-btns { display: flex; }

        /* Pin button */
        .qc-pin-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 9px;
          background: #FFF0E4; border: 1px solid #FFCBA4;
          color: #FF9324; cursor: pointer;
          transition: background 0.18s, transform 0.15s;
          flex-shrink: 0;
        }
        .qc-pin-btn:hover { background: #FFE0C8; transform: scale(1.08); }
        .qc-pin-btn.qc-pinned { background: #FF9324; color: #fff; border-color: #FF9324; }

        /* Learn More button */
        .qc-learn-btn {
          display: inline-flex; align-items: center; gap: 5px;
          background: #111; color: #fff;
          font-size: 11px; font-weight: 700;
          padding: 6px 12px; border-radius: 100px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          transition: background 0.18s, transform 0.15s;
        }
        .qc-learn-btn:hover { background: #333; transform: translateY(-1px); }

        /* Chevron toggle */
        .qc-toggle {
          width: 30px; height: 30px; border-radius: 9px;
          background: #F5F5F5; border: none;
          display: flex; align-items: center; justify-content: center;
          color: #999; cursor: pointer;
          transition: background 0.18s, color 0.18s;
          flex-shrink: 0;
        }
        .qc-toggle:hover { background: #FFE8D6; color: #FF9324; }
        .qc-chevron {
          transition: transform 0.28s ease;
        }
        .qc-chevron.open { transform: rotate(180deg); }

        /* Answer area */
        .qc-answer-wrap {
          overflow: hidden;
          transition: height 0.3s ease;
        }
        .qc-answer-inner {
          margin-top: 16px;
          background: #FFFCF7;
          border: 1px solid #FFE0C8;
          border-radius: 14px;
          padding: 16px 18px;
        }

        /* Pinned indicator strip */
        .qc-pinned-strip {
          position: absolute; top: 0; left: 0;
          width: 3px; height: 100%;
          background: #FF9324;
          border-radius: 0;
        }
      `}</style>

      <div className={`qc-wrap ${isExpanded ? 'qc-expanded' : ''}`}>

        {/* Pinned left strip */}
        {isPinned && <div className="qc-pinned-strip" />}

        <div className="qc-top">
          {/* Question text */}
          <div className="qc-q-left" onClick={toggleExpand}>
            <span className="qc-q-label">Q</span>
            <h3 className="qc-q-text">{question}</h3>
          </div>

          {/* Actions */}
          <div className="qc-actions">
            <div className="qc-btns">
              {/* Pin */}
              <button
                className={`qc-pin-btn ${isPinned ? 'qc-pinned' : ''}`}
                onClick={onTogglePin}
                type="button"
                title={isPinned ? "Unpin" : "Pin"}
              >
                {isPinned ? <LuPinOff size={13} /> : <LuPin size={13} />}
              </button>

              {/* Learn More */}
              <button
                className="qc-learn-btn"
                onClick={() => { setIsExpanded(true); onLearnMore(); }}
                type="button"
              >
                <LuSparkles size={11} />
                <span>Learn More</span>
              </button>
            </div>

            {/* Chevron */}
            <button className="qc-toggle" onClick={toggleExpand} type="button">
              <LuChevronDown
                size={15}
                className={`qc-chevron ${isExpanded ? 'open' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Expandable answer */}
        <div className="qc-answer-wrap" style={{ height }}>
          <div ref={contentRef} className="qc-answer-inner">
            <AIResponsePreview content={answer} />
          </div>
        </div>

      </div>
    </>
  );
};

export default QuestionCard;