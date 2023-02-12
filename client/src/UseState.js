import React, { useEffect, useState } from 'react'

const UseState = () => {
    // let/const [state_variable, function] = useState(initialValue)
    // state_variable: variable
    // function: function to update state variable
    // initialValue: starting value
    let [count, setCount] = useState(0)
    let [data, setData] = useState(0)

    useEffect(() => {
        window.alert('Count is Updated')
    }, [])
    /*
        => useEffect shows the side effect when the state variable changes state.
        useEffect(function, [state]) 
        function => effects to be seen
        state => variable which trigger the function when the value changes
        [] => updates only at load
        [state1] => updates only when state1 updates
        [state1, state2] => updates when state1 or state2 updates
        no [] => updates everytime when any state variable updates
    */

    return (
        <>
            Count = {count}
            <br />
            {count < 10 &&
                <button onClick={() => { return setCount(count + 1) }}>Increment Count</button>
            }
            {
                count > 0 &&
                <button onClick={() => { return setCount(count - 1) }}>Decrement Count</button>
            }

            <br />
            Data = {data}
            <br />
            {
                data < 100 &&
                <button onClick={() => { return setData(data + 10) }}>Increment Date</button>
            }
            {
                data > 0 &&
                <button onClick={() => { return setData(data - 10) }}>Decrement Date</button>
            }
        </>
    )
}

export default UseState