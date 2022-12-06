import React, { useState, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { v4 as uuidv4 } from "uuid";

//DA FIXARE: Quando ho numeri tondi (10,20,30) mi aggiunge 1 numero (11 elementi, 21, 31 ecc)

const ColorGrading = () => {
  const [selectedColor, setSelectedColor] = useState([]);
  const [colorInput, setColorInput] = useState({
    color: "",
    qty: 5,
  });
  const [isError, setIsError] = useState(false);

  // const color = new Values("rgb(0, 153, 255)");
  // console.log(color.all(20));

  useEffect(() => {
    setColorInput({ ...colorInput, color: "#94d979" });
    setSelectedColor(
      new Values("#94d979").all(
        Math.round((100 / parseInt(colorInput.qty, 10)) * 2)
      )
    );
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    if (isError) setIsError(false);
    const { name, value } = e.target;
    setColorInput({
      ...colorInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (colorInput.color && colorInput.qty) {
      const { color, qty } = colorInput;
      try {
        setSelectedColor(
          new Values(color).all(Math.round(100 / parseInt(qty, 10)) * 2)
        );
      } catch {
        setIsError(true);
      }
    }
  };

  console.log(selectedColor);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="color"
            id="color"
            value={colorInput.color}
            maxLength={7}
            className="input"
            onChange={handleChange}
          />
          <input
            type="number"
            name="qty"
            id="qty"
            value={colorInput.qty}
            maxLength={7}
            max={100}
            min={5}
            step={5}
            className="input"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-selector" type="submit">
          Create
        </button>
      </form>
      <section className="color-section">
        {isError ? (
          <h4 className="section-center">Nessun Colore Trovato</h4>
        ) : !isError && selectedColor ? (
          selectedColor.map((el) => <SingleColor key={uuidv4()} {...el} />)
        ) : (
          <h4>Loading</h4>
        )}
      </section>
    </>
  );
};

export default ColorGrading;
