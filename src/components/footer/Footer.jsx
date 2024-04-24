import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { InstagramOutlined ,FacebookOutlined} from '@ant-design/icons';
import "./footer.css";

const Footer = () => {
  const { isLightMode } = useContext(ThemeContext);
  return (
    <div
      style={{
        background: isLightMode ? "white" : "#323c4d",
        color: isLightMode ? "#323c4d" : "white",
      }}
      className="footer-part"
    >
      <div className="movies">
        <ul className="list" >
          <h4>About Us</h4>
          <h1 className="cinemaTitle">Cinema +</h1>
          <p className="description">
            At Cinema +, we believe in the transformative power of cinema. As
            avid movie enthusiasts, we strive to create an immersive and
            unforgettable cinematic experience for our audience. From the latest
            blockbusters to timeless classics, our curated selection offers
            something for every movie lover. Nestled in the heart of Tirane, our
            state-of-the-art theaters provide the perfect ambiance for escapism
            and entertainment. With cutting-edge technology like 3D and 8D, we
            aim to transport our viewers into captivating worlds, where stories
            come to life on the big screen. Join us on a journey through the
            magic of cinema, where every visit promises an adventure worth
            remembering
          </p>
        </ul>
      </div>
      
      <div className="network">
        <h4>Follow us</h4>
        <ul  style={{
          background: isLightMode ? "white" : "#323c4d",
          color: isLightMode ? "#323c4d" : "white",
        }} className="list">
          <li><InstagramOutlined /></li>
          <li><FacebookOutlined /></li>
        </ul>
      </div>
      <hr style={{color:'white'}}/>
      <p style={{color:'blue',textAlign:'center'}}>@V2024</p>
    </div>
  );
};

export default Footer;
