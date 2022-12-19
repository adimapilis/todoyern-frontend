import React, {useContext, useEffect} from "react";
import {MainContext} from '../contexts/MainContext'
import {useNavigate} from "react-router-dom";
import { Alert } from "@mui/material";
import { useState } from "react";

function AuthComponent(props) {
    const [error, setError] = useState("")
    const {accessToken, setAccessToken} = useContext(MainContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(accessToken === '' || !accessToken){
            setError("Session Expired, Please Login.")
            setAccessToken("")
            setTimeout(()=>navigate('/login'),2500)
            
        }
    }, []);

    return (
        <div>
            {error && 
                <Alert severity="error">
                    {error}
                </Alert>
            }
            {props.children}
        </div>
    )
}

export default AuthComponent