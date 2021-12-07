import TopBase from "../components/topbase"
import { useState } from "react"
import AppForm from "../components/AppForm"
import { TextField, Stack } from "@mui/material"
import MainButton from "../components/mainbutton"
import { useNavigate } from 'react-router-dom'

function Forgot(){

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const handleChange = () => (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setError(false)
        if (email === ''){
            setError(true)
        }

        if(email){
            console.log(email)
            navigate('/login')
        }
    }

    return(
        <div>
            <TopBase page="Forgot Password" arrow={true}/>
            <AppForm>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    <TextField 
                        type="email"
                        label="Email"
                        autoComplete="email"
                        fullWidth
                        error={error}
                        value={email}
                        onChange={handleChange('email')}
                        required
                        helperText = {error ? 'Input valid email' : ''}
                    />
                    <MainButton text={"Send"} />
                    </Stack>
                </form>
            </AppForm>
        </div>
    )
}

export default Forgot;