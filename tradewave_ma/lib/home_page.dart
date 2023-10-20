import 'package:flutter/material.dart';
import 'user_input_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login', style: TextStyle(color: Colors.white),)), 
      body: const Column(children: <Widget>[
        UserNameInputWidget()
      ])
    );
  }
}
