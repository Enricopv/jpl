import React, { useLayoutEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const IMAGE_HEIGHT = 955;
const IMAGE_WIDTH = 4683;
const imageRatio = IMAGE_WIDTH / IMAGE_HEIGHT;
const BROWSER_WIDTH = window.innerWidth;
const BROWSER_HEIGHT = window.innerHeight;

export function Index() {
  const [clickLocation, setClickLocation] = React.useState<{
    clickX: number;
    clickY: number;
  }>();

  const onClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    console.log('e', e.pageX);
    setClickLocation({
      clickX: (e.pageX / BROWSER_WIDTH) * 100,
      clickY: (e.pageY / BROWSER_HEIGHT) * 100,
    });
  };

  return (
    <div>
      <div>
        <img
          onMouseDown={onClick}
          src="/oil_map.png"
          style={{
            width: '100%',
            height: 'auto',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.3)',
            zIndex: 0,
            opacity: 0.2,
          }}
          alt="oil map"
        />
        {clickLocation && (
          <MapPin
            location={{ x: clickLocation.clickX, y: clickLocation.clickY }}
          />
        )}
      </div>
      <pre>
        <div>BROWSER_WIDTH: {BROWSER_WIDTH}</div>
        <div>BROWSER_HEIGHT: {BROWSER_HEIGHT}</div>
        <div>clickLocation: {JSON.stringify(clickLocation, null, 1)}</div>
      </pre>
    </div>
  );
}

const FLAG_HEIGHT = 80;
const MapPin = (props: {
  location: {
    x: number;
    y: number;
  };
}) => {
  const [flagHeight, setFlagHeight] = React.useState(0);
  const [flagWidth, setFlagWidth] = React.useState(0);

  const styleProps = useSpring({ height: flagHeight });
  const flagWidthStyle = useSpring({
    width: flagWidth,
    minWidth: flagWidth,
    delay: 500,
  });

  React.useEffect(() => {
    if (flagHeight === FLAG_HEIGHT) {
      setFlagWidth(200);
    } else {
      setFlagWidth(0);
    }
  }, [flagHeight]);

  return (
    <div
      onClick={() => {
        setFlagHeight(flagHeight === FLAG_HEIGHT ? 0 : FLAG_HEIGHT);
      }}
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'dodgerblue',
        borderRadius: 10,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        left: `${props.location.x}%`,
        top: `${props.location.y}%`,
        zIndex: 4,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <animated.div
        style={{
          ...styleProps,
          backgroundColor: 'red',
          width: 3,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <animated.div
          style={{ ...flagWidthStyle, height: 50, overflow: 'hidden' }}
        >
          <div>Hey Jon</div>
          <div>You handsome devil</div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default Index;
