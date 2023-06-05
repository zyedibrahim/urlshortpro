import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Clipboard from "clipboard";
import { FooterCon } from "./FooterCon";

export function Homecon() {
  const [passurl, setPassurl] = useState("");
  const [validate, setValidate] = useState("");
  const [shorturl, setShorturl] = useState();
  const [checkurl, setCheckurl] = useState("");
  const [clickcount, setClickcount] = useState();
  const [validatetboolean, setValidateboolean] = useState(true);
  const textRef = useRef(null);

  useEffect(() => {
    const clipboard = new Clipboard(".copy-button", {
      target: () => textRef.current,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const carddetails = [
    {
      logo: "https://www.shorturl.at/img/icon-like.png",
      text: "ShortURL is easy and fast, enter the long link to get your shortened link",
    },
    {
      logo: "https://www.shorturl.at/img/icon-url.png",
      text: "Use any link, no matter what size, ShortURL always shortens",
    },
    {
      logo: "https://www.shorturl.at/img/icon-secure.png",
      text: "It is fast and secure, our service has HTTPS protocol and data encryption",
    },
    {
      logo: "https://www.shorturl.at/img/icon-statistics.png",
      text: "Check the number of clicks that your shortened URL received",
    },
    {
      logo: "https://www.shorturl.at/img/icon-unique.png",
      text: "All links that try to disseminate spam, viruses and malware are deleted",
    },
    {
      logo: "https://www.shorturl.at/img/icon-responsive.png",
      text: "Compatible with smartphones, tablets and desktop",
    },
  ];

  const urlPattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,6})(\/\S*)?$/i;
  const Urlpost = async () => {
    if (urlPattern.test(passurl)) {
      console.log("URL entered:", passurl);
      const postrequest = await axios
        .post("http://localhost:4000/urlshort", {
          url: passurl,
        })
        .then((response) => {
          setShorturl(response.data.dataurl.shorturl);
          setPassurl("");
        });
    } else {
      setValidate("Invalid URL ");
      console.log("Invalid URL");
    }
  };

  const checkurlcounts = async () => {
    const postclickcount = await axios
      .post("http://localhost:4000/urlcount", {
        urlcheck: checkurl,
      })
      .then((response) => {
        console.log(response?.data?.status);
        if (response?.data?.clickcount) {
          setClickcount(response?.data?.clickcount);
          setValidateboolean(true);
        } else {
          setValidateboolean(false);
          setClickcount();
        }
      });
  };

  return (
    <>
      <div className="mb-3 mt-5 d-flex justify-content-center">
        <div className="head-sh ">Short URL</div>
      </div>
      <div className="mb-3 d-flex justify-content-center">
        <div className="head-sh2">Paste the URL to be shortened</div>
      </div>
      <div className="mb-3">
        <div className="container">
          <div className="row d-flex justify-content-center ">
            <div className="col-10 col-sm-10 col-md-8">
              <div className="input-group mb-3">
                <input
                  onChange={(e) => {
                    setPassurl(e.target.value);
                  }}
                  type="text"
                  value={passurl}
                  placeholder="Paset Your URL"
                  className="search-field form-control form-control-lg"
                  id="inputfield_button"
                  aria-describedby="inputfield_button"
                  aria-label="pasteurl"
                />
                <button
                  onClick={() => Urlpost()}
                  className="btn btn-primary paste-btn"
                  type="button"
                  id="inputfield_button"
                >
                  shorten url
                </button>
              </div>
              <div className="text-danger">
                {shorturl ? (
                  <div className="d-flex justify-content-center">
                    <input
                      className="form-control form-control-md"
                      ref={textRef}
                      value={shorturl}
                      aria-label="shortUrlinput readonly"
                      readOnly
                    />

                    <button
                      className="copy-button btn btn-primary"
                      onClick={() => clipboard.onClick()}
                    >
                      Copy
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="text-danger">
                {urlPattern.test(passurl) ? "" : validate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 ">
        <div className="d-flex justify-content-center">
          <div className="col-10 col-sm-8 col-md-6  ">
            ShortURL is a free tool to shorten URLs and generate short links URL
            shortener allows to create a shortened link making it easy to share
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className=" d-flex justify-content-center ">
          <div className="col-10 col-sm-10 col-md-8 ">
            <div className="simple-heading">Simple and fast URL shortener!</div>
            <div>
              ShortURL allows to shorten long links from Instagram, Facebook,
              YouTube, Twitter, Linked In, WhatsApp, TikTok, blogs and sites.
              Just paste the long URL and click the Shorten URL button. On the
              next page, copy the shortened URL and share it on sites, chat and
              emails. After shortening the URL, check how many clicks it
              received.
              <div className="mb-5 mt-3 ">
                <button
                  className="btn btn-success"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#checkcounts"
                  aria-expanded="false"
                  aria-controls="button to collapse"
                >
                  Check Counts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 collapse" id="checkcounts">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-md-5">
              <div className="card">
                <div className="card-header text-center">
                  Check Click Counts
                </div>
                <div className="card-body">
                  <input
                    onChange={(e) => setCheckurl(e.target.value)}
                    type="text"
                    value={checkurl}
                    placeholder="Paste Your Url"
                    className="form-control mb-3"
                  />
                  <div className="mb-3 text-danger h5">
                    {validatetboolean ? "" : "URL NOT Found"}
                  </div>

                  {clickcount ? (
                    <div className="mb-3 d-flex justify-content-center">
                      <h2 className=" badge rounded-pill bg-success p-x-2 fs-5">
                        Count - {clickcount}
                      </h2>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mb-3 d-flex justify-content-center">
                    <button
                      onClick={() => checkurlcounts()}
                      className="btn ps-4 pe-4 fs-5 btn-success"
                    >
                      Click
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className=" d-flex justify-content-center ">
          <div className="col-10 col-sm-10 col-md-8 ">
            <div className="simple-heading">Shorten, share and track</div>
            <div>
              Your shortened URLs can be used in publications, documents,
              advertisements, blogs, forums, instant messages, and other
              locations. Track statistics for your business and projects by
              monitoring the number of hits from your URL with our click
              counter.
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-12 col-sm-8 mb-4">
          <div className="card-con">
            <div className="container">
              <div className="row d-flex justify-content-center">
                {carddetails.map((ele, index) => (
                  <div key={index} className="col-5 col-sm-5 col-md-4 mb-4">
                    {" "}
                    {/* Added mb-4 class for bottom margin */}
                    <div className="card h-100 pt-2 pb-2">
                      <div className="img-con d-flex justify-content-center">
                        <img src={ele.logo} alt="img" />
                      </div>
                      <div className="cord-body">
                        <div className="card-text text-center">{ele.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
