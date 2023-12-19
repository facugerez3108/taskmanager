import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    dark: {
      500: '#1a202c', // Cambia esto a tu color de fondo oscuro
      700: '#2d3748', // Cambia esto a tu color de texto oscuro

    }
  }, 
  styles: {
      global:(props) => ({
        body: {
          fontFamily: 'Poppins, sans-serif',
          bg: props.colorMode === 'dark' ? 'dark.500' : 'white',
          color: props.colorMode === 'dark' ? 'dark.700' : 'black',
        },
      }),
    },
});

export default theme