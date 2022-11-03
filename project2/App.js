import React from "react"
import Navbar from "./components/Navbar"
import Travel from "./components/Travel"
import data from "./data"

export default function App() {
    const travel = data.map(info => {
        return (
            <Travel 
                key={info.id}
                {...info}
            />
        )
    })
    return(
        <div>
            <Navbar />
            <section className="travels">
                {travel}
            </section>
        </div>
    )
}

