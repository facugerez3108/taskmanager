import React, {useEffect, useState} from 'react';
import Layout from '../hooks/Layout';
import CardTask from '../components/cards/Task';
import { get_tasks } from '../redux/actions/task';
import { connect } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { toggleDarkMode } from '../redux/actions/darkMode';

function Home({get_tasks, tasks, darkMode}) {
  
  useEffect(() => {
      window.scrollTo(0, 0);
      get_tasks() 
  }, [get_tasks])
  


  return (
     <Layout darkMode={darkMode}>
        <Box>
        <CardTask data={tasks}/>
        </Box>
      </Layout>
  );
}

const mapStateToProps = (state) => {
    return {
        tasks: state.Task.tasks,
        darkMode: state.darkMode.darkMode
    }
}

export default connect(mapStateToProps, {
    get_tasks
}) (Home);