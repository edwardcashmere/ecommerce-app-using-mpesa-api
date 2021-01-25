import React,{useState,useContext} from 'react'
import Layout from "../core/Layout";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/Alert/alertContext";


const SignUp = () => {
    const authContext= useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        error:"", 
        success:false
    })

    const {name, email,password} = user
    const onSubmit =(e)=>{
        e.preventDefault()
        if(name === "" || email=== "" || password  === ""){
            alertContext.setAlert("All fields must be filled","danger")
        }else{
            authContext.createUser({name,email,password})
            setUser({
            name:"",
            email:"",
            password:"",
            error:"", 
            success:false
            })

        }
       
    }
    const onChange = (e)=> setUser({...user,error:false, [e.target.name]:e.target.value})
    const SignUpForm =(
        <form >
            <div className="form-group mt-2">
                <label className="text-muted">Name</label>
                <input type="text" name="name" onChange={onChange} placeholder="Name" value={name} required className="form-control"/>
            </div>
            <div className="form-group mt-2">
                <label className="text-muted">Email</label>
                <input type="email" name="email" onChange={onChange} placeholder="Email" value={email} required className="form-control"/>
            </div>
            <div className="form-group mt-2"> 
                <label className="text-muted">Password</label>
                <input type="password" name="password" onChange={onChange}  password={password} required className="form-control"/>
            </div>
            <button onClick={onSubmit} className="btn btn-primary mt-3">Submit</button>
        </form>

    )
    return (
        <Layout title="Sign Up" description="Ecommerce App " className="container col-md-6 offset-md-3">
            {SignUpForm}
        </Layout>
    )
}

export default SignUp
