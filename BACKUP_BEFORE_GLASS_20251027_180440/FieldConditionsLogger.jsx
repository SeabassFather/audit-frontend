// ====================================
// REAL-TIME FIELD CONDITIONS LOGGER
// Soil/Water/Air Temp, Humidity, Wind, Pressure
// Author: SeabassFather (SG)
// Date: 2025-10-27 22:41:19 UTC
// ====================================

import React, { useState, useEffect } from 'react';

export default function FieldConditionsLogger({ 
  sampleType = 'soil', // 'soil', 'water', 'air'
  onConditionsSubmit 
}) {
  const [conditions, setConditions] = useState({
    // TIMESTAMP
    measurementDate: new Date().toISOString().split('T')[0],
    measurementTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
    timestamp: new Date().toISOString(),
    
    // SOIL CONDITIONS (if soil sample)
    soilTempSurface: '',
    soilTemp2inch: '',
    soilTemp4inch: '',
    soilTemp6inch: '',
    soilTemp8inch: '',
    soilMoisture: '', // %
    soilColor: '',
    soilTexture: '',
    
    // WATER CONDITIONS (if water sample)
    waterTemp: '',
    waterTempDepth: '',
    waterFlow: '', // GPM or CFS
    waterClarity: '',
    waterOdor: '',
    algaePresence: '',
    
    // AIR/AMBIENT CONDITIONS
    airTemp: '',
    airTempHeight: '5', // feet above ground (standard)
    humidity: '',
    dewPoint: '',
    heatIndex: '',
    windChill: '',
    
    // WIND
    windSpeed: '',
    windGust: '',
    windDirection: '',
    windDirectionDegrees: '',
    
    // BAROMETRIC
    pressure: '',
    pressureTrend: '', // rising, falling, steady
    
    // PRECIPITATION
    recentRainfall: '', // inches in last 24hrs
    daysSinceRain: '',
    soilSaturation: '', // dry, moist, saturated
    
    // SOLAR/LIGHT
    cloudCover: '', // %
    solarIntensity: '', // W/m²
    shadedArea: false,
    
    // MEASUREMENT METHOD
    instrumentUsed: '',
    calibrationDate: '',
    
    // FIELD OBSERVATIONS
    cropStage: '',
    visibleStress: '',
    diseasePresent: '',
    pestPresence: '',
    fieldNotes: ''
  });

  const [autoWeather, setAutoWeather] = useState(null);
  const [measuring, setMeasuring] = useState(false);

  // AUTO-CALCULATE DEW POINT
  const calculateDewPoint = (temp, humidity) => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint.toFixed(1);
  };

  // AUTO-CALCULATE HEAT INDEX
  const calculateHeatIndex = (temp, humidity) => {
    if (temp < 80) return temp;
    const c1 = -42.379;
    const c2 = 2.04901523;
    const c3 = 10.14333127;
    const c4 = -0.22475541;
    const c5 = -0.00683783;
    const c6 = -0.05481717;
    const c7 = 0.00122874;
    const c8 = 0.00085282;
    const c9 = -0.00000199;
    
    const T = temp;
    const RH = humidity;
    
    const HI = c1 + (c2 * T) + (c3 * RH) + (c4 * T * RH) + 
               (c5 * T * T) + (c6 * RH * RH) + (c7 * T * T * RH) + 
               (c8 * T * RH * RH) + (c9 * T * T * RH * RH);
    
    return HI.toFixed(1);
  };

  // FETCH CURRENT WEATHER (for comparison)
  const fetchCurrentWeather = async (lat, lon) => {
    setMeasuring(true);
    try {
      // In production, integrate with weather API
      // This provides REFERENCE data to compare against field measurements
      
      // SIMULATED API RESPONSE
      const weatherData = {
        airTemp: 72,
        humidity: 58,
        windSpeed: 8,
        windDirection: 'NW',
        pressure: 30.12,
        cloudCover: 25
      };
      
      setAutoWeather(weatherData);
      
      // Auto-fill some values
      setConditions(prev => ({
        ...prev,
        airTemp: weatherData.airTemp.toString(),
        humidity: weatherData.humidity.toString(),
        windSpeed: weatherData.windSpeed.toString(),
        windDirection: weatherData.windDirection,
        pressure: weatherData.pressure.toString(),
        cloudCover: weatherData.cloudCover.toString(),
        dewPoint: calculateDewPoint(weatherData.airTemp, weatherData.humidity),
        heatIndex: calculateHeatIndex(weatherData.airTemp, weatherData.humidity)
      }));
      
      setMeasuring(false);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setMeasuring(false);
    }
  };

  // VALIDATE AND SUBMIT
  const handleSubmit = () => {
    // Validation based on sample type
    if (sampleType === 'soil' && !conditions.soilTempSurface) {
      alert('⚠️ Soil surface temperature required for soil samples!');
      return;
    }
    if (sampleType === 'water' && !conditions.waterTemp) {
      alert('⚠️ Water temperature required for water samples!');
      return;
    }
    if (!conditions.airTemp || !conditions.humidity) {
      alert('⚠️ Air temperature and humidity required!');
      return;
    }

    // Calculate derived values
    const completeConditions = {
      ...conditions,
      dewPoint: conditions.dewPoint || calculateDewPoint(
        parseFloat(conditions.airTemp), 
        parseFloat(conditions.humidity)
      ),
      heatIndex: conditions.heatIndex || calculateHeatIndex(
        parseFloat(conditions.airTemp), 
        parseFloat(conditions.humidity)
      )
    };

    onConditionsSubmit(completeConditions);
  };

  return (
    <div style={{
      background: '#1e293b',
      padding: '30px',
      borderRadius: '16px',
      marginBottom: '30px',
      border: '2px solid #10b981'
    }}>
      <div style={{marginBottom: '25px'}}>
        <h2 style={{color: '#10b981', fontSize: '1.5rem', marginBottom: '10px'}}>
          🌡️ Field Conditions at Time of Sample
        </h2>
        <p style={{color: '#94a3b8', fontSize: '0.95rem'}}>
          Record environmental conditions at the exact time/location of sample collection for accurate analysis context
        </p>
      </div>

      {/* TIMESTAMP */}
      <div style={{
        background: '#0f172a',
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '2px solid #334155',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>Sample Collection Time: </span>
          <span style={{color: '#10b981', fontSize: '1.2rem', fontWeight: '700'}}>
            {conditions.measurementDate} {conditions.measurementTime}
          </span>
        </div>
        <button
          onClick={() => setConditions({
            ...conditions,
            measurementDate: new Date().toISOString().split('T')[0],
            measurementTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
            timestamp: new Date().toISOString()
          })}
          style={{
            padding: '8px 16px',
            background: '#10b981',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          🕒 Update to Now
        </button>
      </div>

      {/* SOIL CONDITIONS (if soil sample) */}
      {sampleType === 'soil' && (
        <div style={{
          background: '#0f172a',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '2px solid #a16207'
        }}>
          <h3 style={{color: '#fbbf24', fontSize: '1.2rem', marginBottom: '15px'}}>
            🌱 Soil Temperature Profile
          </h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Surface (°F) *
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.soilTempSurface}
                onChange={e => setConditions({...conditions, soilTempSurface: e.target.value})}
                placeholder="75.5"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                2" Depth (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.soilTemp2inch}
                onChange={e => setConditions({...conditions, soilTemp2inch: e.target.value})}
                placeholder="72.0"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                4" Depth (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.soilTemp4inch}
                onChange={e => setConditions({...conditions, soilTemp4inch: e.target.value})}
                placeholder="68.5"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                6" Depth (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.soilTemp6inch}
                onChange={e => setConditions({...conditions, soilTemp6inch: e.target.value})}
                placeholder="66.0"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                8" Depth (°F)
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.soilTemp8inch}
                onChange={e => setConditions({...conditions, soilTemp8inch: e.target.value})}
                placeholder="64.5"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Soil Moisture (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.soilMoisture}
                onChange={e => setConditions({...conditions, soilMoisture: e.target.value})}
                placeholder="25.5"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Soil Saturation
              </label>
              <select
                value={conditions.soilSaturation}
                onChange={e => setConditions({...conditions, soilSaturation: e.target.value})}
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              >
                <option value="">Select...</option>
                <option value="dry">Dry</option>
                <option value="moist">Moist</option>
                <option value="wet">Wet</option>
                <option value="saturated">Saturated</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Soil Color
              </label>
              <input
                type="text"
                value={conditions.soilColor}
                onChange={e => setConditions({...conditions, soilColor: e.target.value})}
                placeholder="Dark brown"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
          </div>
        </div>
      )}

      {/* WATER CONDITIONS (if water sample) */}
      {sampleType === 'water' && (
        <div style={{
          background: '#0f172a',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '2px solid #0891b2'
        }}>
          <h3 style={{color: '#06b6d4', fontSize: '1.2rem', marginBottom: '15px'}}>
            💧 Water Sample Conditions
          </h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Water Temp (°F) *
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.waterTemp}
                onChange={e => setConditions({...conditions, waterTemp: e.target.value})}
                placeholder="68.5"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Sample Depth (ft)
              </label>
              <input
                type="number"
                step="0.1"
                value={conditions.waterTempDepth}
                onChange={e => setConditions({...conditions, waterTempDepth: e.target.value})}
                placeholder="2.5"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Water Flow Rate
              </label>
              <input
                type="text"
                value={conditions.waterFlow}
                onChange={e => setConditions({...conditions, waterFlow: e.target.value})}
                placeholder="50 GPM"
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
                Water Clarity
              </label>
              <select
                value={conditions.waterClarity}
                onChange={e => setConditions({...conditions, waterClarity: e.target.value})}
                style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              >
                <option value="">Select...</option>
                <option value="clear">Clear</option>
                <option value="slightly-turbid">Slightly Turbid</option>
                <option value="turbid">Turbid</option>
                <option value="cloudy">Cloudy/Sediment</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* AIR TEMPERATURE & HUMIDITY */}
      <div style={{
        background: '#0f172a',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '2px solid #10b981'
      }}>
        <h3 style={{color: '#10b981', fontSize: '1.2rem', marginBottom: '15px'}}>
          🌡️ Air Temperature & Humidity
        </h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Air Temp (°F) *
            </label>
            <input
              type="number"
              step="0.1"
              value={conditions.airTemp}
              onChange={e => {
                const temp = e.target.value;
                setConditions({
                  ...conditions, 
                  airTemp: temp,
                  dewPoint: conditions.humidity ? calculateDewPoint(parseFloat(temp), parseFloat(conditions.humidity)) : '',
                  heatIndex: conditions.humidity ? calculateHeatIndex(parseFloat(temp), parseFloat(conditions.humidity)) : ''
                });
              }}
              placeholder="72.5"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Humidity (%) *
            </label>
            <input
              type="number"
              step="1"
              value={conditions.humidity}
              onChange={e => {
                const hum = e.target.value;
                setConditions({
                  ...conditions, 
                  humidity: hum,
                  dewPoint: conditions.airTemp ? calculateDewPoint(parseFloat(conditions.airTemp), parseFloat(hum)) : '',
                  heatIndex: conditions.airTemp ? calculateHeatIndex(parseFloat(conditions.airTemp), parseFloat(hum)) : ''
                });
              }}
              placeholder="58"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Dew Point (°F)
            </label>
            <input
              type="text"
              value={conditions.dewPoint}
              readOnly
              placeholder="Auto"
              style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: '#64748b'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Heat Index (°F)
            </label>
            <input
              type="text"
              value={conditions.heatIndex}
              readOnly
              placeholder="Auto"
              style={{width: '100%', padding: '10px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: '#64748b'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Measurement Height
            </label>
            <input
              type="number"
              value={conditions.airTempHeight}
              onChange={e => setConditions({...conditions, airTempHeight: e.target.value})}
              placeholder="5"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
            <span style={{color: '#64748b', fontSize: '0.75rem'}}>feet above ground</span>
          </div>
        </div>
      </div>

      {/* WIND CONDITIONS */}
      <div style={{
        background: '#0f172a',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '2px solid #3b82f6'
      }}>
        <h3 style={{color: '#3b82f6', fontSize: '1.2rem', marginBottom: '15px'}}>
          💨 Wind Conditions
        </h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Wind Speed (mph)
            </label>
            <input
              type="number"
              step="0.1"
              value={conditions.windSpeed}
              onChange={e => setConditions({...conditions, windSpeed: e.target.value})}
              placeholder="8.5"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Wind Gust (mph)
            </label>
            <input
              type="number"
              step="0.1"
              value={conditions.windGust}
              onChange={e => setConditions({...conditions, windGust: e.target.value})}
              placeholder="15.2"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
              />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Wind Direction
            </label>
            <select
              value={conditions.windDirection}
              onChange={e => setConditions({...conditions, windDirection: e.target.value})}
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            >
              <option value="">Select...</option>
              <option value="N">N (North)</option>
              <option value="NE">NE (Northeast)</option>
              <option value="E">E (East)</option>
              <option value="SE">SE (Southeast)</option>
              <option value="S">S (South)</option>
              <option value="SW">SW (Southwest)</option>
              <option value="W">W (West)</option>
              <option value="NW">NW (Northwest)</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Degrees (0-360°)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              max="360"
              value={conditions.windDirectionDegrees}
              onChange={e => setConditions({...conditions, windDirectionDegrees: e.target.value})}
              placeholder="315"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
        </div>
      </div>

      {/* BAROMETRIC PRESSURE */}
      <div style={{
        background: '#0f172a',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '2px solid #8b5cf6'
      }}>
        <h3 style={{color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '15px'}}>
          📊 Barometric Pressure & Precipitation
        </h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Pressure (inHg)
            </label>
            <input
              type="number"
              step="0.01"
              value={conditions.pressure}
              onChange={e => setConditions({...conditions, pressure: e.target.value})}
              placeholder="30.12"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Pressure Trend
            </label>
            <select
              value={conditions.pressureTrend}
              onChange={e => setConditions({...conditions, pressureTrend: e.target.value})}
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            >
              <option value="">Select...</option>
              <option value="rising">Rising ↗</option>
              <option value="steady">Steady →</option>
              <option value="falling">Falling ↘</option>
            </select>
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Rain (Last 24hrs, in)
            </label>
            <input
              type="number"
              step="0.01"
              value={conditions.recentRainfall}
              onChange={e => setConditions({...conditions, recentRainfall: e.target.value})}
              placeholder="0.25"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Days Since Rain
            </label>
            <input
              type="number"
              value={conditions.daysSinceRain}
              onChange={e => setConditions({...conditions, daysSinceRain: e.target.value})}
              placeholder="5"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
        </div>
      </div>

      {/* INSTRUMENT CALIBRATION */}
      <div style={{
        background: '#0f172a',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '2px solid #64748b'
      }}>
        <h3 style={{color: '#94a3b8', fontSize: '1.2rem', marginBottom: '15px'}}>
          🔧 Measurement Equipment
        </h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Instrument Used
            </label>
            <input
              type="text"
              value={conditions.instrumentUsed}
              onChange={e => setConditions({...conditions, instrumentUsed: e.target.value})}
              placeholder="Kestrel 5500 Weather Meter"
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
              Last Calibration Date
            </label>
            <input
              type="date"
              value={conditions.calibrationDate}
              onChange={e => setConditions({...conditions, calibrationDate: e.target.value})}
              style={{width: '100%', padding: '10px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white'}}
            />
          </div>
        </div>
      </div>

      {/* FIELD NOTES */}
      <div style={{
        background: '#0f172a',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '2px solid #334155'
      }}>
        <h3 style={{color: '#94a3b8', fontSize: '1.2rem', marginBottom: '15px'}}>
          📝 Field Observations
        </h3>
        <div>
          <label style={{display: 'block', marginBottom: '5px', color: '#94a3b8', fontSize: '0.85rem'}}>
            Additional Notes
          </label>
          <textarea
            value={conditions.fieldNotes}
            onChange={e => setConditions({...conditions, fieldNotes: e.target.value})}
            placeholder="e.g., Sample taken from shaded area near irrigation line. Visible leaf curl on plants. Strong odor present."
            rows={4}
            style={{width: '100%', padding: '12px', background: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: 'white', fontFamily: 'inherit'}}
          />
        </div>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: '700',
          cursor: 'pointer'
        }}
      >
        ✅ Save Field Conditions & Continue
      </button>

      <p style={{color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginTop: '15px'}}>
        Field conditions provide critical context for accurate sample interpretation
      </p>
    </div>
  );
}