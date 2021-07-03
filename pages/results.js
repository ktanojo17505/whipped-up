import React, {useState} from 'react'
import { useRouter } from "next/router"

function Results() {
    const router = useRouter();
    const queries = router.query;
    console.log(JSON.parse(queries.diet));
    const [data, setData] = useState([]);


    return (
        <div>
            Results Page 
        </div>
    )
}

export default Results
