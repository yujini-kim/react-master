import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import CoinList from "../component/CoinList";
import Logo from "../component/Logo";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;

function Coins() {
  return (
    <Container>
      <Helmet>
        <title>지니코인</title>
      </Helmet>
      <Logo />
      <CoinList />
    </Container>
  );
}

export default Coins;
