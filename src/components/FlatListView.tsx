import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo, updateTodo} from '../redux/Slice';

const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

const FlatListView = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: any) => state.todoSlice);
  const [click, setClick] = useState(false);
  const [id, setId] = useState(0);
  const [task, setTask] = useState('');

  const updateItem = (index: number) => {
    if (task !== '') {
      dispatch(updateTodo({index, task})), setClick(false);
    }
  };
  const edit = (index: number, item: string) => {
    setClick(true), setId(index), setTask(item);
  };

  return (
    <FlatList
      data={todo}
      keyExtractor={(item: any, index: any) => index}
      renderItem={({item, index}) => {
        return click == true && id === index ? (
          <View style={Styles.editView}>
            <TextInput
              value={task}
              onChangeText={text => {
                setTask(text);
              }}
              style={Styles.edit}
            />
            <View style={Styles.content}>
              <TouchableOpacity
                onPress={() => {
                  setClick(false);
                }}
                style={Styles.update}>
                <Text style={Styles.textCom}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.update}
                onPress={() => {
                  updateItem(index);
                }}>
                <Text style={Styles.textCom}>update</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={Styles.viewCard}>
            <View style={{width: windowWidth * 0.56, justifyContent: 'center'}}>
              <Text style={Styles.comBlack}>{item}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                edit(index, item);
              }}
              style={[
                Styles.touchRound,
                {backgroundColor: 'rgb(63, 79, 134)'},
              ]}>
              <Icon1 name="form" color={'white'} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(deleteTodo(index));
              }}
              style={Styles.touchRound}>
              <Icon2 name="delete" color={'white'} size={18} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
export default FlatListView;

const Styles = StyleSheet.create({
  editView: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.8,
    backgroundColor: '#D3D3D3',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  align: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.04,
  },
  comBlack: {
    color: 'black',
    fontWeight: 'bold',
  },

  textCom: {
    color: 'white',
    fontWeight: 'bold',
  },
  viewCard: {
    height: windowHeight * 0.07,
    width: windowWidth * 0.8,
    backgroundColor: '#D3D3D3',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
  },
  touchRound: {
    height: windowHeight * 0.046,
    width: windowWidth * 0.09,
    backgroundColor: 'rgb(165, 20, 17)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  edit: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.75,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
  },
  update: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.355,
    backgroundColor: 'black',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.01,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
