import React from "react";

const Balance = (props) => {
  return (
    <div className="ui segment">
      <p>Balance: Rp {props.value},-</p>
    </div>
  );
};

export default Balance;
