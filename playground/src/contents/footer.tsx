import { useSelector } from "react-redux";

import { isInDarkMode } from "mobrix-engine-plugins";
import { Container } from "mobrix-ui";

const FooterContent = () => {
  const dark = useSelector(isInDarkMode);

  return (
    <Container className="flex flex-col items-center mt-2" dark={dark}>
      <div className="flex flex-row p-2">
        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/license/cianciarusocataldo/mobrix-engine"
          height="25"
        />

        <img
          alt=""
          className="p-1"
          src="https://img.shields.io/github/package-json/v/cianciarusocataldo/mobrix-engine?label=latest%20version"
          height="25"
        />
      </div>
    </Container>
  );
};

export default FooterContent;
