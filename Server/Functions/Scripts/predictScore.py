import sys
import joblib
import json
import os

def main():
    # if len(sys.argv) > 1:
    if True:
        data = sys.argv[1]
        data = [data]
        path = os.path.abspath('Functions/Scripts/Resume_modal.pkl')
        # data = ['computer , science, machine']
        model = joblib.load(path)
        predictions = model.predict(data)
        predictions = list(predictions)
        predictions = predictions[0]
        print(json.dumps({"predictions":predictions}))
        # print(predictions)
        
    else:
        print("Hello, World!")

if __name__ == "__main__":
    main()
