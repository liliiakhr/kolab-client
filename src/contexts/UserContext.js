import React from 'react';

const userContext = React.createContext({user: {}, onUpdateUser: () => {}});

export default userContext;