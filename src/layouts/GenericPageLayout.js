const GenericPageLayout = ({ children }) => (
  <div
    style={{
      height: "100%",
    }}
  >
    <div className="py-5">{children}</div>
  </div>
);

export default GenericPageLayout;
