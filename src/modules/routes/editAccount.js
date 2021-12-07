import { IconButton, Box, Typography,
    Stack, TextField
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate } from 'react-router-dom';
 


function EditAccount() {

    const navigate = useNavigate();


    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        first: 'Joshua',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        role: 'stuff',
        company: 'cypress',
      });
    

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        
        if(values.email === ''|| values.last === '' || values.first === ''){
            setError(true)
        }

        if(values.email && values.last && values.first){
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
                <Typography fontWeight="fontWeightBold" variant="h4">Edit Account</Typography>
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
                        {error ? <Typography variant="body2" color="error" >Please input required fields</Typography> : ""}
                        <MainButton text={"Update"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default EditAccount