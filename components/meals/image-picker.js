"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState();

  const pickImageClickHandler = () => {
    imageInput.current.click();
  };

  const changePickedImageHandler = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>no image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="image selected by user." fill />
          )}
        </div>
        <input
          className={classes.input}
          id={name}
          name={name}
          type="file"
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={changePickedImageHandler}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={pickImageClickHandler}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
