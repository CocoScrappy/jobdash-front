import useStore from "store";
import {Outlet, useNavigate,Navigate} from 'react-router-dom';
import { useEffect, useState } from "react";

function UserProtectedRoute(){
    const uId=useStore(state=>state.id);
    // const [nav,setNav]=useState(false);
    const navigate=useNavigate();
    
    // useEffect(()=>{
    //     if(nav){
    //        navigate('/login');  
    //     }
    //     },[nav])
    // useEffect(()=>{
    //     if(uId!=='' && uId!==-1){
    //         console.log("uId= "+uId);
    //         <Outlet/>
    //     }
    //     else{
    //         // setNav(true);
    //         navigate('/login');
    //     }

    // })
    
    if(uId!=='' && uId!==-1){
                console.log("uId= "+uId);
                return <Outlet/>
    }
    return<Navigate to='/login' replace/>
        
        
}

export default UserProtectedRoute;