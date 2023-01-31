import { View, Text, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Box, Button, Center, Heading, Radio, useToast } from 'native-base'
import {caesarCipherEncode,caesarCipherDecode} from './algos/Calc'

const Home = () => {
    let [val,setVal]=useState('')
    let [k,setK]=useState(0)
    let [selection,setSelection]=useState('')
    let toast=useToast()
    useEffect(() => {
      if(selection=='Caesar Cipher')
        toast.show({description:'Decoding Caesar Cipher will produce only lower case text',title:'NOTE',duration:2000})
    
    }, [selection])
    
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
            //decode
            // start from 6 bcoz, 5th char is ':'
            if(selection=='Caesar Cipher')
            setVal(caesarCipherDecode(val.substring(6),parseInt(k)))
        }else{
            //encode
            if(selection=='Caesar Cipher')
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