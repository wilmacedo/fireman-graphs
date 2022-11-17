import {
  ButtonContainer,
  ButtonContent,
  ButtonIcon,
  ButtonInfo,
  Container,
  InformationContainer,
  MapContainer,
} from './styles';

import { Map } from '../../assets';

import { BsPlay } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { IoLeafOutline } from 'react-icons/io5';

interface ButtonProps {
  name: string;
  description: string;
  Icon: IconType;
  color: 'red' | 'green';
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

  return (
    <Container>
      <InformationContainer>
        <h1>More Then Just a Game</h1>
        <p>&#10192;</p>
        <span>— dream it; invest it —</span>

        <ButtonContainer>
          {buttons.map((button, index) => (
            <ButtonContent key={index}>
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
        <img src={Map} alt="City Map" />
      </MapContainer>
    </Container>
  );
};

export default Home;
