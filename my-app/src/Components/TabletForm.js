import '../styles.css';
import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Nala from "../api/Nala"

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


const TabletForm = () => {
    const [sliderValue, setSliderValue] = useState(12);

    function handleOnChange(event, value) {
        setSliderValue(parseFloat(value))
    }

    const handleSubmit = async () => {
        // this is a asnyc function that handles the user clicking submit
        try {
            const response = await Nala.post("/createUser", {
                name: "Dam",
                age: 23
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div >
            <div className="form">
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                    />
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
                        onChange={handleOnChange}
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
        </div>
    );
}

export default TabletForm;