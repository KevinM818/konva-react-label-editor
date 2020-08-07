import React from 'react';
import banner from './../assets/banners.png';
import bell from './../assets/bell.png';
import gift from './../assets/gift.png';
import hat from './../assets/hat.png';
import mug from './../assets/mug.png';

const filters = ['vintage', 'lomo', 'clarity', 'sinCity', 'sunrise', 'crossProcess', 'orangePeel', 'love', 'grungy', 'jarques', 'pinhole', 'oldBoot', 'glowingSun', 'hazyDays', 'herMajesty', 'nostalgia', 'hemingway', 'concentrate'];
const icons = [banner, bell, gift, hat, mug];

const EditorControls = ({onFilterSelect, onIconSelect}) => {

  return (
    <div className='EditorControls'>
      <div className="EditorControls__icons">
        {icons.map((icon, index) => (
          <button key={`Icon-${index}`} onClick={() => onIconSelect(icon)}>
            <img src={icon} alt={`Icon-${index}`} />
          </button>
        ))}
      </div>
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