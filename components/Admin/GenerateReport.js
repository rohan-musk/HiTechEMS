import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import User from '../../assets/icons/User.js'
import Filter from '../../assets/icons/Filter.js'
import Sort from '../../assets/icons/Sort.js'
import Search from '../../assets/icons/Search.js'
import TaskWise from '../TaskWise.js'
import { PieChart } from 'react-native-svg-charts'
import SelectList from 'react-native-dropdown-select-list'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js'

const GenerateReport = ({ navigation }) => {
    const [filter, setFilter] = React.useState(null);
    const [showFilter, setShowFilter] = React.useState(false);
    const [loading, setLoading] = React.useState(true);


    const datax = [
        { key: '1', value: 'Project' },
        { key: '2', value: 'Department' },
        { key: '3', value: 'Priority' },
        { key: '4', value: 'Tag' },
    ];
    const [selected, setSelected] = React.useState("");

    const [datay, setDatay] = useState([
        {
            key: 1,
            amount: 50,
            svg: { fill: '#FFB800' },
        },
        {
            key: 2,
            amount: 72,
            svg: { fill: '#00B2FF' }
        },
        {
            key: 3,
            amount: 5,
            svg: { fill: '#000' }
        },
    ])

    const [database, setDatabase] = React.useState([]);

    const GetData = async () => {
        const tasksCol = collection(db, 'Tasks')
        const tasksSnapshot = await getDocs(tasksCol)
        const tasksList = tasksSnapshot.docs.map(doc => [doc.id, doc.data()])
        setLoading(false)
        setDatabase(tasksList)
        console.log(database)
    }

    useEffect(() => {
        // Update the document title using the browser API
        GetData()
        // .then(
        //     database.forEach((data) => {
        //     if (Date(data.due.seconds * 1000).getTime() < Date.now().getTime() && (data.status === 0 || data.status === 1)) {
        //         datay[1].amount++
        //     }
        //     else if (Date(data.due.seconds * 1000).getTime() < Date.now().getTime() && data.status === 2) {
        //         datay[0].amount++
        //     }
        //     else {
        //         datay[2].amount++
        //     }
        // }))
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>HiTech</Text>
                <View style={styles.headerLogo}>
                    <User />
                </View>
            </View>
            <View style={styles.filterSearchSort}>
                <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
                    <Filter />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Sort />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Search />
                </TouchableOpacity>
            </View>
            {showFilter && <View style={styles.filterBar}>
                <SelectList
                    // onSelect={() => alert(selected)}
                    setSelected={setSelected}
                    data={datax}
                    // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                    // searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                    search={false}
                    boxStyles={{ borderRadius: 0, height: 30, width: 110, paddingVertical: 5, alignItems: 'center' }} //override default styles
                    dropDownItemStyles={{ borderRadius: 0, width: 130, position: 'relative', zIndex: 2, }}
                    defaultOption={{ key: '1', value: 'Project' }}   //default selected option
                />
                <TextInput
                    style={{ flex: 1, paddingHorizontal: 10 }}
                    onChangeText={setFilter}
                    value={filter}
                    placeholder="Enter Filter"
                    keyboardType="text"
                />
                <TouchableOpacity style={{
                    backgroundColor: '#69CF45',
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 5,
                }}
                    onPress={() => setShowFilter(false)}
                >
                    <Text style={{ color: '#FFF' }}>Done</Text>
                </TouchableOpacity>
            </View>}
            <View style={{
                backgroundColor: '#F0F0F0', paddingVertical: 20, borderRadius: 20,
            }} >
                <PieChart
                    style={{ height: 200 }}
                    data={datay}
                    valueAccessor={({ item }) => item.amount}
                    outerRadius={'90%'}
                >
                </PieChart>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#FFF', shadowColor: '#171717',
                }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, borderRightColor: '#BABABA', borderRightWidth: 2 }}>
                        <Text style={{ fontSize: 24, color: '#FFB800', fontWeight: '600', }}>{datay[0].amount}</Text>
                        <Text>Task Done</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 24, color: '#00B2FF', fontWeight: '600' }}>{datay[1].amount}</Text>
                        <Text>Task Delayed</Text>
                    </View>
                    <TouchableOpacity onPress={GetData}>
                        <Text> Press if no cards</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default GenerateReport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 24,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "700",
    },
    headerLogo: {
        backgroundColor: '#CFEFC3',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    filterSearchSort: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 7,
    },
    filterBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
})