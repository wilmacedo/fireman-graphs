import styled from 'styled-components';
import { Rotation } from '../../types';
import { darken, transparentize } from 'polished';
import { getRotationDeg } from '../../utils';

interface ICar {
  rotate: Rotation;
  returning?: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
`;

export const Title = styled.h1`
  max-width: 20rem;

  text-align: center;
  font-weight: 500;
  font-size: 4rem;
  line-height: 3.5rem;
`;

export const Separator = styled.div`
  margin: 0.5rem 0;

  span {
    font-weight: 600;
    font-size: 1.25rem;
  }
`;

export const Subtitle = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DistanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 0.5rem;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  span {
    font-weight: 600;
  }
`;

export const CityContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 40rem;
    width: auto;

    border-radius: 1.5rem;
    box-shadow: 0px 0px 58px 13px ${props => props.theme.shadow};
  }
`;

export const CarImage = styled.img<ICar>`
  position: absolute;

  height: 3rem !important;
  width: auto;

  box-shadow: unset !important;

  transform: ${props =>
    `rotate(${getRotationDeg(props.returning)[props.rotate]}deg)`};

  transition: 0.2s ease-in-out;
`;

export const FireImage = styled.img`
  position: absolute;

  height: 2.5rem !important;
  width: auto;

  box-shadow: unset !important;
`;

export const GraphContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  background-color: ${props => transparentize(0.7, props.theme.black)};
  border-radius: 1.5rem;

  transition: 0.5 ease;
`;

export const GraphPoint = styled.div`
  position: absolute;

  height: 1.75rem;
  width: 1.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d5d1c6;
  border-radius: 100%;

  background-color: ${darken(0.25, '#d5d1c6')};

  span {
    color: white;
  }
`;
