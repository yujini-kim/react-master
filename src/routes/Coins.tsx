import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 150px);
  gap: 10px;
`;
const CoinBox = styled.li`
  padding: 10px;
  background-color: #181719;
  border: 1px solid #232323;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05),
    0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Coin = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CoinName = styled.div`
  color: ${(props) => props.theme.textColor};

  transition: color 0.2s ease-in;
  font-size: 10px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const CoinPrice = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;
const CoinPriceChange = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const ChangeDollar = styled.span`
  font-size: 10px;
  color: gray;
`;
const ChangePercent = styled.span<{ priceChange: number }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.priceChange < 0 ? "red" : props.priceChange > 0 ? "green" : "gray"};
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: number;
  atl: number;
  atl_change_percentage: number;
  atl_date: number;
  last_updated: number;
}
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Link
              to={{
                pathname: `/${coin.name}`,
                state: { name: coin.name },
              }}
            >
              <CoinBox key={coin.id}>
                <Coin>
                  <CoinName>
                    <Img src={coin.image} alt={coin.name} />
                    {coin.name}
                  </CoinName>
                  <CoinPrice>${coin.current_price}</CoinPrice>
                </Coin>
                <CoinPriceChange>
                  <ChangeDollar>
                    $
                    {Number(
                      Number(coin.current_price).toFixed(5)
                    ).toLocaleString()}
                  </ChangeDollar>
                  <ChangePercent priceChange={coin.price_change_percentage_24h}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </ChangePercent>
                </CoinPriceChange>
              </CoinBox>
            </Link>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
