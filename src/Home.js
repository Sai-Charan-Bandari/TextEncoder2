import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Box, Button, Center, Heading, Radio } from 'native-base'
import {caesarCipherEncode,caesarCipherDecode} from './algos/Calc'

const Home = () => {
    let [val,setVal]=useState('')
    let [k,setK]=useState(0)
    let [selection,setSelection]=useState('')
  return (
    <Box>
        <Center>
      <Heading >TextEncoder2</Heading>
        </Center>
        <Radio.Group name="myRadioGroup"  value={selection} onChange={nextValue => setSelection(nextValue)}>
      <Radio value="Caesar Cipher" my={1}>Caesar Cipher</Radio>
      <Radio value="Hill Cipher" my={1}>Hill Cipher</Radio>
    </Radio.Group>

        <Center>
      <Heading >{selection}</Heading>
        </Center>
      <TextInput placeholder='Enter text' style={{borderWidth:2,borderColor:'black',width:300,height:300}} value={val} onChangeText={(txt)=>setVal(txt)} ></TextInput>
      <TextInput placeholder='k value' style={{borderWidth:2,borderColor:'black',width:100,height:100}} value={k} onChangeText={(txt)=>setK(txt)} ></TextInput>
      <Button
      onPress={()=>{
        if(val.substring(0,5)==='#BSC#'){
            // start from 6 bcoz, 5th char is ':'
            setVal(caesarCipherDecode(val.substring(6),parseInt(k)))
        }else{
            setVal('#BSC#'+':'+caesarCipherEncode(val,parseInt(k)))
        }
      }}
      >
        {val.substring(0,5)==='#BSC#' ? 'Decode' : 'Encode'}
      </Button>
    </Box>
  )
}

export default Home