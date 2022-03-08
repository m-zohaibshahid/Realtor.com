import React, { useState, useEffect } from "react";
import Slider from "react-touch-drag-slider";
import { baseUrl } from "../../config/baseUrl";
import styled, { createGlobalStyle, css } from "styled-components";

// define some basic styles
// const GlobalStyles = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//   }
//   html,body {
//     padding: 0;
//     margin: 0;
//   }
// `;
// // The slider will fit any size container, lets go full screen...
// const AppStyles = styled.main`
//   height: 100vh;
//   width: 100vw;
// `;

const Button = styled.button`
  font-size: 2rem;
  z-index: 10;
  position: absolute;
  top: 28%;
  ${(props) =>
    props.right
      ? css`
          right: 0.5rem;
        `
      : css`
          left: 0.5rem;
        `};
`;

function Carousel({ images }) {
  console.log("hello bro images", images);
  const [index, setIndex] = useState(1);

  const setFinishedIndex = (i) => {
    console.log("finished dragging on slide", i);
    setIndex(i);
  };

  const next = () => {
    if (index < images.length - 1) setIndex(index + 1);
  };

  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };
  return (
    <>
      {/* <GlobalStyles /> */}
      {/* <AppStyles> */}
      <Button onClick={previous} left disabled={index === 0}>
        〈
      </Button>
      <Button onClick={next} right disabled={index === images.length - 1}>
        〉
      </Button>
      <Slider
        onSlideComplete={setFinishedIndex}
        onSlideStart={(i) => {
          console.clear();
          console.log("started dragging on slide", i);
        }}
        activeIndex={index}
        threshHold={100}
        transition={0.5}
        scaleOnDrag={true}
      >
        {images.map((url, index) => (
          <img src={`${baseUrl}/${url?.path}`} key={index} />
        ))}
      </Slider>
      {/* </AppStyles> */}
    </>
  );
}

export default Carousel;
