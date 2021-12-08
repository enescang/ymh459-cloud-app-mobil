import * as React from 'react';

export const navigationRef = React.createRef();

export const getNavigator = ()=> navigationRef.current;