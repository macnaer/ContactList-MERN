import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentContact } from "../../Actions/ContactListActions";
import ContactListService from "../../Services/ContactListService";

class EditContact extends React.Component {

   id = this.props.match.params.id;

  componentDidMount = () => {
    const { getCurrentContact } = this.props;
    const contactListService = new ContactListService();
   
    contactListService.onEdit(this.id).then(data => {
      console.log("componentDidMount editContact ", data.contact)
      getCurrentContact(data.contact);
    })
   
  }

  getName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  getRole = (event) => {
    this.setState({
      role: event.target.value,
    });
  };
  getAvatar = (event) => {
    this.setState({
      avatar: event.target.value,
    });
  };
  getStatus = (event) => {
    this.setState({
      status: event.target.value,
    });
  };
  getEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  getGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  onSendData = (event) => {
    event.preventDefault();
    const {
      name,
      role,
      avatar,
      status,
      email,
      gender,
      created,
      id,
    } = this.state;
    this.props.onEditCurrentContact(
      name,
      role,
      avatar,
      status,
      email,
      gender,
      created,
      id
    );
    this.setState({
      isRedirect: true,
    });
  };

  render() {
  
    if (!this.props.hasOwnProperty("currentContact")){
      const { avatar = "", role, name, status, email, created, gender } = this.props.currentContact;
    }

    const { avatar = "", role, name, status, email, created, gender } = this.props.currentContact;
  
   
    console.log("this.props.currentContact ", this.props.currentContact);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onSendData}>
              <div className="form-group">
                <div>
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Name"
                    onChange={this.getName}
                  />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <input
                    type="text"
                    value={role}
                    className="form-control"
                    placeholder="Role"
                    onChange={this.getRole}
                  />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <input
                    type="number"
                    value={avatar}
                    min="1"
                    max="99"
                    className="form-control"
                    placeholder={avatar}
                    onChange={this.getAvatar}
                  />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Status"
                    onChange={this.getStatus}
                    value={status}
                  />
                </div>
              </div>

              <div className="form-group">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    placeholder="Email"
                    onChange={this.getEmail}
                  />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gender"
                    value={gender}
                    onChange={this.getGender}
                  />
                </div>
              </div>

              <div className="form-group">
                <div>
                  <button type="submit" className="btn btn-default">
                    Edit contact
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ contactListReducer }) => {
  console.log("mapStateToProps EDIT CONTACT ", contactListReducer);
  const { List, loading, currentContact } = contactListReducer.state;
  return { List, loading, currentContact};
};

const mapDispatchToProps = {
  getCurrentContact
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditContact));
