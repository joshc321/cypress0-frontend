import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider, 
    ListItemIcon
 } from '@mui/material'
import { ArrowForwardIos,
        PinDrop, Event, LocalAtm, Notes, Note
 } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link, useParams } from 'react-router-dom'
import TopBar from '../components/topBar'

function mapsSelector(search) {
    let searchEncode = encodeURIComponent(search)
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.userAgent.indexOf("iPhone") !== -1) || 
       (navigator.userAgent.indexOf("iPod") !== -1) || 
       (navigator.userAgent.indexOf("iPad") !== -1))
      window.open(`maps://maps.google.com/maps/search/?daddr=${searchEncode}`);
  
    else /* else use Google */
      window.open(`https://maps.google.com/maps/search/?api=1&query=${searchEncode}`);
  }

function ServiceRecord(){
    let { slug } = useParams(); 
    slug = slug.substring(1);
    const result = serviceExamples.find( ({ id }) => id === slug );
    

    return(
        <div>
            <TopBar primary="Service Record" secondary="Information"/>
            <Box sx={{pt: 25, pb: 8}}>
                <List>
                    <ListItem sx={{p: 0}}>
                        <ListItemButton component={Link} to={`/customer/:${result.custid}`}>
                            <ListItemText 
                                primary={
                                    <div>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>Customer</Typography>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{result.name}</Typography>
                                    </div>
                                }/>
                            <ArrowForwardIos />
                        </ListItemButton>    
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                    <ListItem sx={{p: 0}} onClick={() => mapsSelector(result.address)}>
                        <ListItemButton> 
                        <ListItemIcon>
                            <PinDrop />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, minWidth: 200, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.address}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Event />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, minWidth: 200, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.date}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <LocalAtm />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, minWidth: 200, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>${result.cost}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                    <ListItem> 
                        <ListItemIcon>
                            <Note />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.description}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Notes />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.notes}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                </List>
            </Box>

            <BottomNavigationBar />
        </div>
    )
}

export default ServiceRecord;

const serviceExamples = [
    {
      id: '9367812',
      name: 'Joe Dirt',
      description: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      date: 'December 17, 1995',
      address: '1123 South State Street, Hemet, California 92543, United States',
      cost: '23.32',
      notes: 'did some things you kmow',
      custid: '2341234'
    },
    {
      id: '9367193',
      name: 'Abrial Dias',
      description: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      date: 'June 3, 2003',
      address: '1123 South State Street, Hemet, California 92543, United States',
      cost: '2.32',
      notes: 'did some tings you kmow',
      custid: '2342342'
    },
    {
        id: '8103651',
        name: 'Azikil Dirt',
        description: "doingDi some oteha sdufa",
        date: 'December 17, 3002',
        address: '2983 Yo mama way Bazin, California 92543, United States',
      cost: '23.32',
      notes: 'did some things you kmow',
      custid: '927381',
    },
  ];