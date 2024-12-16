import React, { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}
const Markdown: FC<MarkdownProps> = ({ content }) => {
  const renderers: Components = {
    h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    p: ({ children }) => <p className="text-base font-light">{children}</p>,
  };
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;