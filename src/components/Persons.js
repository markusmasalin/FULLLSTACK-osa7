import React from "react"

const Persons = (props) => {
    return (
        props.authors.map(p => 
            <div key={p.author}>
            {p.author} {p.title} <button onClick={()=>props.deletePerson(p.id)}>delete</button>
            </div>     
        )
    )
} 





export default Persons





