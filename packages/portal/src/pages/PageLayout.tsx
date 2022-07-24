import { Container } from "@mui/system";
import NavBar from "./NavBar";

const PageLayout = ({ children }: any) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
}

export default PageLayout