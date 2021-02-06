import React, { useState, useContext, Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const GET_CONTACT = gql`
    query getContact($contactId: ID!) {
        getContact(contactId: $contactId) {
      id
      name
      phone
      job
      email
      address
        }
    }
`;

const UPDATE_CONTACT = gql`
  mutation updateContact($contactId: ID!, $name: String!,$phone: String!,$job: String!,$address: String!,$email: String!) {
    updateContact(contactId: $contactId,name: $name, phone:$phone, job:$job, address:$address, email:$email) {
      id
      name
      phone
      job
      email
      address
    }
  }
`;



function ContactEdit(props) {
    console.log(props);
    const { user } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    let name, phone, job, email, address;

    return (

        <Query query={GET_CONTACT} variables={{ contactId: props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                    <Mutation mutation={UPDATE_CONTACT} key={data.getContact._id} onCompleted={() => props.history.push(`/`)}>
                        {(updateContact, { loading, error }) => (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            Edit Contact
                                          </h3>
                                    </div>
                                    <h4><Link to="/" className="btn btn-primary footerBtn">Back</Link></h4>
                                    <div className="panel-body">
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            updateContact({
                                                variables: { contactId: props.match.params.id, name: name.value, job: job.value, phone: phone.value, address: address.value, email: email.value },
                                            },
                                            ).catch(res => {
                                                setErrors(res.graphQLErrors[0].extensions.exception.errors);
                                            });
                                            name.value = "";
                                            email.value = "";
                                            phone.value = "";
                                            job.value = "";
                                            address.value = "";
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control" name="name" ref={node => {
                                                    name = node;
                                                }} placeholder="Name" defaultValue={data.getContact.name} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type="text" className="form-control" name="phone" ref={node => {
                                                    phone = node;
                                                }} placeholder="Phone Number" defaultValue={data.getContact.phone} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" name="email" ref={node => {
                                                    email = node;
                                                }} placeholder="Email" defaultValue={data.getContact.email} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Address">Address</label>
                                                <textarea className="form-control" name="address" ref={node => {
                                                    address = node;
                                                }} placeholder="Address" cols="80" rows="3" defaultValue={data.getContact.address} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="job">Job Title</label>
                                                <input type="text" className="form-control" name="job" ref={node => {
                                                    job = node;
                                                }} placeholder="Publisher" defaultValue={data.getContact.job} />
                                            </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {Object.keys(errors).length > 0 && (
                                            <div className="ui error message">
                                                <ul className="list">
                                                    {Object.values(errors).map((value) => (
                                                        <li key={value}>{value}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
}

export default ContactEdit;