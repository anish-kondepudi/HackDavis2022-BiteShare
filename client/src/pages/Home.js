import React from 'react';
import { useSelector } from 'react-redux';
import './styles/Home.scss';
import banner from '../components/images/banner.png';
import { useEffect , useState} from 'react';

const Home = () => {

  const userEmail = useSelector(state => state.email);
  const [username, setUserName] = useState("");
  useEffect(() => {
    if(userEmail) {
      fetch("http://localhost:5000/users/" + userEmail).then(res => res.json()).then(data => {
        setUserName(data[0]["username"]);
      })
    }
  }, []);

  const bodyText = "Welcome to Bite Share, the wonderful website designed to help lower wasted food in the Davis area. This site is designed to combat the large number of food disposed of each day despite being perfectly edible. Hunger is a problem faced by several counties in California, but this website would like to combat it in Davis specifically.";

  return (
    <div className="Home">
      <div className="container">
        <div className="grid">
          <div className="column-xs-12">
            <ul className="slider">
              <li className="slider-item active">
                <div className="grid vertical">
                  <div className="column-xs-12 column-md-2 hide-mobile">
                    <div className="intro">
                      <a href="#">
                        <h1 className="title"><span className="underline">Explore Tokyo</span></h1>
                      </a>
                    </div>
                  </div>
                  <div className="column-xs-12 column-md-10">
                    <div className="image-holder">
                      <img src={banner}/>
                    </div>
                    <div className="grid">
                      <div className="column-xs-12 column-md-9">
                        <div className="intro show-mobile">
                          <a href="#">
                            <h1 className="title"><span className="underline">Welcome{username ? " "+username : ''}!</span></h1>
                          </a>
                        </div>
                        <p className="description">{bodyText}</p>
                      </div>
                    </div>
                  </div>
                </div>
                </li>
            </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;