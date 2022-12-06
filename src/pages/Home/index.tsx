import { useState, useEffect, Fragment } from 'react';

import { motion } from 'framer-motion';

import { FiremanTruck, FiremanTruck2, Map2 } from '../../assets';

import { BsPlay } from 'react-icons/bs';
import { IoLeafOutline } from 'react-icons/io5';
import {
  ButtonContainer,
  CarImage,
  CityContainer,
  Container,
  Content,
  GraphContainer,
  GraphPoint,
  Separator,
  Subtitle,
  Title,
} from './styles';
import Button, { ButtonProps } from '../../components/Button';
import { useCar } from '../../contexts/Car';
import { getStreetsPosition } from '../../utils';
import { PositionState } from '../../types';

const Home: React.FC = () => {
  const cars = [
    { name: 'fireman', Image: FiremanTruck },
    { name: 'fireman2', Image: FiremanTruck2 },
  ];

  const [showGraph, setShowGraph] = useState(false);
  const { addCars, getCar } = useCar();

  useEffect(() => {
    const carsName = cars.map(car => car.name);
    addCars(carsName);
  }, []);

  const getStableCar = (name: string): PositionState => {
    const [car] = getCar(name);

    return car;
  };

  const getPointPosition = () => {
    let points: any[] = [];

    Object.keys(getStreetsPosition()).forEach(key => {
      for (let i = 0; i < getStreetsPosition()[key].length; i++) {
        points = [
          ...points,
          { ...getStreetsPosition()[key][i], key: `${key}${i + 1}` },
        ];
      }
    });

    return points;
  };

  const handleGraph = () => {
    setShowGraph(!showGraph);
  };

  const buttons: ButtonProps[] = [
    {
      name: 'Começar',
      description: 'Gere um novo incêndio',
      Icon: BsPlay,
      color: 'red',
    },
    {
      name: 'Grafo',
      description: 'veja o grafo',
      Icon: IoLeafOutline,
      color: 'green',
      onClick: handleGraph,
    },
  ];

  return (
    <Container>
      <Content>
        <Title>Fireman Graphs</Title>
        <Separator>
          <span>&#10192;</span>
        </Separator>
        <Subtitle>— o chamado do menor caminho —</Subtitle>

        <ButtonContainer>
          {buttons.map((button, index) => (
            <Button {...button} key={index} />
          ))}
        </ButtonContainer>
      </Content>

      <CityContainer>
        {cars.map(({ name, Image }, index) => (
          <motion.div
            key={index}
            animate={{
              x: getStableCar(name).position?.x,
              y: getStableCar(name).position?.y,
            }}
            transition={{ ease: 'easeInOut', duration: 2 }}
          >
            <CarImage
              src={Image}
              alt={`${name} car`}
              rotate={getStableCar(name).position?.rotate}
              returning={getStableCar(name).returning}
            />
          </motion.div>
        ))}
        {showGraph && (
          <Fragment>
            <GraphContainer />
            {getPointPosition().map((pos, index) => (
              <motion.div
                key={index}
                animate={{ x: pos.x, y: pos.y }}
                transition={{ type: 'tween' }}
              >
                <GraphPoint>
                  <span>{pos.key}</span>
                </GraphPoint>
              </motion.div>
            ))}
          </Fragment>
        )}
        <img src={Map2} alt="City Map" />
      </CityContainer>
    </Container>
  );
};

export default Home;
