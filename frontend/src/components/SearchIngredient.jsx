import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import "./SearchIngredient.css";

export default function SearchIngredient(props) {
  const [ingredients, setIngredients] = useState([]);
  const [file, setFile] = useState();
  const [ocr, setOcr] = useState();
  const [progress, setProgress] = useState(undefined);

  function handleIngredients(e) {
    let ingredients = e.target.value;
    setIngredients(ingredients);
  }
  async function handleSearch() {
    if (file) {
      await get_ingredients_from_file();
      setProgress(undefined);
      console.log(ocr);
      return;
    }
    let ing = ingredients;
    ing = ing.split(",").map((ingredient) => ingredient.trim());
    props.updateIngredients(ing);
    setIngredients([]);
  }

  function handleFileUpload(e) {
    if (!e.target.files) return null;
    else setFile(e.target.files[0]);
  }

  async function get_ingredients_from_file() {
    const worker = createWorker({
      logger: (m) => {
        console.log(m);
        setProgress((m.progress * 100).toPrecision(3));
      },
    });
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text, hocr, tsv, box, unlv },
    } = await worker.recognize(file);
    setOcr(text);
    console.log(hocr);
    // console.log(tsv);
    // console.log(box);
    // console.log(unlv);
  }

  return (
    <div className="search-ingredient-wrapper">
      <textarea
        onChange={handleIngredients}
        value={ingredients}
        style={{ resize: "none" }}
        placeholder="Enter one or more ingredients separated by a comma"
        name="ingredient-input"
        cols="45"
        rows="5"
      ></textarea>
      <div>
        OR
        <br />
        <input onChange={handleFileUpload} type="file" accept="image/png, image/jpeg"></input>
        <p>{progress ? `status: ${progress}%` : ocr}</p>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
