import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Alert
}
    from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteAllTodo, deleteTodo, updateTodo, getTodo } from "../redux/slice";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window")

const Todo = () => {

    const dispatch = useDispatch()
    const todo = useSelector((state: any) => state.todoSlice)
    const [click, setClick] = useState(false)
    const [id, setId] = useState(0);
    const [text, setText] = useState("")
    const [task, setTask] = useState("")


    useEffect(() => { retrieveData() }, [])
    useEffect(() => { storeData() }, [todo])
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('todoData');
            if (value !== null) {
                dispatch(getTodo(JSON.parse(value)))
            }
        } catch (error: any) {
            Alert.alert("error 1", error)
        }
    };

    const addItem = () => {
        if (text !== "") {
            dispatch(addTodo(text)),
                setText("")
        }
    }

    const updateItem = (index: number) => {
        if (task !== "") {
            dispatch(updateTodo({ index, task })), setClick(false)

        }
    }
    const edit = (index: number, item: string) => {

        setClick(true), setId(index), setTask(item)
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'todoData',
                JSON.stringify(todo)
            );
        } catch (error: any) {
            Alert.alert("error 2", error)
        }
    };

    return (

        <View style={Styles.container}>
            <Text style={Styles.titleText}>Todo App</Text>

            <View style={Styles.align}>
                <TextInput
                    placeholder="Task.."
                    placeholderTextColor={"gray"}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    style={Styles.input} />

                <TouchableOpacity
                    onPress={() => { addItem() }}
                    style={Styles.touchAdd}
                >
                    <Text style={Styles.addText}>Add</Text>
                </TouchableOpacity>

            </View>


            <FlatList
                data={todo}
                renderItem={({ item, index }) => {
                    return click == true && id === index ?


                        (<View style={Styles.editView}>

                            <TextInput
                                value={task}
                                onChangeText={(text) => { setTask(text) }}
                                style={Styles.edit}
                            />
                            <TouchableOpacity
                                onPress={() => { setClick(false) }}
                                style={[Styles.touchRound, { backgroundColor: "black" }]}
                            >
                                <Text style={Styles.textCom}>X</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={Styles.update}
                                onPress={() => { updateItem(index) }}>
                                <Text style={Styles.textCom}>update</Text>
                            </TouchableOpacity>
                        </View>)
                        :

                        (<View style={Styles.viewCard}>
                            <View style={{ width: windowWidth * 0.56, justifyContent: "center" }}>
                                <Text style={Styles.comBlack}>{item}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { edit(index, item) }}
                                style={[Styles.touchRound, { backgroundColor: "rgb(63, 79, 134)" }]}
                            >
                                <Icon1 name="form" color={"white"} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                   onPress={() => { dispatch(deleteTodo(index)) }}
                                style={Styles.touchRound}
                            >
                                <Text style={Styles.textCom}>x</Text>
                            </TouchableOpacity>

                        </View>)

                }}
            />
            {
                !!todo.length && <TouchableOpacity
                    onPress={() => { dispatch(deleteAllTodo()) }}
                    style={Styles.del}>
                    <Text>Delete all</Text>
                </TouchableOpacity>

            }
        </View >

    )
}
export default Todo;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    editView: {
        flexDirection: "row",
        marginTop: windowHeight * 0.02
    },
    align: {
        flexDirection: "row",
        marginBottom: windowHeight * 0.04
    },
    comBlack: {
        color: "black",
        fontWeight: "bold"
    },
    del: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.4,
        backgroundColor: "black",
        marginBottom: 20,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: windowWidth * 0.02,
        marginTop: windowHeight * 0.1
    },
    input: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "black",
        color: "black"
    },
    textCom: {
        color: "white",
        fontWeight: "bold"
    },
    touchAdd: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.18,
        borderRadius: 6,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    },
    addText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    viewCard: {
        height: windowHeight * 0.07,
        width: windowWidth * 0.8,
        backgroundColor: "#D3D3D3",

        margin: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        flexDirection: "row"
    },
    touchRound: {
        height: windowHeight * 0.046,
        width: windowWidth * 0.09,
        backgroundColor: "rgb(165, 20, 17)",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 4
    },
    edit: {
        height: 40,
        width: 200,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "black",
        color: "black"
    },
    update: {
        height: windowHeight * 0.05,
        width: windowWidth * 0.2,
        backgroundColor: "black",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
})