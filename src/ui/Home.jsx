import { Card } from "react-bootstrap";

function Home(props) {
    return <Card>
        <Card.Header>Skeleton ReactJS App</Card.Header>
        <Card.Body>
            <Card.Title>Welcome!</Card.Title>
            <Card.Text>
                This skeleton App comes with all important library integrations and sample snippets that will give you a headstart.
            </Card.Text>
        </Card.Body>
    </Card>;
}
export default Home;