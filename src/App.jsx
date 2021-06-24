import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/menu";
import Home from "./pages/home";
import About from "./pages/about";
import './css/app.css';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
