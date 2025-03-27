import styled from "styled-components";

const Icon = styled.div`
  display: flex;
  font-size: 30px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const Img = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

const Name = styled.div<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
`;

interface IIMG {
  path?: string;
  name?: string;
  fontSize?: string;
}

export default function Coinicon({
  path,
  name,

  fontSize = "16px",
}: IIMG) {
  return (
    <>
      <Icon>
        <Img src={path} alt={name} />
        <Name fontSize={fontSize}>{name}</Name>
      </Icon>
    </>
  );
}
