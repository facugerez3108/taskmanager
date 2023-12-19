const initialState = {
    darkMode: false,
  };
  
  // Reducer para manejar el estado del modo oscuro
  const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_DARK_MODE':
        return {
          ...state,
          darkMode: !state.darkMode,
        };
      default:
        return state;
    }
  };
  
  export default darkModeReducer;