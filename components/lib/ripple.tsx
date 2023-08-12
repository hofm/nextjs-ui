import * as React from 'react';

interface InjectedProps {
  onRippleClick: (
    event: React.MouseEvent<
      HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
    >
  ) => void;
}

interface RippleProps {
  children(props: InjectedProps): JSX.Element;
}

const Ripple = ({ children }: RippleProps) => {
  const mousePositionToCustomProp = (
    event: React.MouseEvent<
      HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
    >
  ) => {
    const button = event.currentTarget;
    const posX = event.nativeEvent.offsetX;
    const posY = event.nativeEvent.offsetY;

    button.style.setProperty('--x', posX + 'px');
    button.style.setProperty('--y', posY + 'px');

    button.classList.add('pulse');
    button.addEventListener('animationend', () => {
      button.classList.remove('pulse');
    });
  };

  if (typeof children !== 'function') {
    console.warn('children prop must be a function!');
    return null;
  }

  return children({ onRippleClick: mousePositionToCustomProp });
};

export default Ripple;
