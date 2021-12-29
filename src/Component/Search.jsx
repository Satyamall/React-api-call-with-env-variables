import React, { useState } from "react";
import axios from "axios";

export default function Search(){
  const [userInput, setUserInput] = useState("Arrabiata");
  const [data, setData] = useState([]);

  var link = process.env.REACT_APP_SEARCH_RESTAURANT;

  const handleSearch = (userInput) => {
    
    console.log(link);
    const config = {
      method: "get",
    //   url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`
       url: link + `/json/v1/1/search.php?s=${userInput}`
    };
    return axios(config);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    // console.log(userInput);
    handleSearch(userInput).then((res) => {
      setData(res.data.meals);
    //   console.log(data);
    });
  };

  return (
    <>
      <h1>{link}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "white",
          }}
        >
          <select
            name="city"
            id="city"
            style={{
              fontSize: "18px",
            }}
          >
            <option value="Lucknow">Lucknow</option>
            <option value="Varanasi">Varansi</option>
            <option value="Siddharthnagar">Siddharthnagar</option>
            <option value="Basti">Basti</option>
            <option value="Delhi">Delhi</option>
          </select>
          <input
            type="text"
            onChange={handleChange}
            style={{
              fontSize: "18px",
            }}
            placeholder="| Search for cuisine or a dish"
          />
          <input
            type="submit"
            onClick={handleSubmit}
            value="SEARCH"
            style={{
              fontSize: "18px",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "86%",
          margin: "auto",
          gap: "1rem",
          marginTop: "50px"
        }}
      >
        {data?.map((item) => {
          return (
            <div
              style={{
                width: "250px",
                border: "1px solid gray",
                borderRadius: "10px",
                background: "gray",
              }}
              key={item.idMeal}
            >
              <div>
                <img
                  src={item.strMealThumb}
                  alt="img"
                  widht="300px"
                  height="250px"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <p style={{ paddingLeft: "10px" }}>Meal ID: {item.idMeal}</p>
              <p style={{ paddingLeft: "10px" }}>Meal Name: {item.strMeal}</p>
              <p style={{ paddingLeft: "10px" }}>
                Meal Category: {item.strCategory}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};