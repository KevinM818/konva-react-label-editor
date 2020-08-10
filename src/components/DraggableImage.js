import React, {Fragment, useRef, useEffect} from 'react';
import {Image, Transformer} from 'react-konva';

const DraggableImage = ({imageProps, isSelected, onSelect, onChange}) => {
  const imageRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (!isSelected) {return;}
    trRef.current.setNode(imageRef.current);
    trRef.current.getLayer().batchDraw();
  }, [isSelected]);

  return (
    <Fragment>
      <Image
        {...imageProps}
        onClick={onSelect}
        onTap={onSelect}
        ref={imageRef}
        draggable
        onDragEnd={e => onChange({
          ...imageProps,
          x: e.target.x(),
          y: e.target.y()
        })}
        onTransformEnd={e => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imageProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {return oldBox;}
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
}

export default DraggableImage;