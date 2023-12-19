import React from 'react';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { connect } from 'react-redux';

function AlertDisplay({alert}) {
    
    const displayAlert = () => {
        if(alert !== null){
            return (
                <>
                    <Alert status={alert.alertType}>
                        <AlertIcon />
                        {alert.msg}
                    </Alert>
                </>
            )
        }
    }
    
    
    return (
        <Box>
            {displayAlert()}
        </Box>
    )
}

const mapStateToProps = state => ({
    alert: state.Alert.alert
});

export default connect(mapStateToProps)(AlertDisplay);

