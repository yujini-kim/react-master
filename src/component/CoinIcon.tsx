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
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

interface IIMG {
  path?: string;
  name?: string;
}

export default function Coinicon({ path, name }: IIMG) {
  return (
    <>
      <Icon>
        <Img src={path} alt={name} />
        {name}
      </Icon>
    </>
  );
}
