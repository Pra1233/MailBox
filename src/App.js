import Signup from "./components/Signup.js/Signup";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import MailBox from "./components/Mail/MailBox";
import Sent from "./components/Mail/Sent";
import Header from "./components/Header/Header";
import Inbox from "./components/Mail/Inbox";

function App() {
  const islogin = useSelector((state) => state.auth.islogin);
  console.log(islogin, "login");
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          {!islogin && <Redirect to="/login" />}
          {islogin && <Redirect to="/compose" />}
        </Route>

        <Route exact path="/login">
          {!islogin && <Signup />}
          {islogin && <Redirect to="/compose" />}
        </Route>

        <Route exact path="/compose">
          {islogin && <MailBox />}
          {!islogin && <Redirect to="/login" />}
        </Route>

        <Route exact path="/sent">
          {islogin && <Sent />}
          {!islogin && <Redirect to="/login" />}
        </Route>

        <Route exact path="/inbox">
          {islogin && <Inbox />}
          {!islogin && <Redirect to="/login" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
