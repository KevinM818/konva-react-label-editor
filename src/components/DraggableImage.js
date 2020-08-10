import React, {Fragment} from 'react';
import {Image} from 'react-konva';

const DraggableImage = ({imageProps, isSelected, onSelect}) => {

  return (
    <Fragment>
      <Image
        {...imageProps}
        onClick={onSelect}
        onTap={onSelect}
        draggable
      />
    </Fragment>
  );
}

export default DraggableImage;