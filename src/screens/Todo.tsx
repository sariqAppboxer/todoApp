import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import FlatListView from '../components/FlatListView';
import {addTodo, deleteAllTodo, getTodo} from '../redux/Slice';

const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

const Todo = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: any) => state.todoSlice);
  const [text, setText] = useState('');

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    storeData();
  }, [todo]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todoData');
      if (value !== null) {
        dispatch(getTodo(JSON.parse(value)));
      }
    } catch (error: any) {
      Alert.alert('error 1', error);
    }
  };

  const addItem = () => {
    if (text !== '') {
      dispatch(addTodo(text)), setText('');
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('todoData', JSON.stringify(todo));
    } catch (error: any) {
      Alert.alert('error 2', error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.titleText}>Todo App</Text>

      <View style={Styles.align}>
        <TextInput
          placeholder="Task.."
          placeholderTextColor={'gray'}
          value={text}
          onChangeText={text => setText(text)}
          style={Styles.input}
        />

        <TouchableOpacity
          onPress={() => {
            addItem();
          }}
          style={Styles.touchAdd}>
          <Text style={Styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatListView />

      {!!todo.length && (
        <TouchableOpacity
          onPress={() => {
            dispatch(deleteAllTodo());
          }}
          style={Styles.del}>
          <Text style={Styles.textCom}>Delete all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Todo;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  align: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.04,
  },
  del: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.4,
    backgroundColor: 'black',
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: windowWidth * 0.02,
    marginTop: windowHeight * 0.1,
  },
  input: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
  },
  textCom: {
    color: 'white',
    fontWeight: 'bold',
  },
  touchAdd: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.18,
    borderRadius: 6,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
