import { makeStyles } from '@mui/styles';


export default makeStyles(() => ({
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 100,
        width: '35%',
        marginLeft: '35%',
        
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent : 'space-between'
    }
    
}));