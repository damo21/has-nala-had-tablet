import '../styles.css';
import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Nala from "../api/Nala";

/* 
This component will consist of the imput for the form
*/
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

const delay = ms => new Promise(res => setTimeout(res, ms));

const TabletForm = (props) => {
    const [sliderValue, setSliderValue] = useState(12);
    const [person, setPerson] = React.useState("Damian");
    const [isLoading, setIsLoading] = useState(false);

    function handleSlider(event, value) {
        setSliderValue(parseFloat(value));
    }

    function handleDropDown(event, value) {
        setPerson(event.target.value);
    }

    const handleSubmit = async () => {
        // this is a asnyc function that handles the user clicking submit
        setIsLoading(true)
        try {
            await delay(4000);
            const response = await Nala.post("/createUser", {
                name: person,
                time: sliderValue
            });
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
        props.getUser();
    }

    return (
        <div className="form">
            <div className='dropdownPos'>
                <Select
                    className='dropdown'
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleDropDown}
                    value={person}
                >
                    <MenuItem value={"Damian"}>Damian 1</MenuItem>
                    <MenuItem value={"Damian2"}>Damian 2</MenuItem>
                    <MenuItem value={"Damian3"}>Damian 3</MenuItem>
                    <MenuItem value={"Damian4"}>Damian 4</MenuItem>
                    <MenuItem value={"Damian5"}>Damian 5</MenuItem>
                </Select>
            </div>
            <div className='time-scale'>
                <Slider
                    key="time-scale-slider"
                    size='large'
                    step={0.5}
                    aria-label="Temperature"
                    min={0}
                    max={23.5}
                    value={sliderValue}
                    className='time'
                    onChange={handleSlider}
                />
            </div>
            <div className='timeText'>
                <h1>
                    Current Time Selected: {checkValue(sliderValue)}
                </h1>
            </div>
            <div className='sendButtonPosition'>
                <Button
                    className='sendButton'
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}

                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default TabletForm;