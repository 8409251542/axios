import { useState } from "react"

function Counter(){
    const [count,setCount] = useState(0);
    return(
        <>
            <button onClick={()=>setCount((pre)=>pre+1)} >{count}</button>
        </>
    )
}

export default Counter;
// //count=count+1;
// //let count or co
// count count =1;
// count+1