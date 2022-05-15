import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
        };
    }
    handleInputChange=(e)=>{
        const {name , value} = e.target;
        this.setState({
            ...this.state,
            [name]:value,
        });
    };

    onSubmit=(e)=>{
        e.preventDefault();
        const{firstName, lastName, emailId} = this.state;
            const data = {
                firstName:firstName,
                lastName: lastName,
                emailId: emailId
            }
            console.log(data);
            axios.post("/api/v1/add-employees", data).then((res) => {
                if (res.data.success) {
                    this.setState({
                        firstName: "",
                        lastName: "",
                        emailId: ""
                    });
                }
            });
        
    };
    render() {
        return (
            <div className="py-5 container">
                <br />
                <form onClick={this.onSubmit} >
                    <fieldset>
                    <br/>
                        <legend className="text-center fontP">Add New Employee</legend>
                        <hr />
                        <div className="spacing form-group">
                            <lable class=" form-label fontP ">First Name </lable>
                            <input type="text" className="spacing form-control" name='firstName' value={this.state.firstName} onChange={this.handleInputChange}/>
                        </div>
                        <div className="spacing form-group">
                            <lable class=" form-label  fontP ">Last Name </lable>
                            <input type="text" className="spacing form-control" name='lastName' value={this.state.lastName}  onChange={this.handleInputChange}/>
                        </div>
                        <div className="spacing form-group">
                            <lable class="form-label fontP">Email </lable>
                            <input type="email" className=" spacing form-control" name='emailId' value={this.state.emailId}  onChange={this.handleInputChange}/>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div class="text-center">
                            <Link type="submit" className=" btn btn-outline-primary m-2 fontP" to="/">Save</Link>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default CreatePage;