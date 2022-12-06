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

export interface PositionState {
  position: PositionDetail;
  street: string;
  name: string;
  returning: boolean;
}

export interface IRandomPosition {
  position: PositionDetail;
  street: string;
}
