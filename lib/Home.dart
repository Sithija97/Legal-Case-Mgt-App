import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final Firestore firestore = Firestore.instance; //created an instance of firestore

  void create() async{
    try{
      await firestore.collection('Users').document('MyUsers').setData({
        'firstName':'WA',
        'lastName':'Nayana'
      });
      print('user_created');
    }catch(e){
      print(e);
    }
  }

  void read() async{
    DocumentSnapshot documentSnapshot;
    try{
      documentSnapshot = await firestore.collection('Users').document('MyUsers').get();
      print(documentSnapshot.data);
    }catch(e){

    }
  }

  void update() async{
    try{
      await firestore.collection('Users').document('MyUsers').updateData({
        'firstName':'Sithija',
      });
    }catch(e){

    }
  }

  void delete() async{
    try{
      firestore.collection('Usres').document('MyUsers').delete();
      print('records deleted');
    }catch(e){

    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Basics"),
        centerTitle: true,
        backgroundColor: Colors.indigoAccent[400],
      ),
      body:Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FlatButton(
              child:Text("Create"),
              onPressed: create),
            FlatButton(
              child: Text("Read"),
              onPressed: read),
            FlatButton(
              child: Text("Update"),
              onPressed: update),
            FlatButton(
              child: Text("Delete"),
              onPressed: delete)
          ],
        )
      )
    );
  }
}