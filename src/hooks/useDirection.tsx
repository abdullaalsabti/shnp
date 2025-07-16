import { useTranslation } from "react-i18next";

const useDirection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language.includes("ar");
  const htmlElement = document.documentElement;

  if (isRTL) {
    htmlElement.classList.add("rtl");
    htmlElement.classList.remove("ltr");
  } else {
    htmlElement.classList.add("ltr");
    htmlElement.classList.remove("rtl");
  }

  return <div>useDirection</div>;
};

export default useDirection;
