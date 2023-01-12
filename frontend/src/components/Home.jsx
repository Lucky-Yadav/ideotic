import axios from "axios";
import React, { useEffect, useState } from "react";
import waitgif from "../images/ImpassionedAfraidDipper-size_restricted.gif";

const Home = () => {
  const setEffect = true;
  const [elementa, setelement] = useState("");
  const [image, setimage] = useState("");
  const [list, setlist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isfetching, setisfetching] = useState(false);

  useEffect(() => {
    setisfetching(true);
    axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
      console.log(res);
      setlist(Object.keys(res.data.message));
      setisfetching(false);
    });
  }, [setEffect]);
  console.log(list);
  const getdata = (name) => {
    setisLoading(true);
    console.log(name);
    axios.get(`https://dog.ceo/api/breed/${name}/images/random`).then((res) => {
      console.log(res);
      setimage(res.data.message);
      setisLoading(false);
    });
  };

  return (
    <div className="home">
      <img className={isfetching ? "wait" : "hidden"} src={waitgif} alt="" />
      <h3>List of Dog Breeds </h3>
      <div className="homedata">
        <div className="data">
        {list.map((element, i) => (
          <div key={i}>
            <p className="dog" onClick={() => getdata(element)}>
              {element}
            </p>
          </div>
        ))}
      </div>
      <div className="right">
        <img className={isLoading ? "wait" : "hidden"} src={waitgif} alt="" />
        <div className={"dogimageb"}>
          <img
            className={isLoading ? " hidden" : "dogimagec"}
            src={image}
            alt=""
          />
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Home;
