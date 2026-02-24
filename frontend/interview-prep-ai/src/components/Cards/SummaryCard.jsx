import React from 'react';
import { LuTrash2, LuArrowRight } from "react-icons/lu";
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .sc-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border: 1px solid #FFE0C8;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .sc-wrap:hover {
          box-shadow: 0 16px 48px rgba(255,147,36,0.13);
        }

        /* Colored top band */
        .sc-top {
          padding: 18px 18px 16px;
          position: relative;
        }

        /* Initials avatar */
        .sc-avatar {
          width: 46px; height: 46px;
          border-radius: 14px;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(4px);
          border: 1.5px solid rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #111; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        /* Role text */
        .sc-role {
          font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #111; margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 200px;
        }
        .sc-topics {
          font-size: 12px; color: #666;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 200px;
        }

        /* Delete btn */
        .sc-del-btn {
          position: absolute; top: 12px; right: 12px;
          display: none;
          align-items: center; gap: 5px;
          background: rgba(255,255,255,0.9);
          border: 1px solid #FFD6D6;
          color: #D94040; border-radius: 100px;
          padding: 5px 10px; font-size: 11px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
          backdrop-filter: blur(4px);
        }
        .sc-del-btn:hover { background: #FFF0F0; }
        .sc-wrap:hover .sc-del-btn { display: flex; }

        /* Bottom section */
        .sc-bottom {
          padding: 14px 18px 16px;
          background: #fff;
        }

        /* Tags row */
        .sc-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 10px;
        }
        .sc-tag {
          font-size: 10px; font-weight: 600;
          padding: 4px 10px; border-radius: 100px;
          white-space: nowrap;
        }
        .sc-tag-dark  { background: #111; color: #fff; }
        .sc-tag-light { background: #FFF0E4; color: #c96a0a; border: 1px solid #FFCBA4; }
        .sc-tag-gray  { background: #F5F5F5; color: #666; border: 1px solid #E8E8E8; }

        /* Description */
        .sc-desc {
          font-size: 12px; color: #999; line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 14px;
        }

        /* Footer CTA */
        .sc-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #FFE8D6;
        }
        .sc-updated {
          font-size: 11px; color: #bbb;
        }
        .sc-arrow {
          display: flex; align-items: center; gap: 4px;
          font-size: 11px; font-weight: 700; color: #FF9324;
          transition: gap 0.18s;
        }
        .sc-wrap:hover .sc-arrow { gap: 7px; }
      `}</style>

      <div className="sc-wrap" onClick={onSelect}>

        {/* ── Colored top ── */}
        <div className="sc-top" style={{ background: colors?.bgcolor || '#FFF0E4' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div className="sc-avatar">{getInitials(role)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 className="sc-role">{role}</h2>
              <p className="sc-topics">{topicsToFocus}</p>
            </div>
          </div>

          {/* Delete button */}
          <button
            className="sc-del-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            type="button"
          >
            <LuTrash2 size={11} /> Delete
          </button>
        </div>

        {/* ── Bottom content ── */}
        <div className="sc-bottom">
          {/* Tags */}
          <div className="sc-tags">
            {experience && (
              <span className="sc-tag sc-tag-dark">🎯 {experience}</span>
            )}
            {questions && (
              <span className="sc-tag sc-tag-light">📋 {questions} Q&amp;A</span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="sc-desc">{description}</p>
          )}

          {/* Footer */}
          <div className="sc-footer">
            <span className="sc-updated">🕐 {lastUpdated}</span>
            <span className="sc-arrow">
              Practice <LuArrowRight size={12} />
            </span>
          </div>
        </div>

      </div>
    </>
  );
};

export default SummaryCard;
