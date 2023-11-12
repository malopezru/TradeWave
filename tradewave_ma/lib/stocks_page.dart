import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:developer';

String token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoiTWF0ZW8iLCJlbWFpbCI6Im1hdGVvbHIuOTdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQndzUVdmb0o0bGN1Q05oTktLV0hlLmJmMzBKc1pibGtJTjRNakpLOW9rR2thZlJsY3NEcWkiLCJjcmVhdGVkQXQiOiIyMDIzLTEwLTIwVDAyOjQ3OjI1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTEwLTIwVDAyOjQ3OjI1LjAwMFoifSwiaWF0IjoxNjk3NzcwMDYzfQ.UEsPlPinXlnvH4stCaVEQZNznaJUQZUXyRZ8gFj2J1g';

Future<http.Response> buyStock(stockId) async {
    return await http.post(Uri.parse('http://10.0.2.2:5001/stocksActions/stock/$stockId?action=buy'),
      headers: {
        'Authorization': token
      } 
    );
}

class Stock {
  final int id;
  final String name;
  final dynamic value;

  Stock({
    required this.id, 
    required this.name,
    this.value = ''
  });


Future<http.Response> buyClick() async {
    log('Wants to buy stock with id: ${id.toString()}');
    return await buyStock(id);
  }
}

Future<http.Response> getMyStocks() async {
    return await http.get(Uri.parse('http://10.0.2.2:5001/stocksActions/user'),
      headers: {
        'Authorization': token
      } 
    );
}


List<Stock> getStockList(String jsonData) {
  final List parsedJson = jsonDecode(jsonData);
  final List<Stock> stockList = [];
  for (var value in parsedJson) {
    stockList.add(
      Stock(
        id: value['_id'], 
        name: value['name'], 
        value: value['value']
      )
    );
  }
  return stockList;
}

class StocksPage extends StatefulWidget {
  final List<Stock> listStocks;

  const StocksPage(this.listStocks);
  @override
  State<StocksPage> createState() => _StocksPageState();
}

class _StocksPageState extends State<StocksPage> {
void showMyStocks() async {
    final response = await getMyStocks();

    if (response.statusCode == 200) {
      dynamic stockList = getStockList(response.body);
      Navigator.push(context, MaterialPageRoute(builder: (context) => MyStocksPage(stockList)));
    } else {
      throw Exception('Failed to get Stock Data');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('All Stocks', style: TextStyle(color: Colors.white)),
        actions: [
            IconButton(
              icon: const Icon(Icons.account_circle_outlined),
              tooltip: 'Show My Stocks',
              onPressed: showMyStocks,
            ),
          ],), 
      body: ListView.builder(
      itemCount: widget.listStocks.length,
      itemBuilder: (context, index) {
        var stock = widget.listStocks[index];
        return Card(
          child: Row(
            children: <Widget>[
              Expanded(
                child: ListTile(
                  title: Text(stock.name),
                  subtitle: Text(stock.value.toString()),
                )
              ), 
              Row(
                children: <Widget>[
                  TextButton(
                    onPressed: stock.buyClick, 
                    child: const Text(
                      'Buy'
                    )
                  )
                ]
              )
            ]
          )
          );
      },
    )
    );
  }
}