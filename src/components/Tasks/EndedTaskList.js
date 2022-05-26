import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react';
import EndedTaskCard from './EndedTaskCard';

//Lista de tareas acabadas
export default function EndedTaskList(props) {
    const {tasks, loadTasks} = props;
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(async() =>{
        setRefreshing(true)
        await loadTasks();
        setRefreshing(false);
    })
    
    return (
        <>  
            <Text style={styles.title}>Tareas acabadas</Text>
            <FlatList
            data={tasks}
            loadTasks={loadTasks}
            renderItem={({ item }) => <EndedTaskCard task={item} loadTasks={loadTasks}/> }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
            }
            />
        </>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15
    },
    container: {
        height: '30%',
    },
});