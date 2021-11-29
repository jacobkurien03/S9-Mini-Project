import React from "react";
import { Link } from "react-router-dom";
//import { Route } from "react-router-dam";
import "./home.css";
import User from "../assets/imguser.png";
import Vege from "../assets/vege.png";
import Frui from "../assets/frui.jpg";
import Grain from "../assets/grain.jpg";
import milk from "../assets/milk.jpg";
import Baked from "../assets/baked.jpg";
import { Header } from '../components/common'



const Home = () => {
  return (
    <div>
      <Header></Header>
      <div>
        <h1>
          Jacobs Market
        </h1>
      </div>
      <div className="icon-list3">
        <div className="my-icon2">
          <img src={Vege} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>vegetables</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={Frui} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Fruits</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={Grain} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Grains</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={milk} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Milk</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={Baked} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Baked Goods</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
