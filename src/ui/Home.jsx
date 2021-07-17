import { useSelector } from "react-redux";

function Home(props) {
    const message = useSelector(state => state.message);
    return <h1>{message}</h1>;
}
export default Home;