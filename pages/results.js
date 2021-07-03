import React from 'react'
import { useRouter } from "next/router"

function Results() {
    const router = useRouter();
    console.log(router.query);
    return (
        <div>
            Results Page 
        </div>
    )
}

export default Results
