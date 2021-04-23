import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Gallery from "./components/gallery/Gallery";
import ImageDetails from "./components/gallery/ImageDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Gallery />
        </Route>
        <Route path="/imgdetails">
          <ImageDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
