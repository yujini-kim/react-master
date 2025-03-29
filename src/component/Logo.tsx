import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 250px;
  background-color: ${(props) => props.theme.bgColor};
`;

export default function Logo() {
  return <Container></Container>;
}
