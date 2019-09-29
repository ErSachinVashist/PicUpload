const headerCss = (theme) => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'block',
        color: 'white',
        fontFamily: "'Kaushan Script', cursive"
    },
    linkStyle: {
        color: 'white',
        textDecoration: 'none'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
})

const picCss = (theme) => ({
    card: {},
    noPic: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: "url('https://www.hawksearch.com/wp-content/uploads/Developer.png')"
    },
    uploadContent: {
        height: '220px',
        marginBottom: '23px',
    },
    cardHead: {
        textAlign: 'center',
        borderBottom: '1px solid lightgrey',
        paddingBottom: 9
    },
    mainPaper: {
        height: 340,
        textAlign:'center',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
});

const picModelCss=(theme)=>({
    closeButton:{
        float:'right',
        padding:'2px',
        borderRadius:2
    },
    modelTitle:{
        background:'slategrey',
        color:'white',
    }
})

const loginCss = (theme) => ({
    paper: {
        padding: 20,
        height: 300,
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        margin: '0 auto',
        position: 'relative'
    },
    avatar: {
        left: '37%',
        border: '8px solid white',
        top: -50,
        height: 100,
        width: 100,
        background: 'slategrey',
        position: 'absolute'
    },
    form: {
        marginTop: '15%',
        textAlign: 'center'
    },
    subButton: {
        marginTop: 10,
    }
});

const userCss = (theme) => ({
    paper: {
        padding: 20,
        minHeight: 300,
        position: 'relative'
    },
    mainPaper: {
        background:'whitesmoke',
        height: 340,
        overflow: 'auto'
    },
    userCard: {
        width:'98%',
margin: '5px auto'
    },
    form: {
        textAlign: 'center'
    },
    subButton: {
        marginTop: 10,
    }
});


const navCss = (theme) => ({
    card: {}

});
const notFoundCss = (theme) => ({
    card: {
        maxWidth: 400,
        margin: '14vh auto',
        [theme.breakpoints.down('xs')]: {
            width: 300
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardHead: {
        textAlign: 'center'
    }

});


export {
    headerCss,
    picCss,
    picModelCss,
    notFoundCss,
    loginCss,
    userCss,
    navCss
}
