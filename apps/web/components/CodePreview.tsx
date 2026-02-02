interface CodePreviewProps {
  code: string;
}

export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <section>
      <h2>MQL5 Preview</h2>
      <pre
        style={{
          background: "#0b1021",
          color: "#e8e8e8",
          padding: "16px",
          borderRadius: "8px",
          overflowX: "auto"
        }}
      >
        {code}
      </pre>
    </section>
  );
}
