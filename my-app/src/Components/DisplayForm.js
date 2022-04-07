import '../styles.css';
import React, { useEffect, useState } from "react";
import Nala from "../api/Nala";

const checkValue = (value) => {
    if (value === 0) {
        return `:00 AM`
    }

    if (value % 1 === 0) {
        // its a whole number
        if (value >= 12) {
            // its a whole number and its PM
            return `00 PM`
        } else {
            // its a whole number and its AM
            return `:00 AM`
        }
    } else {
        // its a half number
        if (value >= 12) {
            // its a half number and its PM
            return `:30 PM`
        } else {
            // its a half number and its AM
            return `:30 AM`
        }
    }
}


const DisplayForm = () => {
    const [timeValue, setTimeValue] = useState(0);
    const [personName, setPersonName] = useState("");

    useEffect(() => {
        // when this component loads then the fields will be populated
        getUser().then((user) => {
            setPersonName(user.name)
            setTimeValue(user.time)
        })
    }, [])


    const getUser = async () => {
        try {
            // get a random user from the database and populate the fields
            const user = await Nala.post("/getUser");
            return user.data.user
        } catch (error) {
            return null
        }
    }

    return (
        <div className="form2">
            <div className="dropdown-Result">
                <h1>Last Person : {personName}</h1>
                <h1>Last Time : {timeValue}</h1>
            </div>
        </div>
    );
}

export default DisplayForm;