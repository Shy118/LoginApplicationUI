import { Container, Row, Col } from 'react-bootstrap';

function Restricted() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <section>
            <h1>Restricted Webpage</h1>
          </section>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Restricted;