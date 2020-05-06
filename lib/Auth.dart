import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class Auth extends StatefulWidget {
  @override
  _AuthState createState() => _AuthState();
}

class _AuthState extends State<Auth> {
  final FirebaseAuth auth = FirebaseAuth.instance; //created an instance of firebase auth
  AuthResult authResult; //created an instance of auth result -what we get back

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  signUp(String email, String password) async {
    try {
      authResult = await auth.createUserWithEmailAndPassword(
          email: email, password: password);
      print("account created for user: " + authResult.user.email);
      authResult.user.sendEmailVerification();
    } catch (e) {
      print(e);
    }
  }

  signIn(String email, String password) async {
    try {
      authResult = await auth.signInWithEmailAndPassword(email: email, password: password);
      if(authResult.user.isEmailVerified){
        //navigation
      }
    } catch (e) {
      print(e);
    }
  }

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
                    controller: emailController,
                    obscureText: true,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Email',
                    ),
                  )),
              Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: TextField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                    ),
                  )),
              Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: FlatButton(child: Text("SignUp"), onPressed: signUp(emailController.text,passwordController.text))),
              Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: FlatButton(child: Text("Signin"), onPressed: signIn(emailController.text,passwordController.text))),
            ]),
      ),
    );
  }
}
