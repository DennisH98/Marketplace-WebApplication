
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';

export default function Header(props) {
    
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear();
        navigate('/');
    };

    return (
        
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Marketplace
                </Typography>
                {/* {!loggedIn ? <Button color="inherit" href='/'>Login</Button> : <Button color="inherit">Logout</Button>} */}
                <Button onClick={logout} color="inherit" >Logout</Button>
            </Toolbar>
        </AppBar>
        
    )
}
