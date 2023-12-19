import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";


function NotFound () {
    return (
        <Box>
            <Text>Page Not Found</Text>
            <Text>Error 403</Text>
            <Link to="/">Go Back</Link>
        </Box>
    )
}

export default NotFound;