import { FlatList, RefreshControl } from 'react-native'
import React, {useState} from 'react'
import TransactionCard from './TransactionCard';

export default function TransactionList(props) {
    const {transactions, getUserTransactions} = props;
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(async() =>{
        setRefreshing(true)
        await getUserTransactions()
        setRefreshing(false);
    })

    return (
        <FlatList 
            data={transactions}
            renderItem={({ item }) => <TransactionCard transaction={item} getUserTransactions={getUserTransactions}/>}
            keyExtractor={(item, index) => {return index.toString()}}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
            }       
        />
    )
}