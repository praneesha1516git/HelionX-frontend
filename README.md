#Backend github link - https://github.com/praneesha1516git/HelionX-backend

#data-api github link - https://github.com/praneesha1516git/HelionX-data-api

#Identified Anomalies and their detection method , severity classificatin and User Impact

1. Sudden Energy Spike

Anomaly Type: Point Anomaly

Detection Method:
Sudden energy spikes are detected using statistical thresholding with the Interquartile Range (IQR).
The IQR is calculated only using daylight data between 06:00 and 18:00 to avoid distortion from night-time zero values.
If the energy generated in any 2-hour interval exceeds Q3 + 1.5 × IQR, it is flagged as a spike.

Severity Level: Warning

User Impact & Action:
This anomaly usually indicates a sensor malfunction or corrupted data.
The user should verify sensor calibration and inspect the data collection pipeline to prevent inaccurate reporting.

2. Sudden Energy Drop

Anomaly Type: Point Anomaly

Detection Method:
If energy generation is zero during daylight hours (06:00–18:00), the system flags a sudden drop anomaly.
This rule-based approach ensures that expected solar production is not incorrectly recorded as zero.

Severity Level: Critical

User Impact & Action:
This may indicate inverter failure, panel disconnection, or severe shading.
Immediate inspection and corrective action are required to restore energy production.

3. Night-Time Energy Generation

Anomaly Type: Contextual Anomaly

Detection Method:
If energy generation is recorded after 18:00 or before 06:00, the system flags it as a contextual anomaly, since solar panels should not produce power at night.

Severity Level: Info

User Impact & Action:
This suggests incorrect timestamps or faulty sensors.
The user should verify time synchronization and sensor configuration.

4. Flat-Line Pattern

Anomaly Type: Collective Anomaly

Detection Method:
A variance analysis is performed across all 2-hour intervals of a day.
If the variance is near zero, it indicates that energy values are unnaturally constant, triggering a flat-line anomaly.

Severity Level: Critical

User Impact & Action:
This typically indicates a frozen sensor or backend aggregation failure.
The user should restart the sensor and verify the data ingestion service.


5. Gradual Performance Degradation

Anomaly Type: Collective Anomaly

Detection Method:
A trend analysis is performed using rolling averages and linear regression slope detection over a fixed time window (e.g., 7 days).
A consistently negative slope indicates gradual degradation.

Severity Level: Warning

User Impact & Action:
This indicates long-term efficiency loss caused by aging panels or dirt buildup.
Preventive maintenance or cleaning should be scheduled.

6. Missing Interval Records

Anomaly Type: Data Quality Anomaly

Detection Method:
Each day is expected to have 12 records (2-hour intervals).
If the actual record count is less than 12, a missing interval anomaly is triggered.

Severity Level: Warning

User Impact & Action:
Missing data leads to incomplete analysis and inaccurate reports.
The user should check network connectivity and data ingestion reliability.

