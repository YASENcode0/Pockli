import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import Nav from "./components/nav/Nav";

export default function App() {
  return <div className="App">
    <Nav/>
    <Main/>
    {/* <Footer/> */}
  </div>;
}
