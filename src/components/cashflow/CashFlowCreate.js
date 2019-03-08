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
        is_expense: false,
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

  radioButtonHandler = (name, value) => {
    let form = { ...this.state.form };
    form[name] = value;
    this.setState({ form });
  };

  onFetchCategories = () => {
    mawalet.get("/category").then(response => {
      this.setState({ categories: response.data.data });
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const response = await mawalet.post("/cash-flow", { ...this.state.form });

    if (response.data.err_no === 0) {
      this.props.history.push('/');
    } else {
      alert("Oops, something wrong!");
    }
  };

  render() {
    return (
      <div>
        <Divider />
        <div className="ui segment">
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="grouped fields">
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="expense"
                    tabIndex="0"
                    defaultChecked={!this.state.form.is_expense}
                    onChange={() =>
                      this.radioButtonHandler("is_expense", false)
                    }
                  />
                  <label>Income</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="expense"
                    tabIndex="0"
                    defaultChecked={this.state.form.is_expense}
                    onChange={() => this.radioButtonHandler("is_expense", true)}
                  />
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
              <select
                className="ui fluid dropdown"
                onChange={event => this.inputHandler(event, "category")}
              >
                <option>-- Select Category --</option>
                {this.state.categories.map(category => (
                  <option value={category.category_name} key={category._id}>
                    {category.category_name}
                  </option>
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
