import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

const Text = styled.h1``;
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 15%;
  height: 100vh;
  background-color: ${(props) => props.theme.coinGridColor};
  border-right: 1px solid ${(props) => props.theme.coinGridBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Toggle = styled.input`
  display: none;
`;
const ToggleSwitch = styled.label<{ toggle: boolean }>`
  width: 80px;
  height: 40px;
  display: block;
  position: relative;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.coinGridBorder};
  background: ${(props) =>
    props.toggle ? props.theme.bgColor : props.theme.accentColor};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;
  position: fixed;
  bottom: 10px;
`;
const Button = styled.span<{ toggle: boolean }>`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: ${(props) =>
    props.toggle ? props.theme.accentColor : props.theme.bgColor};
  left: ${(props) => (props.toggle ? "42px" : "4px")};
`;
export default function Navbar() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const [click, setClick] = useState(false);
  const onClick = () => {
    setClick((pre) => !pre);
    setDarkAtom((pre) => !pre);
  };

  return (
    <Container>
      <Text>JINI CRYTO</Text>
      <Toggle id="toggle" onClick={onClick}></Toggle>
      <ToggleSwitch toggle={click} htmlFor="toggle">
        <Button toggle={click}></Button>
      </ToggleSwitch>
    </Container>
  );
}
