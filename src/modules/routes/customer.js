import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider,
     ListItemIcon, Fab, Backdrop, IconButton
 } from '@mui/material'
import { ArrowForwardIos,
        PinDrop, Event, LocalAtm, Notes, Note,
        Phone, Email, Add
 } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/topBar'
import { useState, useEffect } from 'react'
import  QrCode  from 'react-qr-code'
import * as svg from 'save-svg-as-png'
import Cookies from 'js-cookie'

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

async function getCustomer(id='') {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/customers/${id}`, requestOptions)
    return response.json()
}

async function getServiceRecords(records=''){
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token'),
         },
    };
    const response = await fetch(`/api/services/s?${records}`, requestOptions)
    return response.json()
}

function Customer(){
    const navigate = useNavigate();
    let { slug } = useParams(); 
    slug = slug.substring(1);
    const [showQR, setShowQR] = useState(false)
    const [customer, setCustomer] = useState({})
    const [services, setServices] = useState({})
    const [date, setDate] = useState('')
    const downloadQR = () => {
        svg.saveSvgAsPng(document.getElementById("12345"), "qrcode.png");
      };

    
    useEffect(() => {
        async function getCust() {
            const cust = await getCustomer(slug)
            let serviceQuery = '';
            for(let i = 0; i < cust.serviceRecords.length; i++){
                serviceQuery = serviceQuery.concat('&id=', cust.serviceRecords[i]['$oid'])
            }
            const serv = await getServiceRecords(serviceQuery)
            setCustomer(cust)
            setServices(serv)
        }
        getCust();
    }, [])

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const toStrDate = (date) => {
        if(date){
            console.log(Date(date['$date']).toLocaleString())
            console.log(new Date(date['$date']).toLocaleString())
            return new Date(date['$date']).toLocaleString()
        }
        else{
            return 'No Date'
        }
    }

    useEffect(() => {
        if(customer.date_created){
            let dateLocal = new Date(customer.date_created['$date']).toLocaleDateString()
            setDate(dateLocal)
        }
    }, [customer.date_created])


    const onClick = () => {
        setShowQR(!showQR)
    }

    return(
        <div>
            <TopBar onClick={onClick} primary={customer.first + ' ' + customer.last} id={slug} secondary="Information"/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showQR}
                onClick={onClick}
            >
                <Box alignItems="center" justifyContent="center">
                    <IconButton onClick={downloadQR}>
                    <QrCode 
                        id="12345"
                        value={`cypr:${slug}`}
                    />
                    </IconButton>
                </Box>
            </Backdrop>
            <Box sx={{pt: 0, pb: 8}}>
                <List>
                    <ListItem sx={{ p: 0}} onClick={() => mapsSelector(customer.address)}> 
                        <ListItemButton>
                            <ListItemIcon>
                                <PinDrop />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: 300,  pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.address}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Phone />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.phone}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Email />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.email}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Event />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{date}</Typography>
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
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.system}</Typography>
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
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.notes}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ borderBottomWidth: 18 }}/>
                    <Box sx={{ml: 2, mt: 1}}>
                        <Typography fontWeight="fontWeightBold" variant="h4">Service Record</Typography>
                    </Box>
                    <Divider sx={{pt: 1, borderBottomWidth: 3 }}/>
                </List>
                {
                services.length > 0 ?
                <Box sx={{pt: 0}}>
                    <List>
                        {services.map(({ service, notes, price, date, _id }, index) => (
                        <div key={index}>
                        {console.log(_id['$oid'], date)}
                        <ListItem key={_id} sx={{p: 0}}>
                            <ListItemButton component={Link} to={`/logs/:${_id['$oid']}`}>
                                <Event color="secondary"/>
                                <ListItemText 
                                    primary={
                                        <div>
                                        <Typography sx={{pl: 1, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{toStrDate(date)}</Typography>
                                        </div>
                                    }/>
                                <ArrowForwardIos />
                            </ListItemButton>    
                            
                        </ListItem>
                        <ListItem> 
                            <ListItemIcon>
                                <Note />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: 300, minWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{service}</Typography>
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
                                            <Typography sx={{ maxWidth: 300, minWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{notes}</Typography>
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
                                            <Typography sx={{ maxWidth: 300, minWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{price}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItem>
                        <Divider sx={{pt: 1, borderBottomWidth: 2 }}/>
                        </div>
                        ))}
                    </List>
                </Box> : ''}
            </Box>
            <Fab onClick={()=>navigate(`/new-service/:${slug}`)} color="primary" sx=
                {{
                    position: 'fixed',
                    bottom: 86, 
                    right: 16,
                }}>
                <Add />
            </Fab>
        
            <BottomNavigationBar />
        </div>
    )
}

export default Customer;