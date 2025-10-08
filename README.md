# 🏥 Smart Disease Diagnosis System
# Plant-Expert-System-Fuzzy-Logic-and-forward-backward-chain-
An AI-powered disease prediction system using Machine Learning to predict **Diabetes**, **Heart Disease**, and **Liver Disease** based on patient medical data.

## 📋 Features

- **Three Disease Prediction Models:**
  - Diabetes Prediction (Pima Indians Dataset)
  - Heart Disease Prediction (UCI Heart Disease Dataset)
  - Liver Disease Prediction (Indian Liver Patient Records)

- **Machine Learning:**
  - Random Forest Classifier for all models
  - Feature scaling with StandardScaler
  - Model persistence with joblib

- **Interactive GUI:**
  - Built with Streamlit
  - User-friendly interface
  - Real-time predictions
  - Confidence scores
  - Input validation

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. Train the Models

Run the training script to create and save all three ML models:

\`\`\`bash
python scripts/train_models.py
\`\`\`

This will:
- Download datasets from provided URLs
- Train three Random Forest models
- Save models as `.pkl` files in the `models/` directory
- Display accuracy metrics for each model

Expected output:
\`\`\`
Training Diabetes Prediction Model
Model Accuracy: 0.75-0.80

Training Heart Disease Prediction Model
Model Accuracy: 0.80-0.85

Training Liver Disease Prediction Model
Model Accuracy: 0.70-0.75
\`\`\`

### 3. Run the Application

Launch the Streamlit GUI:

\`\`\`bash
streamlit run app.py
\`\`\`

The app will open in your browser at `http://localhost:8501`

## 📊 How to Use

1. **Select Disease Type** from the sidebar
2. **Enter Patient Information** in the input fields
3. **Click "Predict"** to get the diagnosis
4. **View Results** with confidence scores

### Input Parameters

#### Diabetes Prediction
- Pregnancies, Glucose, Blood Pressure, Skin Thickness
- Insulin, BMI, Diabetes Pedigree Function, Age

#### Heart Disease Prediction
- Age, Sex, Chest Pain Type, Resting Blood Pressure
- Cholesterol, Fasting Blood Sugar, Resting ECG
- Max Heart Rate, Exercise Induced Angina, ST Depression
- Slope, Number of Major Vessels, Thalassemia

#### Liver Disease Prediction
- Age, Gender, Total Bilirubin, Direct Bilirubin
- Alkaline Phosphotase, Alamine Aminotransferase
- Aspartate Aminotransferase, Total Proteins
- Albumin, Albumin and Globulin Ratio

## 📁 Project Structure

\`\`\`
SmartDiseaseDiagnosis/
│
├── models/                      # Saved ML models (generated after training)
│   ├── diabetes_model.pkl
│   ├── diabetes_scaler.pkl
│   ├── heart_model.pkl
│   ├── heart_scaler.pkl
│   ├── liver_model.pkl
│   └── liver_scaler.pkl
│
├── scripts/
│   └── train_models.py         # Model training script
│
├── app.py                      # Main Streamlit application
├── requirements.txt            # Python dependencies
└── README.md                   # This file
\`\`\`

## 🔬 Model Details

### Algorithms Used
- **Random Forest Classifier** with 100 estimators
- **StandardScaler** for feature normalization
- **80-20 Train-Test Split** with stratification

### Datasets
- **Diabetes:** Pima Indians Diabetes Database
- **Heart Disease:** UCI Heart Disease Dataset
- **Liver Disease:** Indian Liver Patient Records

### Performance Metrics
Each model displays:
- Accuracy Score
- Classification Report (Precision, Recall, F1-Score)
- Confusion Matrix

## ⚠️ Important Notes

- **Medical Disclaimer:** This system is for educational purposes only. Always consult qualified healthcare professionals for medical diagnosis and treatment.
- **Data Privacy:** Do not use real patient data without proper authorization and compliance with healthcare regulations (HIPAA, GDPR, etc.)
- **Model Limitations:** Predictions are based on historical data and may not account for all medical factors

## 🛠️ Technologies Used

- **Python 3.8+**
- **Streamlit** - Web application framework
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization

## 📈 Future Enhancements

- Add more disease prediction models
- Implement deep learning models
- Add data visualization and analytics
- Export prediction reports as PDF
- User authentication and history tracking
- Integration with medical databases

## 📝 License

This project is for educational purposes only.

## 👨‍💻 Support

For issues or questions, please consult the documentation or seek help from qualified healthcare and ML professionals.
