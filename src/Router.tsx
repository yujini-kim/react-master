import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggleDark: () => void;
}

function Router({ toggleDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Coins toggleDark={toggleDark} />}
        />
        <Route path="/:coinId" component={Coin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
