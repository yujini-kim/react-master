import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Coins />} />
        <Route path="/:coinId" component={Coin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
