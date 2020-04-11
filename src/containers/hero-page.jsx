import React, { useEffect, useState } from "react";
import { fetchHeros } from "actions/heros";
import "styles/hero-page.scss";

const HeroPage = () => {
  const [heroses, setHeroses] = useState([]);

  useEffect(() => {
    fetchHeros().then(res => {
      console.log(res);
      setHeroses(res);
    });
  }, []);

  return (
    <div className="hero-page page">
      <h1>Hero page</h1>
      <ul className="hero-page__list">
        {heroses.map(hero => (
          <li className="hero-page__list__item" key={hero.id}>
            {hero.first_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroPage;
