import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
    if (!content) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');

                .arp-wrap {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.75;
                }

                /* Paragraphs */
                .arp-wrap p {
                    margin-bottom: 14px;
                    color: #444;
                    line-height: 1.75;
                }

                /* Headings */
                .arp-wrap h1,
                .arp-wrap h2 {
                    font-family: 'Sora', sans-serif;
                    font-size: 17px; font-weight: 700;
                    color: #111; margin: 20px 0 8px;
                    padding-bottom: 6px;
                    border-bottom: 2px solid #FFE0C8;
                }
                .arp-wrap h3 {
                    font-family: 'Sora', sans-serif;
                    font-size: 15px; font-weight: 700;
                    color: #111; margin: 16px 0 6px;
                }
                .arp-wrap h4 {
                    font-size: 14px; font-weight: 700;
                    color: #333; margin: 12px 0 4px;
                }

                /* Lists */
                .arp-wrap ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 10px 0 14px;
                }
                .arp-wrap ul li {
                    padding: 5px 0 5px 22px;
                    position: relative;
                    color: #444;
                }
                .arp-wrap ul li::before {
                    content: '';
                    position: absolute; left: 4px; top: 13px;
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #FF9324;
                }
                .arp-wrap ol {
                    padding-left: 20px;
                    margin: 10px 0 14px;
                }
                .arp-wrap ol li {
                    padding: 3px 0;
                    color: #444;
                }
                .arp-wrap ol li::marker {
                    color: #FF9324;
                    font-weight: 700;
                }

                /* Blockquote */
                .arp-wrap blockquote {
                    border-left: 3px solid #FF9324;
                    background: #FFF8F2;
                    padding: 10px 14px;
                    margin: 14px 0;
                    border-radius: 0 10px 10px 0;
                    color: #666;
                    font-style: italic;
                }

                /* Inline code */
                .arp-wrap code:not(.arp-code-block) {
                    background: #FFF0E4;
                    color: #c96a0a;
                    padding: 2px 6px;
                    border-radius: 6px;
                    font-size: 13px;
                    font-family: 'Fira Code', monospace;
                    border: 1px solid #FFCBA4;
                }

                /* Code block wrapper */
                .arp-code-wrap {
                    margin: 14px 0;
                    border-radius: 14px;
                    overflow: hidden;
                    border: 1px solid #FFE0C8;
                    box-shadow: 0 2px 12px rgba(255,147,36,0.06);
                }
                .arp-code-header {
                    background: #FFF5EC;
                    padding: 8px 14px;
                    display: flex; align-items: center; justify-content: space-between;
                    border-bottom: 1px solid #FFE0C8;
                }
                .arp-code-lang {
                    font-size: 11px; font-weight: 700;
                    color: #c96a0a; letter-spacing: 0.05em; text-transform: uppercase;
                }

                /* Table */
                .arp-table-wrap {
                    overflow-x: auto;
                    margin: 14px 0;
                    border-radius: 12px;
                    border: 1px solid #FFE0C8;
                    box-shadow: 0 2px 10px rgba(255,147,36,0.05);
                }
                .arp-wrap table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13px;
                }
                .arp-wrap thead {
                    background: #FFF5EC;
                }
                .arp-wrap th {
                    padding: 10px 14px;
                    text-align: left;
                    font-size: 11px; font-weight: 700;
                    color: #c96a0a; text-transform: uppercase; letter-spacing: 0.05em;
                    border-bottom: 1px solid #FFE0C8;
                }
                .arp-wrap td {
                    padding: 9px 14px;
                    color: #444;
                    border-bottom: 1px solid #F5F0EB;
                }
                .arp-wrap tr:last-child td { border-bottom: none; }
                .arp-wrap tbody tr:hover td { background: #FFFCF7; }

                /* HR */
                .arp-wrap hr {
                    border: none;
                    border-top: 1px solid #FFE0C8;
                    margin: 20px 0;
                }

                /* Links */
                .arp-wrap a {
                    color: #FF9324;
                    font-weight: 600;
                    text-decoration: none;
                    border-bottom: 1px solid #FFCBA4;
                    transition: border-color 0.18s;
                }
                .arp-wrap a:hover { border-color: #FF9324; }

                /* Image */
                .arp-wrap img {
                    max-width: 100%; border-radius: 12px;
                    margin: 12px 0;
                    border: 1px solid #FFE0C8;
                }

                /* Strong / em */
                .arp-wrap strong { color: #111; font-weight: 700; }
                .arp-wrap em { color: #666; }
            `}</style>

            <div className="arp-wrap">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ children }) => <p>{children}</p>,
                        strong: ({ children }) => <strong>{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,

                        ul: ({ children }) => <ul>{children}</ul>,
                        ol: ({ children }) => <ol>{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,

                        blockquote: ({ children }) => <blockquote>{children}</blockquote>,

                        h1: ({ children }) => <h1>{children}</h1>,
                        h2: ({ children }) => <h2>{children}</h2>,
                        h3: ({ children }) => <h3>{children}</h3>,
                        h4: ({ children }) => <h4>{children}</h4>,

                        a: ({ children, href }) => <a href={href}>{children}</a>,

                        hr: () => <hr />,
                        img: ({ src, alt }) => <img src={src} alt={alt} />,

                        table: ({ children }) => (
                            <div className="arp-table-wrap">
                                <table>{children}</table>
                            </div>
                        ),
                        thead: ({ children }) => <thead>{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr:    ({ children }) => <tr>{children}</tr>,
                        th:    ({ children }) => <th>{children}</th>,
                        td:    ({ children }) => <td>{children}</td>,

                        code: ({ node, inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const lang = match ? match[1] : '';

                            if (!inline && match) {
                                return (
                                    <div className="arp-code-wrap">
                                        <div className="arp-code-header">
                                            <span className="arp-code-lang">{lang}</span>
                                        </div>
                                        <SyntaxHighlighter
                                            style={oneLight}
                                            language={lang}
                                            PreTag="div"
                                            customStyle={{
                                                margin: 0,
                                                borderRadius: 0,
                                                background: '#FFFCF7',
                                                fontSize: '13px',
                                                padding: '14px',
                                            }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                );
                            }

                            return (
                                <code className="arp-code-block" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </>
    );
};


export default AIResponsePreview;