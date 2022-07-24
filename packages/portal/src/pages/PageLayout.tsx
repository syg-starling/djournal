import { Container } from "@mui/system";
import NavBar from "./NavBar";

const PageLayout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <Container sx={{ pt: '2rem', mt: '4rem' }}>
        {children}
      </Container>
    </>
  );
}

export default PageLayout