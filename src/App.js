import './App.scss';
import { deleteImage, handleSetImagesFirstTime, handleSubmit } from './functions';
import {useEffect, useState} from "react"
function App() {
  const [images,setImages]=useState([])
  useEffect(()=>{
    handleSetImagesFirstTime(setImages)
  },[])
  return (
    <div>
      <h1>image app</h1>
      <form onSubmit={(event)=>{
        event.preventDefault()
        handleSubmit(event.target,setImages)
      }}>
        <input accept=".jpg,.png,.jfif" type='file' name='image'/>
        <button type='submit'>submit</button>
      </form>
      <div>
        {images.map((image)=>{
          console.log(image)
           return  <div key={Math.random()}>
              <h3>{image.originalName}</h3>
              <img 
                src={image.source}
                //src={process.env.REACT_APP_SERVER_URL+"get?key="+image.key+"&name="+image.originalName} 
                alt={image.originalName}
              />
              <button onClick={()=>{
                deleteImage(image,setImages)
              }}>{"delete "+image.originalName}</button>
            </div>
          })
        }
      </div>
    </div>
  );
}
export default App;
