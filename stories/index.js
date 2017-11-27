import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import { Button, Welcome } from '@storybook/react/demo';

import Regl, { Draw } from '../src/';

const colorRange = {
  range: true,
  min: 0,
  max: 1,
  step: 0.1
};



storiesOf('Regl', module)
  .addDecorator(withKnobs)
  .add('basic canvas', () => {
    return (
      <Regl width={number('Width', 400)}
            height={number('Height', 200)}
            color={[
              number('R', 0.40625, colorRange),
              number('G', 0.94921, colorRange),
              number('B', 0.996, colorRange),
              1]}
      />
    );
  });


storiesOf('Draw/2D', module)
  .addDecorator(withKnobs)
  .add('static', () => {
    return (
      <Regl
          width={window.innerWidth}
          height={window.innerHeight}
          color={[0,0,0,1]}
      >
      <Draw
        vert={`
          precision mediump float;
          attribute vec2 position;
          void main () {
            gl_Position = vec4(position, 0, 1);
          }`}

        frag={`
          precision mediump float;
          uniform vec4 color;
          void main () {
            gl_FragColor = color;
          }`}

        attributes={{
          position: [
            [-1, 0],
            [0, -1],
            [1, 1]
          ]
        }}
        uniforms={{
          color: [1, 0, 0, 1]
        }}
        count={3}
      />
      </Regl>
    );
  });
