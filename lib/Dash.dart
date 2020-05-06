import 'package:flutter/material.dart';

class Dash extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Authentication"),
        centerTitle: true,
        backgroundColor: Colors.lightBlue[300],
      ),
      body: Container(
        child:Center(
          child:Text("Welcome to Basics")
        )
      ),
    );
  }
}