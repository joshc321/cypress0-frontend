import {IconButton, Box, Typography, Stack, 
        TextField,
    } from '@mui/material';
import { ArrowBackIosNew
 } from '@mui/icons-material';
import AppForm from '../components/AppForm';
import PasswordTextField from '../components/passwordTextField';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState } from 'react';
import MainButton from '../components/mainbutton';
import { useNavigate } from 'react-router-dom';

function AddUser() {

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        first: '',
        last: '',
        email: '',
        role: '',
        company: '',
        password: '',
      });
    

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        
        if(values.email === '' || values.password === '' || values.last === '' || values.first === ''){
            setError(true)
        }

        if(values.email && values.password && values.last && values.first){
            console.log(values);
        }
      }

    return(
        <Box sx={{ pb: 10 }}>
            <Box sx={{ml: 0, mt:0}}>
                <IconButton
                    aria-label="back button"
                    onClick={()=>navigate('/account')}
                    edge="end"
                    >
                    {<ArrowBackIosNew/>}
                </IconButton>
            </Box>
            <Box sx={{ml: 2, mt: 2}}>
                <Typography fontWeight="fontWeightBold" variant="h4">Add User</Typography>
            </Box>
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Box sx={{ mt: 2}}>
                            <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                        </Box>
                        <TextField 
                            label="First name"
                            autoComplete="given-name"
                            fullWidth
                            error={error}
                            value={values.first}
                            onChange={handleChange('first')}
                            required
                        />
                        <TextField 
                            label="Last name"
                            autoComplete="family-name"
                            fullWidth
                            error={error}
                            value={values.last}
                            onChange={handleChange('last')}
                            required
                        />
                        <TextField 
                            type="email"
                            label="Email"
                            autoComplete="email"
                            fullWidth
                            error={error}
                            value={values.email}
                            onChange={handleChange('email')}
                            required
                        />
                        <TextField 
                            label="Role"
                            autoComplete="organization-title"
                            fullWidth
                            value={values.role}
                            onChange={handleChange('role')}
                        />
                        <TextField 
                            label="Company"
                            autoComplete="organization"
                            fullWidth
                            value={values.company}
                            onChange={handleChange('company')}
                        />
                        <PasswordTextField error={error} message={"Please input required fields"} password={values.password} handleChange={handleChange('password')}/>
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default AddUser