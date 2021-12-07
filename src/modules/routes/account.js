import { Box,Typography, List, ListItemText,
        ListItemButton, Paper, ListItem, Divider } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link } from 'react-router-dom'

function Account(){
    const name = 'Joshua Cordero'

    return(
        <Box sx={{pb: 10}}>
            <Paper square={true} sx={{
                backgroundColor: 'secondary.dark',
                height: 223,
                }}
            >
                <Box sx={{ pt: 6 }}>
                <Typography fontWeight="fontWeightBold" variant="h1" color="white" align="center">Cypress</Typography>
                <Typography sx={{ pt: 1 }}fontWeight="fontWeightSemibold" variant="h6" color="white" align="center">{name}</Typography>
                </Box>

            </Paper>
            <Box>
                <nav aria-label="main user actions">
                    <List>
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/user-customers" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Your Customers</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/logs" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Your Service Logs</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/adduser" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Add User</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ borderBottomWidth: 28 }}/>
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/edit-account" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Edit Account</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/login" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1" color="error.dark">Logout</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </nav>
            </Box>
            <BottomNavigationBar value={2} />
        </Box>

    )
}

export default Account