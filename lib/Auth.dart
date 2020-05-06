import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Auth extends StatefulWidget {
  @override
  _AuthState createState() => _AuthState();
}

class _AuthState extends State<Auth> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Authentication"),
        centerTitle: true,
        backgroundColor: Colors.lightBlue[300],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
          Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextField(
                obscureText: true,
                decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Email',
            ),
          )),
          Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextField(
                obscureText: true,
                decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Password',
            ),
          )),
          Padding(
              padding: const EdgeInsets.all(20.0),
              child:FlatButton(
                child: Text("SignUp"),
                onPressed: null)),
          Padding(
              padding: const EdgeInsets.all(20.0),
              child:FlatButton(
                child: Text("Signin"),
                onPressed: null)),
        ]),
      ),
    );
  }
}
