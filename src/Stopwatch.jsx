/* eslint-disable react/prop-types */
import React from 'react';

export default function Stopwatch(props) {
    const [time, setTime] = React.useState(0);
    const [timerId, setTimerId] = React.useState(null);

    React.useEffect(() => {
        let id;

        // Start or restart timer
        if (!props.tenzies) { // Resets timer
            setTime(0);
            id = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
            setTimerId(id);
        } else if (timerId) { // Stops timer
            clearInterval(timerId);
            setTimerId(null);
        }

        return () => {
            if (id) {
                clearInterval(id);
            }
        };
    }, [props.tenzies])

    return (
        <div>
            Elapsed Time: <span className={!props.tenzies ? "green" : "blinking-text green"}>{time} seconds</span>
        </div>
    );
}
