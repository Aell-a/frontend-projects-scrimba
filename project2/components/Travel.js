import React from "react"

export default function Travel(props) {
    return(
        <div className="travel">
            <img src={props.imageUrl} className="travel--image"/>
            <div className="travel--textbox">
                <div className="travel--location">
                    <img src="../images/loc.png"/>
                    <h4>{props.location}</h4>
                    <a href={props.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h1>{props.title}</h1>
                <h4>{props.startDate} - {props.endDate}</h4>
                <p>{props.description}</p>
            </div>
        </div>
    )
}