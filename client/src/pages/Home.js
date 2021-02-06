import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Home() {
    const { loading, data } = useQuery(FETCH_CONTACTS_QUERY);

    console.log(data);

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

const FETCH_CONTACTS_QUERY = gql`
{
    getContacts{
        id
        name
        email
        phone
        job
        address
    }
}`

export default Home;