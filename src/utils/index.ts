export enum Car {
  YELLOW = 'yellow',
  RED = 'red',
}

export enum Rotation {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

export interface PositionDetail {
  x: number;
  y: number;
  rotate: Rotation;
  closePosition?: string;
}

export interface Position {
  [name: string]: PositionDetail[];
}

const getStreetsPosition = () => {
  const positions: Position = {
    A: [
      {
        x: 57,
        y: -280,
        rotate: Rotation.DOWN,
      },
      {
        x: 57,
        y: -230,
        rotate: Rotation.DOWN,
        closePosition: 'B',
      },
      {
        x: 57,
        y: -155,
        rotate: Rotation.DOWN,
      },
      {
        x: 57,
        y: -75,
        rotate: Rotation.DOWN,
        closePosition: 'C',
      },
      {
        x: 57,
        y: 0,
        rotate: Rotation.DOWN,
      },
      {
        x: -5,
        y: 0,
        rotate: Rotation.LEFT,
      },
    ],
    B: [
      {
        x: 265,
        y: -230,
        rotate: Rotation.RIGHT,
      },
      {
        x: 457,
        y: -230,
        rotate: Rotation.RIGHT,
        closePosition: 'D',
      },
      {
        x: 457,
        y: -280,
        rotate: Rotation.UP,
      },
    ],
    C: [
      { x: 136, y: -75, rotate: Rotation.RIGHT, closePosition: 'E' },
      { x: 217, y: -75, rotate: Rotation.RIGHT },
      { x: 217, y: 71, rotate: Rotation.DOWN, closePosition: 'F' },
      { x: 217, y: 210, rotate: Rotation.DOWN },
      { x: 57, y: 210, rotate: Rotation.LEFT },
      { x: 57, y: 170, rotate: Rotation.UP },
      { x: 0, y: 170, rotate: Rotation.LEFT },
    ],
    D: [
      { x: 457, y: -155, rotate: Rotation.DOWN },
      { x: 457, y: 0, rotate: Rotation.DOWN },
    ],
    E: [{ x: 136, y: -150, rotate: Rotation.UP }],
    F: [{ x: 0, y: 71, rotate: Rotation.LEFT }],
  };

  return positions;
};

// const getPositions = () => {
//   const positions: Position = {
//     A: {
//       // TOP ORANGE HOUSE
//       x: 940,
//       y: 100,
//       type: PositionType.FIRE_STATION,
//     },
//     B: {
//       // BOTTOM ORANGE HOUSE
//       x: 1040,
//       y: 490,
//       type: PositionType.FIRE_STATION,
//     },
//     C: {
//       // TOP RIGHT BROWN HOUSE
//       x: 1160,
//       y: 250,
//       type: PositionType.HOUSE,
//     },
//     D: {
//       // BOTTOM SIDE BLUE MALL
//       x: 880,
//       y: 580,
//       type: PositionType.MALL,
//     },
//   };

//   return positions;
// };

export { getStreetsPosition };
