import styled from "styled-components";

const Icon = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
`;

const Img = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-right: 5px;
`;

const Name = styled.div<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
`;

interface IIMG {
  path?: string;
  name?: string;
  fontSize?: string;
  width?: string;
  height?: string;
}

export default function Coinicon({
  path,
  name,
  fontSize = "16px",
  width = "30px",
  height = "30px",
}: IIMG) {
  return (
    <>
      <Icon>
        <Img src={path} alt={name} width={width} height={height} />
        <Name fontSize={fontSize}>{name}</Name>
      </Icon>
    </>
  );
}
