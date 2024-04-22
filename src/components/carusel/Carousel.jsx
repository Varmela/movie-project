import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import './carousel.css';
import image1 from './foto.png';
import image2 from './foto4.png';
import image3 from './foto5.png';
import image4 from './foto6.png';

function CarouselComponent() {
  const {isLightMode} = useContext(ThemeContext);
  return (<>
    
  
    <div style={{
      background: isLightMode ? "white" : "#0d262f",
      color: isLightMode ? "#0d262f" : "white",
    }} className = 'info-part'>
    <h1 className='cinema-title'>Cinema +</h1>
    <p className='cinema-description'>Welcome to a world where every frame tells a story. Step into the magic of Cinema +.<br/> Lights, camera, action!</p>
    </div>
    


    </>
  )
}

export default CarouselComponent;