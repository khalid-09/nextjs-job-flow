import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  chidlren: string;
}

const Markdown = ({ chidlren }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => (
          <a className="text-green-500" target="_blank" {...props} />
        ),
      }}
    >
      {chidlren}
    </ReactMarkdown>
  );
};

export default Markdown;
