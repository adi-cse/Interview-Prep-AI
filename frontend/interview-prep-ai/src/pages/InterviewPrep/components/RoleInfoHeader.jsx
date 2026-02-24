import React from 'react';

const RoleInfoHeader = ({
    role,
    topicsToFocusOn,
    questions,
    experienceLevel,
    description,
    lastUpdated,
}) => {

    const expLabel = () => {
        if (experienceLevel === "Senior") return `${experienceLevel} · 10+ years`;
        if (experienceLevel === "Mid")    return `${experienceLevel} · 3–10 years`;
        if (experienceLevel === "Junior") return `${experienceLevel} · 0–3 years`;
        return experienceLevel;
    };

    const topics = Array.isArray(topicsToFocusOn)
        ? topicsToFocusOn.join(", ")
        : topicsToFocusOn;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

                .rih-wrap {
                    font-family: 'DM Sans', sans-serif;
                    background: #fff;
                    border: 1.5px solid #FFE0C8;
                    border-radius: 22px;
                    box-shadow: 0 4px 24px rgba(255,147,36,0.08);
                    padding: 28px 28px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    overflow: hidden;
                    position: relative;
                }

                .rih-fd { font-family: 'Sora', sans-serif !important; }

                /* Left content */
                .rih-left { flex: 1; min-width: 0; position: relative; z-index: 1; }

                .rih-role {
                    font-family: 'Sora', sans-serif;
                    font-size: clamp(20px, 2.5vw, 28px);
                    font-weight: 800; color: #111;
                    margin-bottom: 6px; line-height: 1.2;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }

                .rih-topics {
                    font-size: 13px; color: #999;
                    margin-bottom: 18px; line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .rih-tags {
                    display: flex; flex-wrap: wrap; gap: 8px;
                }

                .rih-tag {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700;
                    padding: 5px 12px; border-radius: 100px;
                    white-space: nowrap;
                }
                .rih-tag-dark {
                    background: #111; color: #fff;
                }
                .rih-tag-orange {
                    background: #FFF0E4; color: #c96a0a;
                    border: 1px solid #FFCBA4;
                }
                .rih-tag-gray {
                    background: #F5F5F5; color: #555;
                    border: 1px solid #E8E8E8;
                }

                /* Right decorative blob area */
                .rih-right {
                    width: 160px; height: 130px;
                    flex-shrink: 0;
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                }

                .rih-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(38px);
                }

                @keyframes rih-b1 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    50%      { transform: translate(12px,-10px) scale(1.1); }
                }
                @keyframes rih-b2 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    50%      { transform: translate(-10px,12px) scale(1.15); }
                }
                @keyframes rih-b3 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    50%      { transform: translate(8px,8px) scale(0.9); }
                }

                .rih-blob1 { width:70px;height:70px; background:#FFD4A8; top:10px; left:20px; animation: rih-b1 5s ease-in-out infinite; }
                .rih-blob2 { width:55px;height:55px; background:#FFB38A; bottom:10px; right:16px; animation: rih-b2 6s ease-in-out infinite; }
                .rih-blob3 { width:50px;height:50px; background:#FFEACC; top:30px; right:30px; animation: rih-b3 7s ease-in-out infinite; }

                .rih-right-icon {
                    width: 52px; height: 52px; border-radius: 18px;
                    background: linear-gradient(135deg,#FF9324,#FF6B00);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 10px 28px rgba(255,147,36,0.32);
                    position: relative; z-index: 1;
                    font-size: 24px;
                }

                /* Description strip */
                .rih-desc {
                    font-size: 13px; color: #888; line-height: 1.6;
                    margin-top: 10px;
                    padding-top: 14px;
                    border-top: 1px solid #FFE8D6;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Mobile */
                @media (max-width: 560px) {
                    .rih-wrap { padding: 22px 18px 20px; flex-direction: column; align-items: flex-start; }
                    .rih-right { display: none; }
                    .rih-role { white-space: normal; }
                }
            `}</style>

            <div className="rih-wrap">

                {/* Left */}
                <div className="rih-left">
                    <h2 className="rih-role">{role}</h2>

                    {topics && (
                        <p className="rih-topics">
                            <span style={{ color: "#FF9324", fontWeight: 600, marginRight: 4 }}>Topics:</span>
                            {topics}
                        </p>
                    )}

                    <div className="rih-tags">
                        {experienceLevel && (
                            <span className="rih-tag rih-tag-dark">
                                🎯 {expLabel()}
                            </span>
                        )}
                        {questions && (
                            <span className="rih-tag rih-tag-orange">
                                📋 {questions} Q&amp;A
                            </span>
                        )}
                        {lastUpdated && (
                            <span className="rih-tag rih-tag-gray">
                                🕐 {lastUpdated}
                            </span>
                        )}
                    </div>

                    {description && (
                        <p className="rih-desc">{description}</p>
                    )}
                </div>

                {/* Right: animated blobs */}
                <div className="rih-right">
                    <div className="rih-blob rih-blob1" />
                    <div className="rih-blob rih-blob2" />
                    <div className="rih-blob rih-blob3" />
                    <div className="rih-right-icon">🧠</div>
                </div>

            </div>
        </>
    );
};

export default RoleInfoHeader;