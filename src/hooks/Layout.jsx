import  React,{ useEffect} from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/navigation/Navbar';
import { check_authenticated } from '../redux/actions/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = (props) => {
    useEffect(() => {
        props.check_authenticated()
    }, [])


    return (
        <>
            <Navbar />
            <ToastContainer autoClose={5000}/>
            {props.children}
        </>
    )
}

export default connect(null, { check_authenticated, })(Layout);