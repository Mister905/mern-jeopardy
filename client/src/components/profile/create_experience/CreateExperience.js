import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { create_experience } from "../../../actions/experience";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Script from "react-load-script";
import M from "materialize-css";
import PlacesAutocomplete from "react-places-autocomplete";

class CreateExperience extends Component {
  constructor(props) {
    super(props);
    this.description_textarea = React.createRef();
  }

  state = {
    company: "",
    title: "",
    location: "",
    from_date: "",
    to_date: "",
    description: "",
    is_current: true,
    places_script_loading: true
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.description !== this.state.description) {
      M.textareaAutoResize(this.description_textarea.current);
    }
  };

  on_date_change = (datepicker_id, date) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [datepicker_id]: date
      };
    });
  };

  on_change = e => {
    // Toggle Datepicker Visibility
    if (e.target.id === "is_current") {
      this.setState(prevState => {
        return {
          ...prevState,
          is_current: !prevState.is_current
        };
      });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  on_location_change = location => {
    this.setState({ location });
  };

  on_location_select = location => {
    this.setState({ location });
  };

  handle_script_load = () => {
    this.setState({ places_script_loading: false });
  };

  on_submit = e => {
    e.preventDefault();

    const form_data = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      is_current: this.state.is_current,
      description: this.state.description
    };

    this.props.create_experience(form_data, this.props.history);
  };

  output = () => {
    const { is_current } = this.state;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12">
            <div className="row mt-row">
              <div className="col m2 center-align">
                <Link
                  to="/profile"
                  className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
                >
                  <i className="material-icons  bold-text">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <div className="heading-font bold-text jeopardy-blue-dark-text">
                  Create Experience
                </div>
              </div>
            </div>
            <div className="row mt-row">
              <div className="col m10 offset-m1">
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={this.on_submit}
                  className="mt-form"
                >
                  <div className="custom-input-field">
                    <div className="input-field col m6 offset-m3">
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={this.state.company}
                        onChange={this.on_change}
                      />
                      <label
                        className="active jeopardy-blue-dark-text"
                        htmlFor="company"
                      >
                        Company
                      </label>
                    </div>
                  </div>
                  <div className="custom-input-field">
                    <div className="input-field col m6 offset-m3">
                      <input
                        id="title"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.on_change}
                      />
                      <label
                        className="active jeopardy-blue-dark-text"
                        htmlFor="title"
                      >
                        Title
                      </label>
                    </div>
                  </div>
                  <div className="custom-input-field">
                    <div className="input-field col m6 offset-m3">
                      <PlacesAutocomplete
                        value={this.state.location}
                        onChange={this.on_location_change}
                        onSelect={this.on_location_select}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading
                        }) => (
                          <div>
                            <input {...getInputProps({})} />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer"
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer"
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      <label
                        className="active jeopardy-blue-dark-text"
                        htmlFor="location"
                      >
                        Location
                      </label>
                    </div>
                  </div>
                  <div className="add-experience-date-input">
                    <div className="custom-input-field">
                      <div className="input-field col m4 offset-m3">
                        <DatePicker
                          id="from-datepicker"
                          selected={this.state.from_date}
                          onChange={date =>
                            this.on_date_change("from_date", date)
                          }
                          dateFormat="MMMM d, yyyy"
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={45}
                          scrollableYearDropdown
                        />
                        <label
                          className="active jeopardy-blue-dark-text"
                          htmlFor="from-datepicker"
                        >
                          From
                        </label>
                      </div>
                    </div>
                    <div className="input-field col m2 offset-m1 is-current-input-field">
                      <label htmlFor="is_current">
                        <input
                          id="is-current-checkbox"
                          type="checkbox"
                          id="is_current"
                          onChange={this.on_change}
                          defaultChecked
                        />
                        <span
                          id="is-current-span"
                          className="jeopardy-blue-dark-text"
                        >
                          Current
                        </span>
                      </label>
                    </div>
                  </div>
                  {!is_current ? (
                    <div className="add-experience-date-input">
                      <div className="col m12">
                        <div className="row">
                          <div className="custom-input-field">
                            <div className="input-field col m4 offset-m3">
                              <DatePicker
                                id="to-datepicker"
                                selected={this.state.to_date}
                                onChange={date =>
                                  this.on_date_change("to_date", date)
                                }
                                dateFormat="MMMM d, yyyy"
                                showYearDropdown
                                dateFormatCalendar="MMMM"
                                yearDropdownItemNumber={45}
                                scrollableYearDropdown
                              />
                              <label
                                className="active jeopardy-blue-dark-text"
                                htmlFor="to-datepicker"
                              >
                                To
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="custom-input-field">
                    <div className="input-field col m6 offset-m3">
                      <textarea
                        id="description"
                        className="materialize-textarea"
                        name="description"
                        value={this.state.description}
                        onChange={this.on_change}
                        ref={this.description_textarea}
                      ></textarea>
                      <label
                        className="active jeopardy-blue-dark-text"
                        htmlFor="password"
                      >
                        Description
                      </label>
                    </div>
                  </div>
                  <div className="input-field col m6 offset-m3">
                    <button
                      type="submit"
                      className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                    >
                      Create Experience
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { places_script_loading } = this.state;
    return (
      <div>
        {!places_script_loading && this.output()}
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6wi4hS6dbdIuyb_IKmzXaNFHA6IeueqY&libraries=places"
          onLoad={this.handle_script_load}
        ></Script>
      </div>
    );
  }
}

CreateExperience.propTypes = {
  create_experience: PropTypes.func.isRequired
};

export default connect(null, { create_experience })(
  withRouter(CreateExperience)
);
