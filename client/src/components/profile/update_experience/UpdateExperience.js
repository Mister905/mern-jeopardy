import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";
import {
  get_experience_item,
  update_experience,
  clear_experience_item,
  clear_active_experience
} from "../../../actions/experience";
import { clear_active_profile } from "../../../actions/profile";
import Loader from "../../layout/loader/Loader";
import Moment from "react-moment";
import Script from "react-load-script";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import PlacesAutocomplete from "react-places-autocomplete";

class UpdateExperience extends Component {
  constructor(props) {
    super(props);
    this.description_textarea = React.createRef();
    const exp_id = this.props.match.params.exp_id;
    this.props.get_experience_item(exp_id);
  }

  state = {
    exp_id: "",
    company: "",
    title: "",
    location: "",
    from_date: "",
    to_date: "",
    description: "",
    is_current: "",
    places_script_loading: true
  };

  componentWillUnmount = () => {
    this.props.clear_active_profile();
    this.props.clear_active_experience();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.description !== this.state.description) {
      try {
        M.textareaAutoResize(this.description_textarea.current);
      } catch (error) {
        console.log(error);
      }
    }
    if (
      this.props.experience.experience_item !==
      prevProps.experience.experience_item
    ) {
      const { experience_item } = this.props.experience;
      const from_date_formatted = new Date(experience_item.from_date);
      const to_date_formatted = new Date(experience_item.to_date);

      this.setState(prevState => {
        return {
          ...prevState,
          exp_id: experience_item._id,
          company: experience_item.company,
          title: experience_item.title,
          location: experience_item.location,
          description: experience_item.description,
          is_current: experience_item.is_current
        };
      });

      if (to_date_formatted) {
        this.setState(prevState => {
          return {
            ...prevState,
            from_date: from_date_formatted,
            to_date: to_date_formatted
          };
        });
      } else {
        this.setState(prevState => {
          return {
            ...prevState,
            from_date: from_date_formatted
          };
        });
      }
    }
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

  on_date_change = (datepicker_id, date) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [datepicker_id]: date
      };
    });
  };

  on_submit = e => {
    e.preventDefault();

    const form_data = {
      exp_id: this.state.exp_id,
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      is_current: this.state.is_current,
      description: this.state.description
    };

    this.props.update_experience(form_data, this.props.history);
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

  experience_output = () => {
    let { is_current } = this.state;
    let { loading_experience_item } = this.props.experience;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12">
            <div className="row mt-row">
              <div className="col m2 center-align">
                <Link
                  to="/update-profile"
                  className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
                >
                  <i className="material-icons  bold-text">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <div className="heading-font bold-text jeopardy-blue-dark-text">
                  Update Experience
                </div>
              </div>
            </div>
            {loading_experience_item ? (
              <Loader />
            ) : (
              <div className="row mt-row">
                <div className="col m10 offset-m1">
                  <form noValidate onSubmit={this.on_submit} autoComplete="off">
                    <div className="custom-input-field">
                      <div className="input-field col m6 offset-m3">
                        <input
                          id="company"
                          type="text"
                          name="company"
                          value={this.state.company}
                          onChange={this.on_change}
                        />
                        <label className="active" htmlFor="company">
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
                        <label className="active" htmlFor="title">
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
                      <div className="input-field input-field col m6 offset-m3">
                        <textarea
                          id="description"
                          className="materialize-textarea"
                          name="description"
                          value={this.state.description}
                          onChange={this.on_change}
                          ref={this.description_textarea}
                        ></textarea>
                        <label className="active" htmlFor="description">
                          Description
                        </label>
                      </div>
                    </div>
                    <div className="custom-input-field">
                      <div className="input-field col m6 offset-m3">
                        <button
                          type="submit"
                          className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                        >
                          Update Experience
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
    // if (loading_experience_item) {
    //   return <Loader />;
    // } else {
    //   return (
    //     <div className="container">
    //       <div className="row mt-row">
    //         <div className="card col m12">
    //           <div className="row mt-row">
    //             <div className="col m2 center-align">
    //               <Link
    //                 to="/update-profile"
    //                 className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
    //               >
    //                 <i className="material-icons  bold-text">arrow_back</i>
    //               </Link>
    //             </div>
    //             <div className="col m4 offset-m2 center-align">
    //               <div className="heading-font bold-text jeopardy-blue-dark-text">
    //                 Update Experience
    //               </div>
    //             </div>
    //           </div>
    //           {loading_experience_item ? (
    //             <Loader />
    //           ) : (
    //             <div className="row mt-row">
    //               <div className="col m10 offset-m1">
    //                 <form
    //                   noValidate
    //                   onSubmit={this.on_submit}
    //                   autoComplete="off"
    //                 >
    //                   <div className="custom-input-field">
    //                     <div className="input-field col m6 offset-m3">
    //                       <input
    //                         id="company"
    //                         type="text"
    //                         name="company"
    //                         value={this.state.company}
    //                         onChange={this.on_change}
    //                       />
    //                       <label className="active" htmlFor="company">
    //                         Company
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="custom-input-field">
    //                     <div className="input-field col m6 offset-m3">
    //                       <input
    //                         id="title"
    //                         type="text"
    //                         name="title"
    //                         value={this.state.title}
    //                         onChange={this.on_change}
    //                       />
    //                       <label className="active" htmlFor="title">
    //                         Title
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="custom-input-field">
    //                     <div className="input-field col m6 offset-m3">
    //                       <PlacesAutocomplete
    //                         value={this.state.location}
    //                         onChange={this.on_location_change}
    //                         onSelect={this.on_location_select}
    //                       >
    //                         {({
    //                           getInputProps,
    //                           suggestions,
    //                           getSuggestionItemProps,
    //                           loading
    //                         }) => (
    //                           <div>
    //                             <input {...getInputProps({})} />
    //                             <div className="autocomplete-dropdown-container">
    //                               {loading && <div>Loading...</div>}
    //                               {suggestions.map(suggestion => {
    //                                 const className = suggestion.active
    //                                   ? "suggestion-item--active"
    //                                   : "suggestion-item";
    //                                 // inline style for demonstration purpose
    //                                 const style = suggestion.active
    //                                   ? {
    //                                       backgroundColor: "#fafafa",
    //                                       cursor: "pointer"
    //                                     }
    //                                   : {
    //                                       backgroundColor: "#ffffff",
    //                                       cursor: "pointer"
    //                                     };
    //                                 return (
    //                                   <div
    //                                     {...getSuggestionItemProps(suggestion, {
    //                                       className,
    //                                       style
    //                                     })}
    //                                   >
    //                                     <span>{suggestion.description}</span>
    //                                   </div>
    //                                 );
    //                               })}
    //                             </div>
    //                           </div>
    //                         )}
    //                       </PlacesAutocomplete>
    //                       <label
    //                         className="active jeopardy-blue-dark-text"
    //                         htmlFor="location"
    //                       >
    //                         Location
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="add-experience-date-input">
    //                     <div className="custom-input-field">
    //                       <div className="input-field col m4 offset-m3">
    //                         <DatePicker
    //                           id="from-datepicker"
    //                           selected={this.state.from_date}
    //                           onChange={date =>
    //                             this.on_date_change("from_date", date)
    //                           }
    //                           dateFormat="MMMM d, yyyy"
    //                           showYearDropdown
    //                           dateFormatCalendar="MMMM"
    //                           yearDropdownItemNumber={45}
    //                           scrollableYearDropdown
    //                         />
    //                         <label
    //                           className="active jeopardy-blue-dark-text"
    //                           htmlFor="from-datepicker"
    //                         >
    //                           From
    //                         </label>
    //                       </div>
    //                     </div>
    //                     <div className="input-field col m2 offset-m1 is-current-input-field">
    //                       <label htmlFor="is_current">
    //                         <input
    //                           id="is-current-checkbox"
    //                           type="checkbox"
    //                           id="is_current"
    //                           onChange={this.on_change}
    //                           defaultChecked
    //                         />
    //                         <span
    //                           id="is-current-span"
    //                           className="jeopardy-blue-dark-text"
    //                         >
    //                           Current
    //                         </span>
    //                       </label>
    //                     </div>
    //                   </div>
    //                   {!is_current ? (
    //                     <div className="add-experience-date-input">
    //                       <div className="col m12">
    //                         <div className="row">
    //                           <div className="custom-input-field">
    //                             <div className="input-field col m4 offset-m3">
    //                               <DatePicker
    //                                 id="to-datepicker"
    //                                 selected={this.state.to_date}
    //                                 onChange={date =>
    //                                   this.on_date_change("to_date", date)
    //                                 }
    //                                 dateFormat="MMMM d, yyyy"
    //                                 showYearDropdown
    //                                 dateFormatCalendar="MMMM"
    //                                 yearDropdownItemNumber={45}
    //                                 scrollableYearDropdown
    //                               />
    //                               <label
    //                                 className="active jeopardy-blue-dark-text"
    //                                 htmlFor="to-datepicker"
    //                               >
    //                                 To
    //                               </label>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   ) : null}
    //                   <div className="custom-input-field">
    //                     <div className="input-field input-field col m6 offset-m3">
    //                       <textarea
    //                         id="description"
    //                         className="materialize-textarea"
    //                         name="description"
    //                         value={this.state.description}
    //                         onChange={this.on_change}
    //                         ref={this.description_textarea}
    //                       ></textarea>
    //                       <label className="active" htmlFor="description">
    //                         Description
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="custom-input-field">
    //                     <div className="input-field col m6 offset-m3">
    //                       <button
    //                         type="submit"
    //                         className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
    //                       >
    //                         Update Experience
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </form>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  };

  render() {
    let { places_script_loading } = this.state;
    if (!places_script_loading) {
      return this.experience_output();
    } else {
      return (
        <div className="container">
          <Loader />
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKqURkbztzEtzzQXGxE7NVDoDmCbEXNmY&libraries=places"
            onLoad={this.handle_script_load}
          />
        </div>
      );
    }
  }
}

UpdateExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  experience: state.experience
});

export default connect(mapStateToProps, {
  get_experience_item,
  update_experience,
  clear_experience_item,
  clear_active_profile,
  clear_active_experience
})(withRouter(UpdateExperience));
