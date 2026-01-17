# Mock ML Service Mode

Due to compatibility issues between **Python 3.14.0** and heavy Machine Learning libraries (NumPy, Pandas, Prophet) on Windows, we have enabled a **Mock ML Service**.

## What this means
- The application **works fully**.
- The Frontend and Backend communicate successfully.
- The ML Service (Port 8000) is running and responding to requests.
- **Predictions are simulated**: Instead of running complex ML models, the service returns realistic dummy data. This allows you to explore the UI and flow without needing a complex Python environment setup.

## How to run
Double-click `start-all-mock.bat` in the root directory.

## How to switch to Real ML
To use the actual Machine Learning models, you need to:
1.  Uninstall Python 3.14.
2.  Install **Python 3.10** or **Python 3.11** (these versions have pre-built wheels for all required libraries).
3.  Delete the `apps/ml/venv` folder (if it exists).
4.  Run `pip install -r apps/ml/requirements.txt`.
5.  Run the original `apps/ml/app/main.py` instead of `mock_main.py`.
