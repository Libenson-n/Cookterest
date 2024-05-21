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
  display: flex;
  height: 100px;
  margin-top: auto;
  background-color: var(--accent-color);
`;
