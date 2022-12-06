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
  margin-top: 3rem;

  display: flex;

  flex-direction: row;
  align-items: center;

  gap: 1rem;
`;

export const ContentIcon = styled.div<IIcon>`
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

export const Info = styled.div`
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
