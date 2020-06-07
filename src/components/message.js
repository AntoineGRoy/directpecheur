import React from 'react'
import '../css/getUserContacts.css'

const Message = ({data,username})=>{
    return (
        <div key={data.postedAt} className={`messageLI ${data.sentBy===username? "userStyleLI" : "targetStyleLI"}`}>
       <div className={`messageP ${data.sentBy===username? "userStyleP" : "targetStyleP"}`}><span>{data.text}</span></div>
        </div>
    )
}

export default Message