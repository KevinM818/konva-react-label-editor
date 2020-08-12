import React, {Fragment, useRef, useEffect} from 'react';
import {Text, Transformer} from 'react-konva';

const DraggableText = ({textProps, isSelected, onSelect, onChange}) => {
  const textRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (!isSelected) {return;}
    trRef.current.setNode(textRef.current);
    trRef.current.getLayer().batchDraw();
  }, [isSelected]);

  return (
    <Fragment>
      <Text
        {...textProps}
        onClick={onSelect}
        onTap={onSelect}
        ref={textRef}
        draggable
        onDragEnd={e => onChange({
          ...textProps,
          x: e.target.x(),
          y: e.target.y()
        })}
        onTransformEnd={e => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...textProps,
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

export default DraggableText;