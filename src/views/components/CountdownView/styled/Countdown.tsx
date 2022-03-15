import styled from 'styled-components';

export const Header = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 52px;
  margin: 0;
  background-color: #f4d06f;
  padding: 5px 30px 10px;
`;

export const TextWrapper = styled.div`
  margin: 15px 0;
  font-size: 30px;
  font-weight: bold;
  color: white;
`;

export const Divider = styled.div`
  width: 100%;
  max-width: 100px;
  border: 1px solid white;
`;

export const Button = styled.button`
  font-size: 15px;
  padding: 10px 20px;
  background-color: white;
  border: 0;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-weight: lighter;
  letter-spacing: 2px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

export const Quote = styled.p`
  font-size: 20px;
  font-style: italic;
`;
