import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Modal from "../modal";

class CashFlowDelete extends Component {
  renderContent() {
    return "Are you sure you want to delete this stream?";
  }

  renderActions() {
    return (
      <Fragment>
        <button className="ui negative button" onClick={this.onDelete}>
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );
  }

  onDelete = () => {
    console.log("[CashFlowDelete][onDelete] di delete anday");
  };

  render() {
    return (
      <Modal
        title="Delete"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => console.log("modal")}
      />
    );
  }
}

export { CashFlowDelete };
