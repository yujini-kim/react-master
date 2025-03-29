import styled from "styled-components";

const Container = styled.div<{ priceChange: number }>`
  background-color: ${(props) =>
    props.priceChange > 0
      ? props.theme.decreaseColor
      : props.theme.increaseColor};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  color: black;
  padding: 5px;
  border-radius: 5px;
`;

interface PercentBoxProps {
  priceChange: number;
}

export default function PercentBox({ priceChange }: PercentBoxProps) {
  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "∞";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container priceChange={priceChange}>
      {priceChange > 0 ? "▼" : "▲"}
      {formatNumber(priceChange ? Number(priceChange.toFixed(1)) : undefined)}%
    </Container>
  );
}
