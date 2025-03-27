import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;
const Text = styled.span``;
const Value = styled.span`
  font-weight: 600;
`;
const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #d3d3d3;
  margin: 10px;
`;

interface Props {
  text: string;
  data?: number;
}
export default function CoinExtraInfo({ text, data }: Props) {
  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "∞";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      {" "}
      <Container>
        <Text>{text}</Text>
        <Value>${formatNumber(data)}</Value>
      </Container>
      <StyledHr />
    </>
  );
}
