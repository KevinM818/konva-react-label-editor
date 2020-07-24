import React from 'react';
import {Stage, Layer, Rect} from 'react-konva';

const KonvaTest = () => {
  return (
    <div className="KonvaTest">
      <h1>Konva Test</h1>
      <Stage width={window.innerWidth - 100} height={800}>
        <Layer>
          <Rect 
            x={100}
            y={100}
            width={300}
            height={400}
            fill='green'
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default KonvaTest;