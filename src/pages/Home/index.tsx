import { useState, useEffect, Fragment } from 'react';

import { motion } from 'framer-motion';

import { Fire, FiremanTruck, FiremanTruck2, Map2 } from '../../assets';

import { BsPlay } from 'react-icons/bs';
import { IoLeafOutline } from 'react-icons/io5';
import {
  ButtonContainer,
  CarImage,
  CityContainer,
  Container,
  Content,
  DistanceContainer,
  FireImage,
  GraphContainer,
  GraphPoint,
  Separator,
  Subtitle,
  Title,
} from './styles';
import Button, { ButtonProps } from '../../components/Button';
import { useCar } from '../../contexts/Car';
import {
  getConfigGraph,
  getGraphIndexByPosition,
  getStreetsPosition,
  randomPosition,
} from '../../utils';
import { IDistance, IRandomPosition, PositionState } from '../../types';

const Home: React.FC = () => {
  const cars = [
    { name: 'fireman', Image: FiremanTruck },
    { name: 'fireman2', Image: FiremanTruck2 },
  ];

  const [showGraph, setShowGraph] = useState(false);
  const [fire, setFire] = useState<IRandomPosition | undefined>();
  const { addCars, getCar, setToFire, setMinDistance } = useCar();

  const [distanceInfo, setDistanceInfo] = useState<IDistance | undefined>();

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

  const startGame = () => {
    const pos = randomPosition();
    setFire(pos);

    const graph = getConfigGraph(getPointPosition());
    let fireInGraph = getGraphIndexByPosition(pos.position);

    let distances: IDistance[] = [];

    cars.forEach(c => {
      const [car] = getCar(c.name);
      const distance = graph.Dijkstra(
        getGraphIndexByPosition(car.position),
        fireInGraph,
      );

      distances.push({ distance, name: car.name });
    });

    if (distances.length === 0) {
      console.warn('Nenhum caminhão disponível.');
      return;
    }

    let distancesValues = distances.map(d => d.distance.length);
    let minDistanceValue = Math.min(...distancesValues);
    let minDistance = distances.find(
      d => d.distance.length === minDistanceValue,
    );

    setDistanceInfo(minDistance);
    setMinDistance(minDistance);
    setToFire(true);
  };

  const buttons: ButtonProps[] = [
    {
      name: 'Começar',
      description: 'Gere um novo incêndio',
      Icon: BsPlay,
      color: 'red',
      onClick: startGame,
    },
    {
      name: 'Grafo',
      description: 'veja o grafo',
      Icon: IoLeafOutline,
      color: 'green',
      onClick: handleGraph,
    },
  ];

  const parseCarName = (name: string) => {
    if (name.includes('2')) {
      return 'Fireman 2';
    }

    return 'Fireman';
  };

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
        {distanceInfo && (
          <DistanceContainer>
            <div>
              <span>Caminhão:</span>
              <p>{parseCarName(distanceInfo.name)}</p>
            </div>
            <div>
              <span>Caminho:</span>
              <p>{distanceInfo.distance.join(' => ')}</p>
            </div>
          </DistanceContainer>
        )}
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
        {fire && (
          <motion.div animate={{ x: fire.position.x, y: fire.position.y }}>
            <FireImage src={Fire} alt="Fire" />
          </motion.div>
        )}
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
