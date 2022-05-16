import { FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import ToDoTaskCard from './ToDoTaskCard';
import ChangerButton from './ChangerButton';

export default function ToDoTaskList(props) {
  const {tasks, setTasks, loadTasks, duration, setDuration, selectedTask, setSelectedTask, range, setRange, isPlaying, setPlay} = props;
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = React.useCallback(async() =>{
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  })

  return (
    <View style={styles.container}>
      {/*<ChangerButton range={range} setRange={setRange}/> */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => 
        <ToDoTaskCard 
          task={item}
          tasks={tasks}
          setTasks={setTasks}
          loadTasks={loadTasks} 
          selectedTask={selectedTask} 
          setSelectedTask={setSelectedTask} 
          duration={duration} 
          setDuration={setDuration}
          isPlaying={isPlaying}
          setPlay={setPlay}/>}
        
        keyExtractor={(item, index) => {return index.toString()}}
        horizontal={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>
        }
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      height: '25%',
  },
  noTasks: {
    paddingVertical: 80,
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Roboto_Medium'
  }
});