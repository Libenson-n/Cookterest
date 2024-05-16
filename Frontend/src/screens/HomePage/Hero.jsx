import styled from "styled-components";

const Hero = () => {
  return (
    <HeroSection>
      <h1>COOKTEREST</h1>
      <h2>The community recipe book</h2>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
