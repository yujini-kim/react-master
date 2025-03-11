import styled, { keyframes, ThemeConsumer } from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wraaper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;
function App() {
  return (
    <Wraaper>
      <Title>Hello</Title>
    </Wraaper>
  );
}

export default App;
