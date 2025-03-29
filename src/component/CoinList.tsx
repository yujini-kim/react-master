import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../routes/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Coinicon from "./CoinIcon";
import CurrentPrice from "./CurrentPrice";

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 10px;
  position: absolute;
  right: 200px;
`;
const CoinBox = styled.li`
  padding: 10px;
  background-color: ${(props) => props.theme.coinGridColor};
  border: 1px solid ${(props) => props.theme.coinGridBorder};
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Coin = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${(props) => props.theme.textColor};
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const PriceChange = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const Percent = styled.span<{ priceChange: number }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.priceChange < 0
      ? props.theme.increaseColor
      : props.priceChange > 0
      ? props.theme.decreaseColor
      : "gray"};
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

export default function CoinList() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <CoinsList>
      {data?.slice(0, 100).map((coin) => (
        <Link
          key={coin.id}
          to={{
            pathname: `/${coin.id}`,
            state: { name: coin.id },
          }}
        >
          <CoinBox>
            <Coin>
              <Coinicon
                path={coin.image}
                name={coin.name}
                fontSize="10px"
                width="12px"
                height="12px"
              />
              <CurrentPrice
                fontsize="14px"
                price={coin.current_price}
                fontWeight={600}
              />
            </Coin>

            <PriceChange>
              <CurrentPrice fontsize="10px" price={coin.current_price} />
              <Percent priceChange={coin.price_change_percentage_24h}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </Percent>
            </PriceChange>
          </CoinBox>
        </Link>
      ))}
    </CoinsList>
  );
}
