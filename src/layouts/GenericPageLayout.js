import { Container } from "react-bootstrap";

const GenericPageLayout = ({ children }) => (
  <div
    style={{
      height: "100%",
    }}
  >
    <Container className="py-5">{children}</Container>
  </div>
);

export default GenericPageLayout;
