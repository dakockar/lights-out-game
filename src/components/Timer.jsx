import React from 'react'

export default function Timer(props) {
    const { time } = props;

    function formatTime(time) {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        // console.log(mins, secs);
        if (secs < 10) secs = "0" + secs;
        if (mins < 10) mins = "0" + mins;


        return `${mins}:${secs}`
    }

    return (
        <div>
            Time: {formatTime(time)}
        </div>
    )
}
