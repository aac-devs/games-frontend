import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { backgroundColor } from '../global-styles';

const animate = keyframes`
  0% {
    transform: scale(1)
  }
  80%, 100% {
    transform: scale(0)
  }
`;

const Container = styled.div`
  background-color: #000;
  opacity: 0.7;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.z};
`;

const Loader = styled.div`
  visibility: ${(props) => props.visible};
  position: relative;
  width: 40px;
  height: 40px;
`;

const color = backgroundColor.secondary.normal;
const StyledSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
  animation-play-state: ${(props) => props.state};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${color};
    box-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color},
      0 0 60px ${color}, 0 0 80px ${color}, 0 0 100px ${color};
    animation: ${animate} 1s linear infinite;
    animation-delay: calc(0.05s * var(--i));
    animation-play-state: ${(props) => props.state};
  }
`;

const dot = [];
for (let i = 0; i < 20; i += 1) {
  dot.push(i);
}

const Loading = ({ animation }) => {
  const state = animation ? 'running' : 'paused';
  const visible = animation ? 'visible' : 'hidden';
  const z = animation ? '100' : '-1';
  return (
    <Container z={z}>
      <Loader visible={visible}>
        {dot.map((i) => (
          <StyledSpan key={i} state={state} style={{ '--i': `${i + 1}` }} />
        ))}
      </Loader>
    </Container>
  );
};

Loading.propTypes = {
  animation: PropTypes.bool,
};

Loading.defaultProps = {
  animation: false,
};

export default Loading;
