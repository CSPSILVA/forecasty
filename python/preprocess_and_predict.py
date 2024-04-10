import sys
import pandas as pd
import numpy as np
from keras.models import load_model
from preprocessor import preprocess_data
import json

# Function to format predictions into a JSON object with timestamps
def format_predictions(predictions, start_timestamp):
    formatted_predictions = {}
    current_timestamp = pd.to_datetime(start_timestamp)
    
    for prediction in predictions.flatten():
        formatted_predictions[current_timestamp.strftime('%Y-%m-%dT%H:%M:%S')] = float(prediction)
        current_timestamp += pd.Timedelta(hours=1)  # Increment by one hour
    
    return json.dumps(formatted_predictions, indent=4)

# Load the model
model = load_model('solar_forecasting_model.keras')

def predict_from_csv(file_path, start_timestamp):
    df = pd.read_csv(file_path)
    X, _ = preprocess_data(df, sequence_length=24)

    # Save the preprocessed data to .npy format
    npy_input_filename = 'input_data.npy'
    np.save(npy_input_filename, X)

    # Load the .npy file for prediction
    X_npy = np.load(npy_input_filename)
    predictions = model.predict(X_npy)
    
    # Formatting predictions with timestamps
    predictions_json = format_predictions(predictions, start_timestamp)
    print(predictions_json)
    
if __name__ == '__main__':
    csv_file_path = sys.argv[1]
    start_timestamp = sys.argv[2]
    predict_from_csv(csv_file_path, start_timestamp)

