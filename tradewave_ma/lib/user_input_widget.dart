import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'stocks_page.dart';
import 'dart:developer';

class UserNameInputWidget extends StatefulWidget {
  const UserNameInputWidget({super.key});

  @override
  State<UserNameInputWidget> createState() => _UserNameInputWidgetState();
}

class _UserNameInputWidgetState extends State<UserNameInputWidget> {
  final userController = TextEditingController();
  final passwordController = TextEditingController();
  String user = '';
  String password = '';

  @override
  void dispose() {
    super.dispose();
    userController.dispose();
    passwordController.dispose();
  }

  Future<http.Response> fetchStocks() async {
    return await http.get(Uri.parse('http://10.0.2.2:5001/stocks/symbols'));
  }

  Future<http.Response> getUser(String user, String password) async {
    return await http.post(Uri.parse('http://10.0.2.2:4001/users/login'),
      body: { 'email': user, 'password': password }
    );
  }

  void click() async {
    user = userController.text;
    password = passwordController.text;
    final response = await fetchStocks();

    if (response.statusCode == 200) {
      dynamic stockList = getStockList(response.body);
      Navigator.push(context, MaterialPageRoute(builder: (context) => StocksPage(stockList)));
    } else {
      throw Exception('Failed to get Stock Data');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      TextField(
        controller: userController, 
        decoration: const InputDecoration(prefixIcon: Icon(Icons.person),
        labelText: 'User'
      )),
      TextField(
        controller: passwordController,
        obscureText: true, 
        decoration: const InputDecoration(
          prefixIcon: Icon(Icons.password),
          labelText: 'Password',
        )
      ),
      SizedBox(
        height: 100,
        width: 100,
        child: TextButton(
          onPressed: click, 
          child: const Text('Login',
            style: TextStyle(
              color: Colors.white,
              backgroundColor: Colors.lime
            )
          )
        )
      )
    ]);
  }
}