import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";

import mawalet from "../../api/mawalet";

class CashFlowCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      form: {
        isExpense: false,
        amount: 0,
        category: "",
        description: ""
      }
    };
  }

  componentDidMount() {
    this.onFetchCategories();
  }

  inputHandler = (event, name) => {
    let form = { ...this.state.form };
    form[name] = event.target.value;
    this.setState({ form });
  };

  onFetchCategories = () => {
    mawalet.get("/category").then(response => {
      console.log("[onFetchCategories] response", response);
      this.setState({ categories: response.data.data });
    });
  };

  render() {
    return (
      <div>
        <Divider />
        <div className="ui segment">
          <form className="ui form">
            <div className="grouped fields">
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="expense" tabIndex="0" />
                  <label>Income</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="expense" tabIndex="0" />
                  <label>Outcome</label>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Amount</label>
              <input
                type="text"
                placeholder="Amount"
                onChange={event => this.inputHandler(event, "amount")}
              />
            </div>
            <div className="field">
              <label>Category</label>
              <select className="ui fluid dropdown" onChange={(event) => this.inputHandler(event, "category")}>
                {this.state.categories.map(category => (
                  <option value={category.category_name} key={category._id}>{category.category_name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                rows="2"
                placeholder="Description"
                onChange={event => this.inputHandler(event, "description")}
              />
            </div>
            <Link to="/" className="ui button">
              Cancel
            </Link>
            <button className="ui right floated blue button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export { CashFlowCreate };
