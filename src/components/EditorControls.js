import React, {useRef} from 'react';

const filters = ['vintage', 'lomo', 'clarity', 'sinCity', 'sunrise', 'crossProcess', 'orangePeel', 'love', 'grungy', 'jarques', 'pinhole', 'oldBoot', 'glowingSun', 'hazyDays', 'herMajesty', 'nostalgia', 'hemingway', 'concentrate'];

const EditorControls = ({onFilterSelect}) => {
  const refs = useRef(filters.map(i => React.createRef()));
  const canvasRef = useRef();

  return (
    <div className='EditorControls'>
      <div className='EditorControls__filters'>
        <button onClick={() => onFilterSelect('')}>
          <p>noFilter</p>
        </button>
        {filters.map((filter, index) => (
          <button key={filters[index]} onClick={() => onFilterSelect(filter)}>
            <p>{filters[index]}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EditorControls;