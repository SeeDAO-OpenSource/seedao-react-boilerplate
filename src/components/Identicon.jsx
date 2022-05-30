import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";


export default function Identicon({address}) {
  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)));
    }
  }, [address]);

  return <div style={{marginTop: "auto", marginBottom: "auto", height:"1.25rem"}} ref={ref} className="me-1" />;
}
