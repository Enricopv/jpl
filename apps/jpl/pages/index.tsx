import React, { useLayoutEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const IMAGE_HEIGHT = 955;
const IMAGE_WIDTH = 4683;
const imageRatio = IMAGE_WIDTH / IMAGE_HEIGHT;

export function Index() {
  const [clickLocation, setClickLocation] = React.useState<{
    clickX: number;
    clickY: number;
  }>();
  const BROWSER_WIDTH = process.browser && window.innerWidth;
  const BROWSER_HEIGHT = process.browser && window.innerHeight;

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
    </div>
  );
}

const FLAG_HEIGHT = 80;
const FLAG_WIDTH = 200;
const MapPin = (props: {
  location: {
    x: number;
    y: number;
  };
}) => {
  const [flagHeight, setFlagHeight] = React.useState(0);
  const [flagWidth, setFlagWidth] = React.useState(0);
  const [delay, setDelay] = React.useState(500);

  const styleProps = useSpring({ height: flagHeight });
  const flagWidthStyle = useSpring({
    width: flagWidth,
    minWidth: flagWidth,
    delay,
  });

  React.useEffect(() => {
    if (flagHeight === FLAG_HEIGHT) {
      setDelay(500);
      setFlagWidth(FLAG_WIDTH);
    } else {
      setDelay(0);
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
          width: 3,
          transform: `translate(-50%, -50%)`,
          background: 'linear-gradient(#3ED6CA, #B7E1DD)',
          // background: 'linear-gradient(yellow, green)',
        }}
      >
        <animated.div
          style={{ ...flagWidthStyle, overflow: 'hidden', paddingLeft: 4 }}
        >
          <div style={{ width: FLAG_WIDTH }}>
            <div style={{ color: '#3ED6CA', fontWeight: 'bold' }}>Whoa bro</div>
            <div style={{}}>
              <span style={{ fontWeight: 'bold', marginRight: 4 }}>
                March 24, 1988
              </span>{' '}
              something totally gnar happened.
            </div>
          </div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default Index;
