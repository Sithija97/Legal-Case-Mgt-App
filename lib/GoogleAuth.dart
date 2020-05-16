import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class GoogleAuth extends StatefulWidget {
  @override
  _GoogleAuthState createState() => _GoogleAuthState();
}

class _GoogleAuthState extends State<GoogleAuth> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  FirebaseUser _user;
  GoogleSignIn _googleSignIn = new GoogleSignIn();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("google Authentication"),
        centerTitle: true,
        backgroundColor: Colors.lightBlue[300],
      ),
      body: Container(
          child: Center(
              child: OutlineButton(
                  child: Text("Signin with Google"), onPressed: null))),
    );
  }

  bool IsSignIn = false;
  Future<void> handleSignIn() async {
    GoogleSignInAccount googleSignInAccount = await _googleSignIn.signIn();
    GoogleSignInAuthentication googleSignInAuthentication =
        await googleSignInAccount.authentication;
    AuthCredential credential = GoogleAuthProvider.getCredential(
        idToken: googleSignInAuthentication.idToken,
        accessToken: googleSignInAuthentication.accessToken);
    AuthResult result = (await _auth.signInWithCredential(credential));
    _user = result.user;

    setState(() {
      IsSignIn = true;
    });
  }

  Future<void> handleSignOut() async {
    await _auth.signOut().then((onValue){
      _googleSignIn.signOut();
      setState((){
        IsSignIn = false;
      });
    });
  }
}
