import React from "react";
import LearnMoreBtn from "./LearnMoreBtn";
import Filter from "./SearchFilter/Filter";
const HeroSection = ({ PageTitle, Subtitle, classname }) => {
  return (
    <>
      <div id="Top" className="hero-section">
        <div
          data-w-id="dec86d1c-4294-71fd-6b67-53cca90eaebb"
          className={`absolute ${classname}`}
        ></div>
        <div className="content-wrapper inner w-container">
          <div className="hero-text-box">
            <div>
              <h1 className="h1-hero">{PageTitle}</h1>
            </div>
            <div>
              <div className="subtitle">{Subtitle}</div>
            </div>
            <LearnMoreBtn topMargin="_30-pixels" buttonStyle="button" />
          </div>
        </div>
        <div>
          <Filter />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
