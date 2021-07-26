import React from 'react';

const userContext = React.createContext({user: {}, onUpdateUser: () => {}, onLogout: () => {}});

export default userContext;