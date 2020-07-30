import React, {useState, useRef} from 'react';
import {Stage, Layer, Image} from 'react-konva';
import EditorControls from './EditorControls';
const caman = window.Caman;

const Editor = ({label}) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const canvasRef = useRef();
  
  const filterSelect = filter => {
    const canvas = canvasRef.current.canvas._canvas;
    caman(canvas, label, function(){
      this.revert();
      if (selectedFilter === filter || filter === '') {
        return setSelectedFilter('');
      }
      setSelectedFilter(filter);
      this[filter]().render();
    });
  }

  return (
    <div className='Editor'>
      <Stage width={window.innerWidth} height={700}>
        <Layer ref={canvasRef}>
          <Image
            x={0}
            y={0}
            image={label}
          />
        </Layer>
      </Stage>
      <EditorControls
        onFilterSelect={filterSelect}
      />
    </div>
  );
}

export default Editor;