import {useState} from "react";

function JobApplicationDetails(props) {

    const [applicationInfo, setApplicationInfo] = useState(props)

    console.log(applicationInfo)
    return(
        <div>
            Job Application Details
        </div>
    )
}

export default JobApplicationDetails