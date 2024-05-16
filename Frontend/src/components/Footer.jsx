import styled from "styled-components";

const Footer = () => {
  return (
    <FooterSection>
      <p>footer</p>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  height: 100px;
  position: relative;
  bottom: 0;
  background-color: var(--accent-color);
`;
