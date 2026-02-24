import React from 'react';
import { LuTriangleAlert, LuTrash2 } from 'react-icons/lu';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .del-wrap {
          font-family: 'DM Sans', sans-serif;
          padding: 28px 28px 24px;
          width: min(380px, 88vw);
        }

        /* Icon */
        .del-icon-wrap {
          width: 52px; height: 52px; border-radius: 16px;
          background: #FFF3F3; border: 1px solid #FFD6D6;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; color: #D94040;
        }

        /* Text */
        .del-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #111; margin-bottom: 8px;
        }
        .del-content {
          font-size: 13px; color: #888; line-height: 1.65;
          margin-bottom: 24px;
        }

        /* Divider */
        .del-hr { height: 1px; background: #FFE8D6; margin-bottom: 20px; }

        /* Buttons row */
        .del-btns {
          display: flex; gap: 10px; justify-content: flex-end;
        }

        .del-btn-cancel {
          display: inline-flex; align-items: center;
          font-size: 13px; font-weight: 600;
          padding: 10px 20px; border-radius: 100px;
          border: 1.5px solid #E8E8E8;
          background: #fff; color: #666;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.18s, background 0.18s;
        }
        .del-btn-cancel:hover { border-color: #ccc; background: #F9F9F9; }

        .del-btn-delete {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 700;
          padding: 10px 20px; border-radius: 100px;
          border: none; background: #D94040; color: #fff;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.18s, transform 0.15s;
        }
        .del-btn-delete:hover { background: #C03030; transform: translateY(-1px); }
      `}</style>

      <div className="del-wrap">
        {/* Warning icon */}
        <div className="del-icon-wrap">
          <LuTriangleAlert size={24} />
        </div>

        {/* Heading */}
        <h3 className="del-title">Are you sure?</h3>

        {/* Message */}
        <p className="del-content">{content}</p>

        <div className="del-hr" />

        {/* Buttons */}
        <div className="del-btns">
          <button
            type="button"
            className="del-btn-delete"
            onClick={onDelete}
          >
            <LuTrash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAlertContent;