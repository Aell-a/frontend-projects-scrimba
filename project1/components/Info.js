import React from "react"

export default function Info() {
    return(
        <div className="info">
            <img src="./images/pp2.jpg" className="info--image" />
            <h1 className="info--name">Aella</h1>
            <h4 className="info--job">Web3 Developer</h4>
            <small className="info--small">aellaa.lens</small>
            <button className="info--button"><img src="./images/email.png" /> Email</button>
        </div>
    )
}