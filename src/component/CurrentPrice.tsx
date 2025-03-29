import styled from "styled-components";

const Container = styled.span<{ fontsize: string; fontWeight: number }>`
  font-size: ${(props) => props.fontsize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.theme.textColor};
`;

interface Iprice {
  price?: number;
  fontsize?: string;
  fontWeight?: number;
}

export default function CurrentPrice({
  price,
  fontsize = "10px",
  fontWeight = 400,
}: Iprice) {
  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "∞";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Container fontsize={fontsize} fontWeight={fontWeight}>
      ${formatNumber(price)}
    </Container>
  );
}
