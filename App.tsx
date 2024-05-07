import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {SupabaseClient} from "@supabase/supabase-js";

import {supabase} from './services/supabase'

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const {data, error} = await supabase.from("tasks").select("*");

    if(error){
      console.error(error)
    }else{
      setTasks(data);
    }
  }

  const handleAddTask = async(task:string)=>{
    const {data, error} = await supabase
    .from("tasks")
    .insert({task, completed: false});

      if(error){
        console.error(error)
        setNewTask('');
      }else{
        await fetchTasks();
        setNewTask('');
      }

  }

  const deleteTask =  async (id:number)=> {
    const {error} = await supabase.from("tasks").delete().match({id});

    if(error){
      console.error(error);
    }else{
      await fetchTasks();
    }
  }

  const updateTask = async(id:number, completed: boolean) => {
    const {error} = await supabase.from("tasks").update({completed}).match({id});

    if(error){
      console.error(error);
    }else{
      await fetchTasks();
    }
  }

  useEffect(() => {
    fetchTasks();
  },[])

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />
      
      <Text style={styles.title}>Adicione uma nova tarefa!</Text>

      <View style={styles.inputContainer}>

        <TextInput 
        style={styles.input} 
        placeholder="Digite sua tarefa" 
        onChangeText={(text)=>
        setNewTask(text)} 
        value={newTask}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleAddTask(newTask)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

      </View>

      <ScrollView>

        <View style={styles.tasksContainer}>
        
          {tasks.map((task)=> (

            <View style={styles.taskContainer} key={task.id}>

              <Text style={[styles.taskText, task.completed && styles.completed]}>{task.task}</Text>

              <View style={styles.actionsContainer}>

                <TouchableOpacity style={styles.actionButtonCheck} onPress={() => updateTask(task.id, !task.completed)}>
                  <FontAwesome name="check" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButtonTrash} onPress={() => deleteTask(task.id)}>
                  <AntDesign name="delete" size={24} color="#fff" />
                </TouchableOpacity>

              </View>

            </View>

          ))}

        </View>

      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent:'center',
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 50,
  },
  inputContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width:'90%',
  },
  input:{
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    marginRight: 10,
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  buttonText:{
    color:'#fff',
    fontWeight:'bold',
  },
  tasksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2.22,
  },
  taskText:{
    fontWeight: 'bold',
    fontSize:16,
  },
  completed:{
    textDecorationLine: 'line-through',
    color:'#777',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButtonCheck: {
    backgroundColor: '#68d14f',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 1,
    marginHorizontal: 2,
  },
  actionButtonTrash: {
    backgroundColor: '#DE1D43',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 1,
    marginHorizontal: 2,
  }

});
