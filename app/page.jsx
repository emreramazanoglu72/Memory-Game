"use client";
import React, { useEffect, useState } from "react";
import { images } from "../utils.js";

const page = () => {
  const [gameCard, setGameCard] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setGameCard(images.sort(() => Math.random() - 0.5));
  }, []);

  const [selectItem, setSelectItem] = useState(-1);

  const selectCard = (id) => {
    if (selectItem === -1) {
      gameCard[id].select = "active";
      setGameCard([...gameCard]);
      setSelectItem(id);
    } else {
      if (gameCard[id].id == gameCard[selectItem].id) {
        gameCard[id].select = "success";
        gameCard[selectItem].select = "success";
        setGameCard([...gameCard]);
        setSelectItem(-1);
      } else {
        gameCard[selectItem].select = "";
        gameCard[id].select = "wrong";
        gameCard[selectItem].select = "wrong";
        setDisabled(true);
        setGameCard([...gameCard]);
        setTimeout(() => {
          gameCard[id].select = "";
          gameCard[selectItem].select = "";
          setGameCard([...gameCard]);
          setDisabled(false);
          setSelectItem(-1);
        }, 1000);
      }
    }
  };

  return (
    <div className="app-content">
      <div className="content">
        <div className="title ">Memory Game</div>
        <div className="game">
          {gameCard.map((item, key) => (
            <button
              disabled={disabled}
              className={`card  card-${item.select}`}
              onClick={() => selectCard(key)}
              id={item.id}
              key={key}
            >
              <img src={item.image} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
