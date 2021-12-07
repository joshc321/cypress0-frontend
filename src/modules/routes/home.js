import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  FilledInput,
  IconButton,
  Divider,
  Fab,
} from "@mui/material";
import { ArrowForwardIos, Search, Add } from "@mui/icons-material";
import BottomNavigationBar from "../components/bottomNavigationBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from 'js-cookie'


function refreshCustomers() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => customerExamples[getRandomInt(customerExamples.length)]
  );
}

async function getUsers(start='', end='') {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/customers?s=${start}&e=${end}`, requestOptions)
    return response.json()
}

function Home() {
  const navigation = useNavigate();

  //api
  const [users, setUsers] = useState([])
  const [startVal, setStartVal] = useState(0)
  //

  const [messages, setMessages] = useState(() => refreshCustomers());

  const [hasMore, setMore] = useState(true);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getMore = async() => {
    let newUsers = await getUsers(startVal, startVal+10);
    if(newUsers.length == 0){
        setMore(false);
        return;
    }
    setStartVal(startVal+10)
    setUsers([...users, ...newUsers]);
  };

  useEffect(async() => {
      let user = await getUsers(startVal, startVal+10)
      setStartVal(startVal+10)
      console.log(user)
      setUsers(user)
  }, [])


  useEffect(() => {
    setMessages(refreshCustomers());
    console.log(users)
  }, [searchVal, setMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchVal(search);
    console.log(search);
  };
  return (
    <div key={"main div"}>
      <Paper
        square={true}
        elevation={0}
        sx={{
          position: "fixed",
          zIndex: "tooltip",
          width: "100%",
          height: 90,
          p: 3,
        }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Box m="auto">
            <FormControl variant="filled" fullWidth>
              <InputLabel size="small" htmlFor="filed-adornment-search">
                Search
              </InputLabel>
              <FilledInput
                size="small"
                disableUnderline={true}
                value={search}
                onChange={handleChange}
                style={{
                  borderRadius: 25,
                }}
                id="filled-adornment-search"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>
          </Box>
        </form>
        <Divider sx={{ pt: 2 }} />
      </Paper>
      <Box sx={{ pt: 10, pb: 8 }}>
        <InfiniteScroll
          dataLength={users.length}
          next={getMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more cutomers</b>
            </p>
          }
        >
          <List>
            {users.map(({ first, phone, address, _id }, index) => (
            
              <div key={index + _id['$oid']}>
                <ListItem key={index + _id + "list item al"} sx={{ p: 0 }}>
                  <ListItemButton
                    key={index + "list:item"}
                    component={Link}
                    to={`/customer/:${_id['$oid']}`}
                  >
                    <ListItemText
                      key={index + "list item box"}
                      primary={
                        <div>
                          <Typography
                            key={index + phone}
                            sx={{
                              fontFamily: "Proxima Nova Alt",
                              fontWeight: "fontWeightThin",
                              fontSize: 13,
                            }}
                          >
                            {phone}
                          </Typography>
                          <Typography
                            key={index + first}
                            sx={{
                              fontFamily: "Proxima Nova Alt",
                              fontWeight: "fontWeightBold",
                              fontSize: 18,
                            }}
                          >
                            {first}
                          </Typography>
                        </div>
                      }
                      secondary={
                        <Typography
                          key={index + address}
                          sx={{
                            fontFamily: "Proxima Nova Alt",
                            fontWeight: "fontWeightLight",
                            fontSize: 13,
                          }}
                        >
                          {address}
                        </Typography>
                      }
                    />
                    <ArrowForwardIos key={index + "arrowButton"} />
                  </ListItemButton>
                </ListItem>

                <Divider variant="middle" />
              </div>
            ))}
          </List>
        </InfiniteScroll>
      </Box>
      <Fab
        onClick={() => navigation("/create-customer")}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 86,
          right: 16,
        }}
      >
        <Add />
      </Fab>
      <BottomNavigationBar value={0} />
    </div>
  );
}

export default Home;

const customerExamples = [
  {
    id: "2341234",
    name: "Joe Dirt",
    phone: "902 873 4721",
    address: "Hemet CA",
  },
  {
    id: "2342342",
    name: "Abrial Dias",
    phone: "823 876 1234",
    address: "Western, CA",
  },
  {
    id: "927381",
    name: "Azikil Dirt",
    phone: "093 234 1293",
    address: "joe mamas houe",
  },
];
