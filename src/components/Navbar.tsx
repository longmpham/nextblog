import Link from "next/link"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"

const NavBar = () => {

    const categories = [
      "business",
      "entertainment",
      "general",
      "health",
      "sports",
      "science",
    ]

    return(
      <>
        <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
          <Container>
            <Navbar.Toggle aria-controls="main-navbar"/>
            <Navbar.Collapse id="main-navbar">
              <Nav>
                <Nav.Link as={Link} href="/">Top News</Nav.Link>
                <Nav.Link as={Link} href="/search">Search News</Nav.Link>
                <NavDropdown title="Categories" id="categories-dropdown">
                  {
                    categories.map((category) => (
                      <NavDropdown.Item key={category} as={Link} href={`/categories/${category}`}>{category}</NavDropdown.Item>
                    ))
                  }
                </NavDropdown>
                <Nav.Link as={Link} href="/reddit">Search Reddits</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
}


export default NavBar