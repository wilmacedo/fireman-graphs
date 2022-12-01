import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import {
  ButtonContainer,
  ButtonContent,
  ButtonIcon,
  ButtonInfo,
  CarImage,
  Container,
  InformationContainer,
  MapContainer,
  Position,
} from './styles';

import { Car, getStreetsPosition, PositionDetail } from '../../utils';

import { Map2, RedCar, YellowCar } from '../../assets';

import { BsPlay } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { IoLeafOutline } from 'react-icons/io5';

interface ButtonProps {
  name: string;
  description: string;
  Icon: IconType;
  color: 'red' | 'green';
}

interface PositionState {
  position: PositionDetail;
  street: string;
}

const Home: React.FC = () => {
  const buttons: ButtonProps[] = [
    {
      name: "Let's Play",
      description: 'New game',
      Icon: BsPlay,
      color: 'red',
    },
    {
      name: 'Learn Algorithm',
      description: 'View more about',
      Icon: IoLeafOutline,
      color: 'green',
    },
  ];

  const defaultPositions = {
    [Car.YELLOW]: {
      position: getStreetsPosition()['A'][0],
      street: 'A',
    },
    [Car.RED]: {
      position: getStreetsPosition()['B'][0],
      street: 'B',
    },
  };

  const [yellow, setYellow] = useState<PositionState>(
    defaultPositions[Car.YELLOW],
  );
  const [fire, setFire] = useState({ x: 0, y: 0 });
  // const [red, setRed] = useState<PositionState>(defaultPositions[Car.RED]);

  useEffect(() => {
    // if (positionIndex('A') === 0) {
    //   return;
    // }

    setTimeout(() => {
      nextPosition(yellow, setYellow);
    }, 2 * 1000);
  }, [yellow]);

  const positionIndex = (position: PositionDetail, street: string) =>
    getStreetsPosition()[street].findIndex(
      pos =>
        pos.x === position.x &&
        pos.y === position.y &&
        pos.rotate === position.rotate,
    );

  const nextPosition = ({ position, street }: any, setState: any) => {
    const index = positionIndex(position, street);
    const maxIndex = getStreetsPosition()[street].length - 1;

    if (index >= maxIndex) {
      setState(defaultPositions['yellow']);
      return;
    }

    if (position.closePosition && Math.random() < 0.5) {
      setState({
        position: getStreetsPosition()[position.closePosition][0],
        street: position.closePosition,
      });
      return;
    }

    setState((prevState: any) => ({
      ...prevState,
      position: getStreetsPosition()[street][index + 1],
    }));
  };

  const handleStart = () => {
    const randomStreet = Math.floor(
      Math.random() * Object.keys(getStreetsPosition()).length,
    );
    const street = Object.keys(getStreetsPosition())[randomStreet];

    const randomWay = Math.floor(
      Math.random() * Object.keys(getStreetsPosition()[street]).length,
    );

    const pos = getStreetsPosition()[street][randomWay];

    setFire({ x: pos.x, y: pos.y });
  };

  return (
    <Container>
      <InformationContainer>
        <h1>More Then Just a Game</h1>
        <p>&#10192;</p>
        <span>— dream it; invest it —</span>

        <ButtonContainer>
          {buttons.map((button, index) => (
            <ButtonContent key={index} onClick={() => handleStart()}>
              <ButtonIcon>
                <ButtonIcon buttonColor={button.color}>
                  <button.Icon />
                </ButtonIcon>
              </ButtonIcon>

              <ButtonInfo>
                <span>{button.name}</span>
                <p>{button.description}</p>
              </ButtonInfo>
            </ButtonContent>
          ))}
        </ButtonContainer>
      </InformationContainer>

      <MapContainer>
        <motion.div
          // animate={{ x: 265, y: -230 }}
          animate={{ x: yellow.position.x, y: yellow.position.y }}
          transition={{ ease: 'easeInOut', duration: 2 }}
        >
          <CarImage
            src={YellowCar}
            alt="Yellow Car"
            rotate={yellow.position.rotate}
          />
        </motion.div>

        <motion.div animate={{ x: fire.x, y: fire.y }}>
          <Position />
        </motion.div>

        <img src={Map2} alt="City Map" />
      </MapContainer>
    </Container>
  );
};

export default Home;
