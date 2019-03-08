import React from "react";
import { Divider } from "semantic-ui-react";

import mawalet from "../../api/mawalet";
import { monthNames } from "../../util";

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start_date: "01-01-2019",
      end_date: "",
      reports: []
    };
  }

  onFetchReport = async () => {
    let query = [];
    query.push(`start_date=${this.state.start_date}`);
    if (this.state.end_date !== "") {
      query.push(`end_date=${this.state.end_date}`);
    }

    const response = await mawalet.get(`/summary/report?${query}`);

    this.setState({ reports: response.data.data });
  };

  componentDidMount() {
    this.onFetchReport();
  }

  renderList() {
    if (this.state.reports.length > 0) {
      return this.state.reports.map((report, index) => {
        return (
          <tr key={index}>
            <td className="collapsing">{index + 1}</td>
            <td>{monthNames[report.month - 1]}</td>
            <td>{report.balance}</td>
          </tr>
        );
      });
    }

    return (
      <tr>
        <td colSpan="3">Data not available</td>
      </tr>
    );
  }

  onSearchHandler = () => {
    this.onFetchReport();
  };

  render() {
    return (
      <div>
        <Divider />
        <div className="ui form">
          <div className="inline fields">
            <div className="field">
              <label>Start Date</label>
              <input
                type="text"
                placeholder="Start date"
                value={this.state.start_date}
                onChange={event =>
                  this.setState({ start_date: event.target.value })
                }
              />
            </div>
            <div className="field">
              <label>End Date</label>
              <input
                type="text"
                placeholder="End date"
                value={this.state.end_date}
                onChange={event =>
                  this.setState({ start_date: event.target.value })
                }
              />
            </div>
            <div className="field">
              <button className="ui button" onClick={this.onSearchHandler}>
                <i className="search icon"></i> Search
              </button>
            </div>
          </div>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Report;
