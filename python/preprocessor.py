import pandas as pd
import numpy as np
from sklearn.preprocessing import RobustScaler
import joblib

def preprocess_data(df, sequence_length=24, chunk_size=10000):
    # Replace missing values with column means
    df = df.fillna(df.groupby('Timestamp').transform('mean'))
    
    # Extract time features
    df['Timestamp'] = pd.to_datetime(df['Timestamp'])
    df['hour'] = df['Timestamp'].dt.hour
    df['day_of_week'] = df['Timestamp'].dt.dayofweek
    df['month'] = df['Timestamp'].dt.month
    df['is_weekend'] = df['Timestamp'].dt.weekday >= 5
    
    # Add lag features
    for lag in range(1, 5):
        df[f'SolarGeneration_lag_{lag}'] = df['SolarGeneration'].shift(lag)
    
    # Add rolling window statistics
    df['SolarGeneration_rolling_mean_1h'] = df['SolarGeneration'].rolling(window=4).mean()
    
    # Drop initial rows with NaN values
    df = df.dropna()
    
    # Select features for scaling
    features_to_scale = ['SolarGeneration', 'AirTemperature', 'RelativeHumidity', 'WindSpeed', 
                         'SolarGeneration_lag_1', 'SolarGeneration_rolling_mean_1h']
    df_scaled = df.copy()
    scaler = joblib.load('robust_scaler.joblib')  # Load your scaler
    df_scaled[features_to_scale] = scaler.transform(df[features_to_scale].values)
    
    # Convert scaled data to float32
    for col in features_to_scale:
        df_scaled[col] = df_scaled[col].astype('float32')
    
    # Initialize lists to store input sequences and corresponding outputs
    input_sequences = []
    output_sequences = []
    
    # Process dataset in chunks and prepare sequences
    for start in range(0, df_scaled.shape[0] - sequence_length, chunk_size):
        end = min(start + chunk_size, df_scaled.shape[0] - sequence_length)
        for i in range(start, end):
            input_sequences.append(df_scaled.iloc[i:i+sequence_length][features_to_scale].values)
            output_sequences.append(df_scaled.iloc[i+sequence_length]['SolarGeneration'])
    
    # Convert lists to numpy arrays
    X = np.array(input_sequences, dtype='float32')
    Y = np.array(output_sequences, dtype='float32')
    
    return X, Y

# Example of using the function
# df = pd.read_csv('your_dataset.csv')
# X, Y = preprocess_data(df)

