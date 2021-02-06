import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

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

function DeleteButton({ contactId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_CONTACTS_QUERY
            });
            data.getContacts = data.getContacts.filter((p) => p.id !== contactId);
            proxy.writeQuery({ query: FETCH_CONTACTS_QUERY, data });
            if (callback) callback();
        },
        variables: {
            contactId
        }
    });
    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteContact}
            />
        </>
    );
}

const DELETE_CONTACT_MUTATION = gql`
  mutation deleteContact($contactId: ID!) {
    deleteContact(contactId: $contactId)
  }
`;

export default DeleteButton;