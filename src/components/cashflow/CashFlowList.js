import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";

import mawalet from "../../api/mawalet";
import { getDateAndTime } from "../../util";

import Balance from "../balance";

class CashFlowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      cashflows: []
    };
  }

  componentDidMount() {
    this.onFetchData();
    this.onGetBalance();
  }

  onFetchData = async () => {
    const response = await mawalet.get("/cash-flow");

    this.setState({ cashflows: response.data.data });
  };

  onGetBalance = () => {
    mawalet.get("/summary/getBalance").then(response => {
      this.setState({ balance: response.data.balance });
    });
  };

  renderList() {
    if (this.state.cashflows.length > 0) {
      return this.state.cashflows.map((cashflow, index) => {
        const isExpense = cashflow.is_expense ? "negative" : "positive";

        return (
          <tr key={cashflow._id}>
            <td>{index + 1}</td>
            <td>{getDateAndTime(cashflow.date)}</td>
            <td className={isExpense}>{cashflow.amount}</td>
            <td>{cashflow.category}</td>
            <td>{cashflow.description}</td>
            <td className="center aligned">
              <Link to={`/cash-flow/delete?id=${cashflow._id}`}>Delete</Link>
            </td>
          </tr>
        );
      });
    }

    return (
      <tr>
        <td colSpan="6">Data not available.</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <Divider />
        {/* <Balance value={this.state.balance} /> */}
        <div className="ui grid">
          <div className="four column row">
            <div className="left floated column">
              <Balance value={this.state.balance} />
            </div>
            <div className="right floated column">
              <div className="ui basic right aligned segment">
                <Link to="/cash-flow/create">Create</Link>
              </div>
            </div>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
      </div>
    );
  }
}

export { CashFlowList };
