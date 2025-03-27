import styled from "styled-components";

const Container = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

interface Iprice {
  price?: number;
}

export default function CurrentPrice({ price }: Iprice) {
  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "∞";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return <Container>${formatNumber(price)}</Container>;
}
