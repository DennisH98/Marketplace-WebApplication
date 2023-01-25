import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AodIcon from '@mui/icons-material/Aod';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import EventNoteIcon from '@mui/icons-material/EventNote';

const sidebarLinks = [{link: 'Home', to: '/home', icon: <HomeIcon />},
                    {link: 'User Profile', to: '/profile',icon: <PersonIcon />},
                    {link: 'Messages', to:'/chat', icon: <MessageIcon/>},
                    {link: 'Add Product', to: '/create-product', icon: <AddBoxIcon />},
                    {link: 'Your Products', to: '/your-products', icon:<EventNoteIcon />},
                    {link: 'Cart', to: '/cart', icon: <AddShoppingCartIcon />}]
const categories = [{text:'Apparel',to:'/apparel', icon: <CheckroomIcon />}, 
                    {text:'Electronics', to:'/electronics', icon: <AodIcon />}, 
                    {text:'Houseware', to:'/houseware',icon: <ChairIcon/>}]

const drawerWidth = '20vw';

export default function Sidebar() {
    
    return (    
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}    
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {sidebarLinks.map((item,index) => (
                        <ListItemButton component={Link} key={index} to={item.to}>
                            <ListItemIcon>
                             {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.link} />
                           
                        </ListItemButton>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary="Categories" />
                    </ListItem>
                    {categories.map((item, index) => (
                        <ListItemButton component={Link} to={item.to} key={index}>
                            <ListItemIcon>
                             {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
            
    );
}
