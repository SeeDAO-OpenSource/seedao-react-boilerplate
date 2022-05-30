import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

export default function Footer(props) {
  return (
    <footer className="text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-2">
          <a
            className="btn btn-outline-light btn-floating m-1 rounded-circle"
            href="#!"
            role="button"
            target="_blank"
          >
            <FontAwesomeIcon as="i" icon={["fab", "facebook-f"]} />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1 rounded-circle"
            href="#!"
            role="button"
            target="_blank"
          >
            <FontAwesomeIcon as="i" icon={["fab", "twitter"]} />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1 rounded-circle"
            href="#"
            role="button"
            target="_blank"
          >
            <FontAwesomeIcon as="i" icon={["fab", "discord"]} />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1 rounded-circle"
            href="#!"
            role="button"
            target="_blank"
          >
            <FontAwesomeIcon as="i" icon={["fab", "github"]} />
          </a>
        </section>
      </div>
      <div className="text-center p-3">
        © 2022 Copyright:
        <a className="text-white" href="#">
          {" "}
          SeeDAO
        </a>
        . All right reserved.
      </div>
    </footer>
  );
}
