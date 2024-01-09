import React from 'react';
import loaderImg from "../../../assets/trip-loading.gif";

function PleaseWaitMsg({ message, imageUrl='' }) {
  return (
    <div>
      {message}
      <img src={loaderImg} alt="description_of_image" width="50px" />
    </div>
  );
}
export default PleaseWaitMsg;