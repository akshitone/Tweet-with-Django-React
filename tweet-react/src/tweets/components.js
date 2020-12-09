import React, { useEffect, useState } from "react";
import { loadTweets } from "../lookup";
import { LikeBtn, UnLikeBtn, ReTweetBtn } from "./icons";

export const TweetList = (props) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const handleCallBack = (response, status) => {
      if (status === 200) {
        setTweets(response);
      }
    };
    loadTweets(handleCallBack);
  }, []);
  return tweets.map((tweet, index) => {
    return <Tweet tweet={tweet} key={index} />;
  });
};

export const ActionBtn = (props) => {
  const tweet = props.tweet;
  const action = props.action.type;
  if (action === "like") {
    return <LikeBtn tweet={tweet} />;
  } else if (action === "unlike") {
    return <UnLikeBtn tweet={tweet} />;
  } else if (action === "retweet") {
    return <ReTweetBtn tweet={tweet} />;
  } else {
    return null;
  }
};

export const TweetsComponent = (props) => {
  const textAreaReference = React.createRef();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(textAreaReference.current.value);
    textAreaReference.current.value = "";
  };
  return (
    <div
      className="content d-flex flex-column flex-column-fluid mt-10"
      id="kt_content"
    >
      <div className="d-flex flex-column-fluid">
        <div className="container-fluid">
          <div
            className="alert alert-custom alert-light-danger fade show mb-5 d-none"
            id="tweet-error"
            role="alert"
          >
            <div className="alert-icon">
              <i className="fas fa-minus-circle"></i>
            </div>
            <div className="alert-text" id="error-message">
              A simple primary alert—check it out!
            </div>
            <div className="alert-close">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="ki ki-close"></i>
                </span>
              </button>
            </div>
          </div>
          <div className="card card-custom">
            <form
              className="form"
              id="tweet-create-form"
              onSubmit={handleFormSubmit}
              name="tweet-form"
              // method="POST"
              // action="/tweets/create/"
            >
              <input type="hidden" value="/" name="next" />
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-form-label text-right col-lg-3 col-sm-12"></label>
                  <div className="col-lg-12 col-md-9 col-sm-12">
                    <textarea
                      required
                      ref={textAreaReference}
                      className="form-control"
                      placeholder="Your tweet..."
                      rows="6"
                      name="content"
                    ></textarea>
                    <span className="form-text text-muted">
                      maxlength 240 characters
                    </span>
                    <button
                      type="submit"
                      className="btn btn-primary btn-shadow font-weight-bold mr-2 mt-5"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column-fluid mt-10">
        <div className="container-fluid" id="design-tweets">
          <TweetList />
        </div>
      </div>
    </div>
  );
};

export const Tweet = (props) => {
  return (
    <div className="card card-custom gutter-b">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="symbol symbol-40 symbol-light-success mr-5">
            <span className="symbol-label">
              <img
                src="https://preview.keenthemes.com/metronic/theme/html/demo6/dist/assets/media/svg/avatars/047-girl-25.svg"
                className="h-75 align-self-end"
                alt=""
              />
            </span>
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <a
              href="/"
              className="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder"
            >
              Ruby Liam
            </a>
            <span className="text-muted font-weight-bold">
              Yestarday at 5:06 PM
            </span>
          </div>
        </div>
        <div className="pt-4">
          <div
            className="bgi-no-repeat bgi-size-cover rounded min-h-265px"
            style={{
              backgroundImage: "url(/media/stock-900x600/3.jpg)",
            }}
          ></div>
          <p className="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">
            {props.tweet.content}
          </p>
          <div className="d-flex align-items-center">
            <ActionBtn tweet={props.tweet} action={{ type: "like" }} />
            <ActionBtn tweet={props.tweet} action={{ type: "unlike" }} />
            <ActionBtn tweet={props.tweet} action={{ type: "retweet" }} />
          </div>
        </div>
        <div className="separator separator-solid mt-2 mb-4"></div>
        <form className="position-relative">
          <textarea
            id="kt_forms_widget_4_input"
            className="form-control border-0 p-0 pr-10 resize-none"
            rows="1"
            placeholder="Reply..."
          ></textarea>
          <div className="position-absolute top-0 right-0 mt-n1 mr-n2">
            <button className="btn btn-hover-text-primary btn-hover-icon-primary btn-icon btn-text-dark-50 bg-hover-light-primary rounded font-weight-bolder font-size-sm p-2">
              <span className="svg-icon svg-icon-md svg-icon-dark-25 pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <rect x="0" y="0" width="24" height="24" />
                    <path
                      d="M21.4451171,17.7910156 C21.4451171,16.9707031 21.6208984,13.7333984 19.0671874,11.1650391 C17.3484374,9.43652344 14.7761718,9.13671875 11.6999999,9 L11.6999999,4.69307548 C11.6999999,4.27886191 11.3642135,3.94307548 10.9499999,3.94307548 C10.7636897,3.94307548 10.584049,4.01242035 10.4460626,4.13760526 L3.30599678,10.6152626 C2.99921905,10.8935795 2.976147,11.3678924 3.2544639,11.6746702 C3.26907199,11.6907721 3.28437331,11.7062312 3.30032452,11.7210037 L10.4403903,18.333467 C10.7442966,18.6149166 11.2188212,18.596712 11.5002708,18.2928057 C11.628669,18.1541628 11.6999999,17.9721616 11.6999999,17.7831961 L11.6999999,13.5 C13.6531249,13.5537109 15.0443703,13.6779456 16.3083984,14.0800781 C18.1284272,14.6590944 19.5349747,16.3018455 20.5280411,19.0083314 L20.5280247,19.0083374 C20.6363903,19.3036749 20.9175496,19.5 21.2321404,19.5 L21.4499999,19.5 C21.4499999,19.0068359 21.4451171,18.2255859 21.4451171,17.7910156 Z"
                      fill="#000000"
                      fillRule="nonzero"
                    />
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
