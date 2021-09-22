import * as React from 'react';
import { Text, View, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            //console.log('sucesso');
            response.json().then(function(result){ 

              //console.log(result);
              jsonState(result)

              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }

const Pessoa = ({player,name}) => {

    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={name}/>

      <Pressable onPress={mudaModal}>
        <Text style={styles.paragraph}>{player}</Text>
      </Pressable>
    </View>
    )
}
const ShowDetalhes = ({display,toogleModal,mensagem}) => (
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                </Pressable>
          </View>
        </View>

    </Modal>

 )
const Head = () => {
   return (
    <View style={styles.head}>
      <Text style={styles.headTexto}>
        Header adicionado VickPmo
      </Text>

    </View>

   )


 }
export default function App() {
  const [jsonData,setJsonData] = React.useState({})

  executeGet("https://my-json-server.typicode.com/VictoriaPaiva/react-ado2/db",setJsonData)
  function teste({item}){
    return(
      <Pessoa player={item.idade} 
              name={item.nome}
      />
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={jsonData.data}
        
        renderItem={teste}
        keyExtractor={item => item.id}
        ListHeaderComponent={Head}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    backgroundColor: 'pink'
  },
  modalView: {
    margin: 20,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  headTexto: {
    textAlign:"center",
    fontSize: 24,
    padding:7
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    width:'100%',
    height:45,
    backgroundColor:'red'
  }
  

});
