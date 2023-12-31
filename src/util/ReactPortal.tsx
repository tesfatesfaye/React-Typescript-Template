import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.append(wrapperElement);
  return wrapperElement;
};

const ReactPortal = ({
  children,
  wrapperId = "react-portal-wrapper",
}: ReactPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
    return () => {
      if (systemCreated && element) {
        element.remove();
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
export default ReactPortal;
