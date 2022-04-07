import '../styles.css';
import React, { useEffect, useState } from "react";

const checkValue = (value) => {
    if (value === 0) {
        return `${value}:00 AM`
    }

    if (value % 1 === 0) {
        // its a whole number
        if (value >= 12) {
            // its a whole number and its PM
            return `${value}:00 PM`;
        } else {
            // its a whole number and its AM
            return `${value}:00 AM`;
        }
    } else {
        // its a half number
        if (value >= 12) {
            // its a half number and its PM
            return `${value - 0.5}:30 PM`;
        } else {
            // its a half number and its AM
            return `${value - 0.5}:30 AM`;
        }
    }
}


const DisplayForm = ({ timeValue, personName }) => {
    return (
        <div className="form2">
            <div className="dropdown-Result">
                <h1>Last Person : {personName}</h1>
                <h1>Last Time : {checkValue(timeValue)}</h1>
            </div>
        </div>
    );
}

export default DisplayForm;