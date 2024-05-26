import styled from "styled-components";
import bghero from "../../images/bghero.avif";

const Hero = () => {
  return (
    <HeroSection>
      <h1>Cookterest</h1>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${bghero});
  background-size: cover;

  h1 {
    font-family: "Arizonia", cursive;
    font-size: 5rem;
    font-weight: 900;
    font-style: normal;
    color: white;
    text-shadow: -1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 0 #000,
      -1px -1px 0 #000;
  }
`;
