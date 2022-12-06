import { Position, PositionDetail, Rotation } from '../types';

const getStreetsPosition = () => {
  const positions: Position = {
    A: [
      {
        x: 62,
        y: -280,
        rotate: Rotation.DOWN,
      },
      {
        x: 62,
        y: -223,
        rotate: Rotation.DOWN,
        closePosition: 'B',
      },
      {
        x: 62,
        y: -150,
        rotate: Rotation.DOWN,
      },
      {
        x: 62,
        y: -71,
        rotate: Rotation.DOWN,
        closePosition: 'C',
      },
      {
        x: 62,
        y: 0,
        rotate: Rotation.DOWN,
      },
      {
        x: -5,
        y: 4,
        rotate: Rotation.LEFT,
      },
    ],
    B: [
      {
        x: 268,
        y: -225,
        rotate: Rotation.RIGHT,
      },
      {
        x: 462,
        y: -225,
        rotate: Rotation.RIGHT,
      },
      { x: 462, y: -150, rotate: Rotation.DOWN },
      { x: 462, y: 0, rotate: Rotation.DOWN, closePosition: 'F' },
      { x: 540, y: 0, rotate: Rotation.RIGHT },
    ],
    C: [
      { x: 141, y: -70, rotate: Rotation.RIGHT, closePosition: 'D' },
      { x: 222, y: -69, rotate: Rotation.RIGHT },
      { x: 222, y: 77, rotate: Rotation.DOWN, closePosition: 'E' },
      { x: 220, y: 210, rotate: Rotation.DOWN },
      { x: 64, y: 215, rotate: Rotation.LEFT },
      { x: 64, y: 178, rotate: Rotation.UP },
      { x: 0, y: 178, rotate: Rotation.LEFT },
    ],
    D: [
      { x: 141, y: -150, rotate: Rotation.UP, closePosition: 'C' },
      { x: 322, y: -150, rotate: Rotation.UP, closePosition: 'F' },
    ],
    E: [
      { x: 100, y: 77, rotate: Rotation.LEFT, closePosition: 'C' },
      { x: 0, y: 77, rotate: Rotation.LEFT },
    ],
    F: [
      { x: 322, y: 5, rotate: Rotation.DOWN },
      { x: 322, y: 215, rotate: Rotation.RIGHT },
      { x: 462, y: 215, rotate: Rotation.UP },
      { x: 462, y: 78, rotate: Rotation.RIGHT },
      { x: 540, y: 78, rotate: Rotation.RIGHT },
    ],
  };

  return positions;
};

interface IRandomPosition {
  position: PositionDetail;
  street: string;
}

const randomPosition = (): IRandomPosition => {
  const streetKeys = Object.keys(getStreetsPosition());

  const randomStreet = Math.floor(Math.random() * streetKeys.length);
  const street = streetKeys[randomStreet];

  const randomWay = Math.floor(
    Math.random() * Object.keys(getStreetsPosition()[street]).length,
  );

  const position = getStreetsPosition()[street][randomWay];

  return { position, street };
};

const getRotationDeg = (_returning?: boolean) => {
  const rotationDeg = {
    [Rotation.UP]: 0,
    [Rotation.DOWN]: 180,
    [Rotation.RIGHT]: 90,
    [Rotation.LEFT]: 270,
  };

  return rotationDeg;
};

export { randomPosition, getStreetsPosition, getRotationDeg };
