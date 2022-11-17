import styled, { DefaultTheme, keyframes } from 'styled-components';

interface IIcon {
  buttonColor?: string;
}

const Pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1); 
  }
`;

export const Container = styled.div`
  padding: 5rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10rem;
`;

export const InformationContainer = styled.div`
  max-width: 20rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  h1 {
    text-align: center;
    font-weight: 500;
    font-size: 4rem;
    line-height: 3.5rem;
  }

  p {
    font-weight: 600;
    font-size: 1.25rem;
  }

  span {
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;

  flex-direction: column;
`;

export const ButtonContent = styled.div`
  margin-top: 3rem;

  display: flex;

  flex-direction: row;
  align-items: center;

  gap: 1rem;
`;

export const ButtonIcon = styled.div<IIcon>`
  padding: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d5d1c6;
  border-radius: 100%;

  cursor: pointer;

  svg {
    color: ${props => props.theme[props.buttonColor as keyof DefaultTheme]};
    font-size: 2rem;
  }

  &:hover {
    animation: ${Pulse} 1s ease-in-out infinite;
  }
`;

export const ButtonInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  span {
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: none;
  }

  p {
    font-weight: 400;
    font-size: 0.85rem;
    text-transform: uppercase;
  }
`;

export const MapContainer = styled.div`
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  img {
    height: 40rem;
    width: auto;

    border-radius: 1.5rem;
    box-shadow: 0px 0px 58px 13px rgba(0, 0, 0, 0.18);
  }
`;
