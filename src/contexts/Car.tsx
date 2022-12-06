import { position } from 'polished';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IDistance, PositionDetail, PositionState } from '../types';
import {
  getGraphIndexByPosition,
  getPositionByGraphIndex,
  getStreetsPosition,
} from '../utils';

interface ICar {
  addCars(names: string[]): void;
  getCar(
    name: string,
  ): [
    PositionState,
    React.Dispatch<React.SetStateAction<PositionState | undefined>>,
  ];
  nextPosition(name: string): void;
  defaultPosition: PositionState;
  setToFire: React.Dispatch<React.SetStateAction<boolean>>;
  setMinDistance: React.Dispatch<React.SetStateAction<IDistance | undefined>>;
}

type Props = {
  children?: React.ReactNode;
};

const CarContext = createContext({} as ICar);

const CarProvider: React.FC<Props> = ({ children }) => {
  const defaultTime = 2 * 1000;
  const defaultStreet = 'A';
  const defaultPosition: PositionState = {
    position: getStreetsPosition()[defaultStreet][0],
    street: defaultStreet,
    name: '',
    returning: false,
  };

  const [first, setFirst] = useState<PositionState | undefined>();
  const [second, setSecond] = useState<PositionState | undefined>();
  const [toFire, setToFire] = useState(false);
  const [minDistance, setMinDistance] = useState<IDistance | undefined>();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let cars: PositionState[] = [];
    if (first) cars.push(first);
    if (second) cars.push(second);

    if (cars.length === 0) return;
    if (toFire) return;

    cars.forEach(car => {
      setTimeout(() => {
        nextPosition(car.name);
      }, defaultTime);
    });
  }, [first, second]);

  useEffect(() => {
    if (finished) return;
    if (!toFire || !minDistance) return;
    const { name } = minDistance;

    setTimeout(() => {
      const posIndex = getNextDistanceIndex(name);
      const graphIndex = minDistance.distance[posIndex + 1];
      const position = getPositionByGraphIndex(graphIndex);
      if (!position) {
        setFinished(true);
        return;
      }

      const street = graphIndex.charAt(0);

      const finalPos: PositionState = {
        position,
        street,
        name: minDistance.name,
        returning: false,
      };

      updatePosition(minDistance.name, finalPos);
    }, defaultTime);
  }, [first, second]);

  const getNextDistanceIndex = (name: string): number => {
    const [car] = getCar(name);

    const { position } = car;

    if (!minDistance) return -1;

    const graphIndex = getGraphIndexByPosition(position);
    const distanceIndex = minDistance.distance.findIndex(d => d === graphIndex);

    return distanceIndex;
  };

  const addCars = (names: string[]) => {
    if (first && second) return;

    let setters = [setFirst, setSecond];
    if (names.length > 2) names.length = 2;

    for (let i = 0; i < names.length; i++) {
      setters[i]({ ...defaultPosition, name: names[i] });
    }
  };

  const getCar = (
    name: string,
  ): [
    PositionState,
    React.Dispatch<React.SetStateAction<PositionState | undefined>>,
  ] => {
    if (!first && !second) return [defaultPosition, setFirst];

    if (first && first.name === name) return [first, setFirst];
    if (second && second.name === name) return [second, setSecond];

    return [defaultPosition, setFirst];
  };

  const updatePosition = (name: string, position: PositionState) => {
    if (!name) return;

    const [, setCar] = getCar(name);
    setCar(position);
  };

  const getPositionIndex = (name: string): number => {
    const [car] = getCar(name);
    const { position, street } = car;

    return getStreetsPosition()[street].findIndex(
      pos =>
        pos.x === position.x &&
        pos.y === position.y &&
        pos.rotate === position.rotate,
    );
  };

  const getNextIndex = (car: PositionState, index: number): number => {
    const { street } = car;
    const nextIndex = car.returning ? index - 1 : index + 1;

    return nextIndex;
  };

  const nextPosition = (name: string) => {
    const [car] = getCar(name);

    const { position, street } = car;
    const index = getPositionIndex(name);
    const maxIndex = getStreetsPosition()[car.street].length - 1;

    if (index >= maxIndex) {
      const pos = {
        position: getStreetsPosition()[street][index - 1],
        street,
        name: car.name,
        returning: true,
      };
      updatePosition(name, pos);
      return;
    }

    if (position.closePosition && Math.random() < 0.5) {
      const pos = {
        position: getStreetsPosition()[position.closePosition][0],
        street: position.closePosition,
        name: car.name,
        returning: false,
      };
      updatePosition(name, pos);
      return;
    }

    const nextIndex = getNextIndex(car, index);
    if (nextIndex < 0) {
      const pos = {
        position: getStreetsPosition()[street][0],
        street,
        name: car.name,
        returning: false,
      };
      updatePosition(name, pos);
      return;
    }

    const pos = {
      position: getStreetsPosition()[street][nextIndex],
      street,
      name: car.name,
      returning: car.returning,
    };

    updatePosition(name, pos);
  };

  const values: ICar = {
    addCars,
    getCar,
    nextPosition,
    defaultPosition,
    setToFire,
    setMinDistance,
  };

  return <CarContext.Provider value={values}>{children}</CarContext.Provider>;
};

const useCar = () => useContext(CarContext);

export { CarProvider, useCar };
