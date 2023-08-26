import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <>

    <Navbar bg="dark" variant="dark">
      <Container>

          <Navbar.Brand>amazona</Navbar.Brand>

      </Container>
    </Navbar>
  </>
  )
}
