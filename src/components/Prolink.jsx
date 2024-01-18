import React, { useEffect, useState } from "react";

import { getAccessToken } from "../utils/auth";

import { Redirect, Route, RouteProps } from 'react-router-dom';

const Prolink = ({ component: Component, path }) => {
    if (getAccessToken() === null) {
        return <Redirect to="/login" />;
    }

    return <Route component={Component} path={path} />;
};


export default Prolink;