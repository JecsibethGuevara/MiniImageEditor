import React from 'react';
import {useDroppable} from '@dnd-kit/core';




export function DroppableArea(props) {


  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
    width: '100%',
    height : '100%',
    backgroundColor: 'white', 
    position: 'absolute'

  };
console.log(isOver)
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default DroppableArea;