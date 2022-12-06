import React from "react";
import { useState, useEffect } from "react";
import { rgbToHex } from "../utils/helpers";

const SingleColor = ({ rgb, type, weight }) => {
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  const copyColor = () => {
    navigator.clipboard
      .writeText(rgbToHex(...rgb)) //cosa copiare al click
      .then(() => setMessage(true))
      .catch((err) => console.log(err));
  };
  return (
    <article
      onClick={copyColor}
      className={`single-color ${type}`}
      style={{ backgroundColor: rgbToHex(...rgb) }}
    >
      <h5>{rgbToHex(...rgb)}</h5>
      {message && <p>Colore copiato!</p>}
    </article>
  );
};

export default SingleColor;
