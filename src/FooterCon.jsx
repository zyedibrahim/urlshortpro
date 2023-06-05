import { useMediaQuery } from "react-responsive";

export function FooterCon() {
  const list = [
    {
      content: "ShortURL",
    },
    {
      content: "URL Click Counter",
    },

    {
      content: "Terms of Service",
    },
    {
      content: "Privacy",
    },
    {
      content: "Contact",
    },
  ];
  const isScreenMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isScreenSm = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div className="footer-con pb-5 ">
      <div className="d-flex justify-content-center mb-3">
        <div className="mini-heading mt-3 text-white">
          © 2023 ShortUrl.at - Tool to shorten a long link
        </div>
      </div>

      <div className="list-con container text-primary">
        <div className="row d-flex justify-content-center">
          {list.map((ele, index) => (
            <div key={index} className={`col-10 col-md-2  `}>
              <div
                className={`${isScreenMd ? "foo-border mb-0" : ""} ${
                  isScreenSm ? "foo-border-b mb-3" : ""
                }`}
              >
                {ele.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
