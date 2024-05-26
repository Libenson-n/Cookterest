import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-regular-svg-icons";


const Footer = () => {
  return (
    <FooterSection>
      <p><FontAwesomeIcon icon={faCopyright}/> Leebs </p>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  display: flex;
  align-items: center;
  height: 100px;
  margin-top: auto;
  background-color: var(--accent-color);

  p {
    margin: 10vw;
  }
`;
