import React from "react";
import "./DetailedRecipee.css";
import Recipee from "./Recipee";
import HomeBackground from "./HomeBackground.jpg";

function DetailedRecipee(props) {
  const {id} = props.match.params;
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={HomeBackground} alt=""></img>

        <div className="home_row">
          <Recipee
            id = {id}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailedRecipee;
