import { useSelector } from "react-redux";

function Home(props) {
    const message = useSelector(state => state.message);
    return <div>{message}</div>;
}
export default Home;