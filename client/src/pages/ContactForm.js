import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';

function ContactForm(props) {
    const { user } = useContext(AuthContext);

    const { values, onChange, onSubmit } = useForm(createContactCallback, {
        name: '',
        phone: '',
        job: '',
        email: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const [createContact, { error }] = useMutation(CREATE_CONTACT_MUTATION, {
        variables: values,
        update(proxy, result) {
            // const data = proxy.readQuery({
            //     query: FETCH_CONTACTS_QUERY
            // });
            // data.getContacts = [result.data.createContact, ...data.getContacts];
            // proxy.writeQuery({ query: FETCH_CONTACTS_QUERY, data });
            values.name = '';
            values.phone = '';
            values.job = '';
            values.email = '';
            values.address = '';

            props.history.push('/');

        }, onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },

    });

    function createContactCallback() {
        createContact();
    }

    return (

        <div class="form-container">
            { user && (
                <Form onSubmit={onSubmit}>
                    <h2>Add a contact:</h2>
                    <Form.Field>
                        <label>Name</label>
                        <Form.Input
                            placeholder="Name"
                            name="name"
                            onChange={onChange}
                            error={errors.name ? true : false}
                            value={values.name}
                        />
                        <label>Phone Number</label>
                        <Form.Input
                            placeholder="Phone Number"
                            name="phone"
                            onChange={onChange}
                            error={errors.phone ? true : false}
                            value={values.phone}
                        />
                        <label>Email</label>
                        <Form.Input
                            placeholder="Email"
                            name="email"
                            onChange={onChange}
                            error={errors.email ? true : false}
                            value={values.email}
                        />
                        <label>Address</label>
                        <Form.Input
                            placeholder="Address"
                            name="address"
                            onChange={onChange}
                            error={errors.address ? true : false}
                            value={values.address}
                        />
                        <label>Job Title</label>
                        <Form.Input
                            placeholder="Job Title"
                            name="job"
                            onChange={onChange}
                            error={errors.job ? true : false}
                            value={values.job}
                        />

                        <Button type="submit" color="teal">
                            Submit
        </Button>
                    </Form.Field>
                </Form>
            )}
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
    );

}

const CREATE_CONTACT_MUTATION = gql`
  mutation createContact($name: String!,$phone: String!,$job: String!,$address: String!,$email: String!) {
    createContact(name: $name, phone:$phone, job:$job, address:$address, email:$email) {
      id
      name
      phone
      job
      email
      address
    }
  }
`;

const FETCH_CONTACTS_QUERY = gql`
  {
    getContacts {
        id
      name
      phone
      job
      email
      address
    }
  }
`;

export default ContactForm;