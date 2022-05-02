import {StyleSheet, FlatList, Platform, RefreshControl} from "react-native";
import React, {useState} from 'react'
import ProjectCard from "./ProjectCard";

export default function ProjectList(props) {
    const {projects, loadProjects} = props;
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(async() =>{
        setRefreshing(true)
        await loadProjects();
        setRefreshing(false);
    })

    return (
        <FlatList 
            style={styles.list}
            data={projects}
            keyExtractor={(project) => String(project.id)}
            renderItem={({ item }) => <ProjectCard project={item} loadProjects={loadProjects} />}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
            }
        />
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === "android" ? 30 : 0,
    },
});
