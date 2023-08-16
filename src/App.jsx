import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import 'react-resizable/css/styles.css';

import Draggable, { DraggableCore } from 'react-draggable';
import { ResizableBox } from 'react-resizable';

let editorModes = {
  SELECT : 'select',
  RESIZE : 'resize',
  SENDUP: 'sendUp',
  SENDOWN : 'sendDown'
}

const Item = (props)  =>{ 
  const [selected, setSelected] = useState(props.selected)
  const [undraggable , setUndraggable] = useState(true)
  const [resizable, setResizable] = useState(true)
  const [zIndex, setZIndex] = useState(props.zIndex)
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(80);
  console.log(selected, props.id)

  const handleResize = (event, { size }) => {
    if(props.mode == 'resize'){
      setWidth(size.width);
      setHeight(size.height);

    }
  }
  const handleSelect = () =>{
    if(props.mode === 'select'){
      setUndraggable(!undraggable) 
      console.log(selected)
    }
  }
  const sendUp = () =>{
    setZIndex(zIndex + 10)
  }
  const sendDown = () =>{
    setZIndex(zIndex - 10)
  }
  let style ={
    padding: "1rem",
    position: 'absolute',
    backgroundImage: `url(${props.image})`,
    position: 'absolute', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'fill',
    maskImage: `url(${props.image})`,
    maskMode: 'alpha',
    maskPosition: 'center',
    maskSize: 'cover',
    zIndex: zIndex
  }
  const handleClick = () =>{
    setSelected(true)
    if(selected && props.mode == 'select'){
      console.log('select Mode')
      setResizable(true)
      handleSelect()
    } else if (selected && props.mode == 'resize'){
      setUndraggable(true) 
      setResizable(false)
      handleResize()
    } else if (selected && props.mode == 'sendUp'){
      sendUp()
    }else if (selected && props.mode == 'sendDown'){
      sendDown()
    }
    // if(props.mode == 'select'){
    //   setResizable(false)
    //   handleSelect()
    // }else if(props.mode == 'resize'){
    //   setResizable(false)
    //   setSelected(true)
    // }
  }
  
  return(
    
    <Draggable disabled={undraggable}>
      <ResizableBox  height={height}  onClick={()=>{handleClick()}} width={width}  draggableOpts={{ disabled: resizable }} onResize={handleResize} style={style} />
    </Draggable>

  )
}

const  App = () => {
  const [currentMode, setCurrentMode] = useState(editorModes.SELECT)

  const [items, setItems] = useState([

    {id: 'item1',
     key: 1,
     image: 'public/imageOne.png',
     zIndex : 10,
     selected: false
    },
    {id: 'item2',
     key: 2,
     image: 'public/imageTwo.png',
     zIndex : 20,
     selected: false
    }
    
  ])

  const handleClick = (num) =>{
    console.log(items) 
  }
                
  const  Menu = () =>{

    function saveAsImage() {
      const element = document.querySelector('.canvas');
      html2canvas(element, {
        backgroundColor: 'transparent'
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }

   

    const onSelect =  () =>{
      setCurrentMode(editorModes.SELECT)
      console.log(currentMode)
    }
    const onResize =  () =>{
      setCurrentMode(editorModes.RESIZE)
      console.log(currentMode)
    }
    const onSendUp =  () =>{
      setCurrentMode(editorModes.SENDUP)
      console.log(currentMode)
    }
    const onSendDown=  () =>{
      setCurrentMode(editorModes.SENDOWN)
      console.log(currentMode)
    }
    const onUploadPic = (e) =>{
      let target =  document.getElementById('image')
      target ? console.log(target.value) : null
    }
    return(
      <div>
        <ul>
          <li onClick={onSelect}>Select</li>
          <li  onClick={onResize}>Resize</li>
          <li onClick={onSendUp}>Send Up</li>
          <li onClick={onSendDown}>Send Down</li>
          <li  >
            <input onChange={() => {onUploadPic()}} type="file" name="image" id="image" />
          </li>
          <li onClick={saveAsImage}>Send Down</li>
        </ul>
      </div>
    )
  } 
  
  return (
    <div className="all">
      <div className='canvas' style={{width: '500px', height: '500px', backgroundColor: 'transparent', position: 'relative'}}>
        <Item onClick={handleClick(0)} selected={items[0].selected} mode={currentMode} key={items[0].key} image={items[0].image} zIndex={items[0].zIndex}/>
        <Item onClick={handleClick(1)} selected={items[1].selected} mode={currentMode} key={items[1].key} image={items[1].image} zIndex={items[1].zIndex}/>

      </div>
      <Menu/>
    </div>
   
  );


};



export default App;