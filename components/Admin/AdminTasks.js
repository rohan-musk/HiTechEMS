import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import User from '../../assets/icons/User.js'
import Filter from '../../assets/icons/Filter.js'
import Sort from '../../assets/icons/Sort.js'
import Search from '../../assets/icons/Search.js'
import Cards from '../Cards.js'
import SelectList from 'react-native-dropdown-select-list'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js'

const AdminTasks = ({ route, navigation }) => {
    const [filter, setFilter] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [sort, setSort] = React.useState(null);
    const [showFilter, setShowFilter] = React.useState(false);
    const [showSort, setShowSort] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
    const data = [
        { key: '1', value: 'Project' },
        { key: '2', value: 'Department' },
        { key: '3', value: 'Priority' },
        { key: '4', value: 'Status' },
    ];

    const dataSort = [
        { key: '1', value: 'Project' },
        { key: '2', value: 'Department' },
        { key: '3', value: 'Priority' },
    ];
    const [database, setDatabase] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    // selected filter
    const [selected, setSelected] = React.useState("");
    const [selectedSort, setSelectedSort] = React.useState("");

    const GetData = async () => {
        const tasksCol = collection(db, 'Tasks')
        const tasksSnapshot = await getDocs(tasksCol)
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setLoading(false)
        console.log(tasksList)
        setDatabase(tasksList)
    }

    useEffect(() => {
        // Update the document title using the browser API
        GetData()
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
                <TouchableOpacity onPress={() => {
                    setShowFilter(!showFilter)
                    setShowSort(false)
                    setShowSearch(false)
                }}>
                    <Filter />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setShowSort(!showSort)
                    setShowFilter(false)
                    setShowSearch(false)
                }}>
                    <Sort />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setShowSearch(!showSearch)
                    setShowSort(false)
                    setShowFilter(false)
                }}>
                    <Search />
                </TouchableOpacity>
            </View>
            {showFilter && <View style={styles.filterBar}>
                <SelectList
                    // onSelect={() => alert(selected)}
                    setSelected={setSelected}
                    data={data}
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
                    onPress={() => {
                        setShowFilter(false)
                    }}
                >
                    <Text style={{ color: '#FFF' }}>Done</Text>
                </TouchableOpacity>
            </View>}
            {showSort && <View style={styles.filterBar}>
                <SelectList
                    // onSelect={() => alert(selected)}
                    setSelected={setSelectedSort}
                    data={dataSort}
                    // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
                    // searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                    search={false}
                    boxStyles={{ borderRadius: 0, height: 30, width: 110, paddingVertical: 5, alignItems: 'center' }} //override default styles
                    dropDownItemStyles={{ borderRadius: 0, width: 130, position: 'relative', zIndex: 2, }}
                    defaultOption={{ key: '1', value: 'Project' }}   //default selected option
                />
                <TouchableOpacity style={{
                    backgroundColor: '#69CF45',
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    flex: 1,
                    marginHorizontal: 10
                }}
                    onPress={() => {
                        setSort(false)
                    }}
                >
                    <Text style={{ color: '#FFF' }}>Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: '#69CF45',
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    flex: 1,
                    borderRadius: 5,
                }}
                    onPress={() => {
                        setSort(true)
                    }}
                >
                    <Text style={{ color: '#FFF' }}>Descending</Text>
                </TouchableOpacity>
            </View>}
            {showSearch && <View style={styles.filterBar}>
                <TextInput
                    style={{ flex: 1, paddingHorizontal: 10 }}
                    onChangeText={setSearch}
                    value={search}
                    placeholder="Enter Field"
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
                    onPress={() => {
                        setShowSearch(false)
                    }}
                >
                    <Text style={{ color: '#FFF' }}>Done</Text>
                </TouchableOpacity>
            </View>}
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={GetData}>
                    <Text> Refresh Data</Text>
                </TouchableOpacity>
                {loading ? <Text>Loading...</Text> :
                    // <Text>{JSON.stringify(database)}</Text>
                    <FlatList
                        data={
                            database.filter((val) => {
                                if (search == "" && filter == "")
                                    return val
                                else if (filter == "" && val.project.toLowerCase().includes(search.toLowerCase())) {
                                    return val
                                }
                                else if (search == "" && selected == "1" && val.project.toLowerCase().includes(filter.toLowerCase()))
                                    return val
                                else if (search == "" && selected == "2" && val.department.toLowerCase().includes(filter.toLowerCase()))
                                    return val
                                else if (search == "" && selected == "3" && parseInt(filter, 10) == val.priority)
                                    return val
                                else if (search == "" && selected == "4" && parseInt(filter, 10) == val.status)
                                    return val
                            }).sort((p1, p2) => {
                                if (selectedSort === "1") {
                                    if (sort == true) {
                                        if (p1.project > p2.project)
                                            return -1;
                                        if (p1.project < p2.project)
                                            return 1;
                                        return 0;
                                    }
                                    else {
                                        if (p1.project > p2.project)
                                            return 1;
                                        if (p1.project < p2.project)
                                            return -1;
                                        return 0;
                                    }
                                }
                                else if (selectedSort === "2") {
                                    if (sort == true) {
                                        if (p1.department > p2.department)
                                            return -1;
                                        if (p1.department < p2.department)
                                            return 1;
                                        return 0;
                                    }
                                    else {
                                        if (p1.department > p2.department)
                                            return 1;
                                        if (p1.department < p2.department)
                                            return -1;
                                        return 0;
                                    }
                                }
                                else if (selectedSort === "3") {
                                    if (sort == true) {
                                        if (p1.priority > p2.priority)
                                            return -1;
                                        if (p1.priority < p2.priority)
                                            return 1;
                                        return 0;
                                    }
                                    else {
                                        if (p1.priority > p2.priority)
                                            return 1;
                                        if (p1.priority < p2.priority)
                                            return -1;
                                        return 0;
                                    }
                                }
                            })
                        }
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) =>
                            <Cards navigation={navigation}
                                project={item.project}
                                department={item.department}
                                assign={item.assign}
                                dependency={item.dependency}
                                due={item.due}
                                funds={item.funds}
                                given={item.given}
                                tag={item.tag}
                                text={item.text}
                                priority={item.priority}
                                id={item.id}
                                status={item.status}
                                request={1}
                            />
                        }></FlatList>
                }
            </View>
        </View>
    )
}

export default AdminTasks;

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
    cardContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },
})