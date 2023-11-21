

from sklearn.preprocessing import MinMaxScaler
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM,Dense

class StockPredictor:
    def __init__(self,stock_data):
        self.stock_data=stock_data
        self.model=None
        self.scaler=None
    def create_model(self,x_train, y_train):
        model = Sequential()
        model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
        model.add(LSTM(units=50, return_sequences=False))
        model.add(Dense(units=25))
        model.add(Dense(units=1))
        model.compile(optimizer='adam', loss='mean_squared_error')
        model.fit(x_train, y_train, batch_size=1, epochs=5 )
        self.model=model
 
    def split_data(self,scaled_data):
        training_data_len = int(len(scaled_data) * 0.8)
        train_data = scaled_data[0:training_data_len, :]
        x_train = []
        y_train = []
        for i in range(60, len(train_data)):
            x_train.append(train_data[i - 60:i, 0])
            y_train.append(train_data[i, 0])
        x_train, y_train = np.array(x_train), np.array(y_train)
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
        return x_train, y_train, training_data_len
    
    def predict(self):
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = self.scaler.fit_transform(self.stock_data)
        x_train, y_train, training_data_len = self.split_data(scaled_data)
        self.create_model(x_train, y_train)
        if self.model is not None:
            predictions, y_test = self.test_model(scaled_data, training_data_len, self.stock_data)
            # Get the root mean squared error (RMSE)
            rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))
            predictions=self.scaler.inverse_transform(predictions)
            return predictions
        else:
            return None
    def test_model(self, scaled_data, training_data_len, stock_data):
        test_data = scaled_data[training_data_len - 60:, :]
        x_test = []
        y_test = stock_data[training_data_len:, :]
        for i in range(60, len(test_data)):
            x_test.append(test_data[i - 60:i, 0])
        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
        predictions = self.model.predict(x_test)
        return predictions, y_test