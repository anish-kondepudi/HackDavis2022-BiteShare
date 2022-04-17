import React from 'react';
import './styles/About.css';

const About = () => {
  return (
    <div className="About">
      <div id = "food_waste">
        <img src = "https://angeles.sierraclub.org/sites/angeles.sierraclub.org/files/FoodWaste.png"/>
      </div>
      <h2 id = "mission"> Our Mission </h2>
      <div class="dropcap clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
        <p> Hello! Welcome to Bite Share, the wonderful website designed to help lower wasted food in the Davis area. This site is designed
        to combat the large number of food disposed of each day despite being perfectly edible. Hunger is a problem faced by several 
        counties in California, but this website would like to combat it in Davis specifically.</p>
        
        <p>
        After registering an account, you have the option of either posting extra food you have, searching for food if you would like some
        but are unable to, or just want to see what people are leaving behind. This site is not designed just for individuals, as food banks 
        and the like are also hosted and noted for those who would like that. 
        </p> 

        <p>
        After selecting what food you would like to pick up, a map will pop up showing you where to go to receive thefood, alongside a text to 
        both the person picking it up and the person offering, allowing for both parties to be informed of the coming interaction.

        We hope that this mitigates at least some of the food surplus and hunger across Davis and that social welfare is improved.
        Thanks for reading!
        </p>
      </div>
    </div>
  );
}

export default About;