import React, {useContext}  from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {ChosenProductContext} from './ChosenProductContext';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      width:"100%"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    document: {
      width:'100%'
    }
  });


function PrintPDFTest2(){
  const name = "Jakub"
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{name}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  )
}

export default PrintPDFTest2
