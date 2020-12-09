import { useState } from "react";

export const LikeBtn = (props) => {
  const [likes, setLikes] = useState(props.tweet.likes ? props.tweet.likes : 0);
  const [userLike, setUserLike] = useState(
    props.tweet.userLike === true ? true : false
  );
  let displayLikes = `${likes} likes`;
  const handleClick = (event) => {
    event.preventDefault();
    if (userLike === true) {
      setLikes(likes - 1);
      setUserLike(false);
    } else {
      setLikes(likes + 1);
      setUserLike(true);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="btn btn-icon-danger btn-sm btn-text-dark-50 bg-hover-light-danger btn-hover-text-danger rounded font-weight-bolder font-size-sm p-2"
    >
      <span className="svg-icon svg-icon-md svg-icon-danger pr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </span>
      {displayLikes}
    </button>
  );
};

export const UnLikeBtn = (props) => {
  return (
    <button className="btn btn-hover-text-danger btn-hover-icon-danger btn-icon btn-text-dark-50 bg-hover-light-danger rounded font-weight-bolder font-size-sm">
      <span className="svg-icon svg-icon-md svg-icon-dark-25 pr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
            <path
              d="M12,19.5 C6,16 3,12.6834696 3,9.55040872 C3,6.72217984 4.651,4.5 7.5,4.5 C9.1095,4.5 10.99175,6.32463215 12,7.5 L12,19.5 Z"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </span>
    </button>
  );
};

export const ReTweetBtn = (props) => {
  return (
    <button className="btn btn-hover-text-primary btn-hover-icon-primary btn-icon btn-text-dark-50 bg-hover-light-primary rounded font-weight-bolder font-size-sm">
      <span className="svg-icon svg-icon-md svg-icon-dark-25 pr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M10.9,2 C11.4522847,2 11.9,2.44771525 11.9,3 C11.9,3.55228475 11.4522847,4 10.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,16 C20,15.4477153 20.4477153,15 21,15 C21.5522847,15 22,15.4477153 22,16 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L10.9,2 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
            <path
              d="M24.0690576,13.8973499 C24.0690576,13.1346331 24.2324969,10.1246259 21.8580869,7.73659596 C20.2600137,6.12944276 17.8683518,5.85068794 15.0081639,5.72356847 L15.0081639,1.83791555 C15.0081639,1.42370199 14.6723775,1.08791555 14.2581639,1.08791555 C14.0718537,1.08791555 13.892213,1.15726043 13.7542266,1.28244533 L7.24606818,7.18681951 C6.93929045,7.46513642 6.9162184,7.93944934 7.1945353,8.24622707 C7.20914339,8.26232899 7.22444472,8.27778811 7.24039592,8.29256062 L13.7485543,14.3198102 C14.0524605,14.6012598 14.5269852,14.5830551 14.8084348,14.2791489 C14.9368329,14.140506 15.0081639,13.9585047 15.0081639,13.7695393 L15.0081639,9.90761477 C16.8241562,9.95755456 18.1177196,10.0730665 19.2929978,10.4469645 C20.9778605,10.9829796 22.2816185,12.4994368 23.2042718,14.996336 L23.2043032,14.9963244 C23.313119,15.2908036 23.5938372,15.4863432 23.9077781,15.4863432 L24.0735976,15.4863432 C24.0735976,15.0278051 24.0690576,14.3014082 24.0690576,13.8973499 Z"
              fill="#000000"
              fillRule="nonzero"
              transform="translate(15.536799, 8.287129) scale(-1, 1) translate(-15.536799, -8.287129) "
            />
          </g>
        </svg>
      </span>
    </button>
  );
};
