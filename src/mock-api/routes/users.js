import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import users from 'mock-api/data/users'

const mock = new MockAdapter(axios, {
    delayResponse: 1000
});

mock.onGet('/api/heroes').reply(() => ([
    // status
    200,
    // body
    users,
    // headers
    {
        'Content-Type': 'application/json'
    }
]));