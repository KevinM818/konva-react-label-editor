import React from 'react';
import banner from './../assets/banners.png';
import bell from './../assets/bell.png';
import gift from './../assets/gift.png';
import hat from './../assets/hat.png';
import mug from './../assets/mug.png';

const filters = ['vintage', 'lomo', 'clarity', 'sinCity', 'sunrise', 'crossProcess', 'orangePeel', 'love', 'grungy', 'jarques', 'pinhole', 'oldBoot', 'glowingSun', 'hazyDays', 'herMajesty', 'nostalgia', 'hemingway', 'concentrate'];
const icons = [banner, bell, gift, hat, mug];
const colors = [{color: 'black', value: '#000000'}, {color: 'red', value: '#ff0000'}, {color: 'green', value: 'green'}, {color: 'blue', value: '#0000ff'}]
const fonts = [{font: 'Liana', value: 'liana'}, {font: 'IvyMode', value: 'ivymode'}, {font: 'Mr Eaves', value: 'mr-eaves-modern'}]
const fontStyles = ['normal', 'italic'];

const EditorControls = ({text, onFilterSelect, onIconSelect, onTextChange, textColorChange, textFontChange, textStyleChange, textUnderline}) => {

  return (
    <div className='EditorControls'>
      <div className="EditorControls__text">
        <textarea value={text.text} onChange={e => onTextChange(e.target.value)}></textarea>
        <div className="EditorControls__text--colors">
          {colors.map(color => (
            <button key={color.color} onClick={() => textColorChange(color.value)}>
              {color.color}
            </button>
          ))}
        </div>
        <div className="EditorControls__text--fonts">
          {fonts.map(font => (
            <button key={font.font} onClick={() => textFontChange(font.value)}>
              {font.font}
            </button>
          ))}
        </div>
        <div className="EditorControls__text--styles">
          {fontStyles.map(style => (
            <button key={style} onClick={() => textStyleChange(style)}>
              {style}
            </button>
          ))}
          <button onClick={textUnderline}>underline</button>
        </div>
      </div>
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