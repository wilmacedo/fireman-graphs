import { IconType } from 'react-icons/lib';
import { Container, ContentIcon, Info } from './styles';

export interface ButtonProps {
  name: string;
  description: string;
  Icon: IconType;
  color: 'red' | 'green';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  name,
  description,
  Icon,
  color,
  onClick,
}) => {
  const handleClick = () => {
    if (!onClick) {
      return;
    }

    onClick();
  };

  return (
    <Container onClick={handleClick}>
      <ContentIcon>
        <ContentIcon buttonColor={color}>
          <Icon />
        </ContentIcon>
      </ContentIcon>

      <Info>
        <span>{name}</span>
        <p>{description}</p>
      </Info>
    </Container>
  );
};

export default Button;
