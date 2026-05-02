import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchPollingBooths } from '../services/api';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to dynamically update map view bounds based on markers
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const DEFAULT_POLLING_BOOTHS = [
  { id: 1, boothName: 'Central High School', address: '123 Main St, Springfield', area: 'Downtown', city: 'Springfield', state: 'IL', pincode: '62701', boothNumber: 'A101', latitude: 39.7990, longitude: -89.6450 },
  { id: 2, boothName: 'Springfield Library', address: '456 Elm St, Springfield', area: 'Westside', city: 'Springfield', state: 'IL', pincode: '62702', boothNumber: 'B202', latitude: 39.8105, longitude: -89.6702 },
  { id: 3, boothName: 'Community Center', address: '789 Oak Ave, Shelbyville', area: 'North District', city: 'Shelbyville', state: 'IL', pincode: '62565', boothNumber: 'C303', latitude: 39.4062, longitude: -88.8080 },
  { id: 4, boothName: 'Lincoln Elementary', address: '321 Pine Rd, Capital City', area: 'South District', city: 'Capital City', state: 'IL', pincode: '62704', boothNumber: 'D404', latitude: 39.7654, longitude: -89.6644 },
  { id: 5, boothName: 'Chicago Town Hall', address: '888 City Ave, Chicago', area: 'Loop', city: 'Chicago', state: 'IL', pincode: '60601', boothNumber: 'CH101', latitude: 41.8818, longitude: -87.6231 },
  { id: 6, boothName: 'Peoria Civic Center', address: '201 SW Jefferson Ave', area: 'Downtown', city: 'Peoria', state: 'IL', pincode: '61602', boothNumber: 'P200', latitude: 40.6936, longitude: -89.5890 }
];

const MapPage = () => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search state
  const [searchCity, setSearchCity] = useState('');
  const [searchPincode, setSearchPincode] = useState('');
  const [mapCenter, setMapCenter] = useState([39.7817, -89.6501]); // Default to Springfield
  const [mapZoom, setMapZoom] = useState(12);

  const loadBooths = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPollingBooths(params);
      const validBooths = data.filter(b => b.latitude && b.longitude);
      setBooths(validBooths);
      
      if (validBooths.length > 0) {
        // Center on the first valid booth found
        setMapCenter([validBooths[0].latitude, validBooths[0].longitude]);
        setMapZoom(12);
      } else {
        setError("No polling booths found for that search. Try another city or pincode.");
      }
    } catch (err) {
      console.error("Error fetching booths:", err);
      // Fallback local filtering when server fails
      const fallbackData = DEFAULT_POLLING_BOOTHS.filter(booth => {
        const matchCity = params.city ? booth.city.toLowerCase().includes(params.city.toLowerCase()) : true;
        const matchPincode = params.pincode ? booth.pincode === params.pincode : true;
        return matchCity && matchPincode;
      });

      const validBooths = fallbackData.filter(b => b.latitude && b.longitude);
      setBooths(validBooths);

      if (validBooths.length > 0) {
        setMapCenter([validBooths[0].latitude, validBooths[0].longitude]);
        setMapZoom(12);
      } else {
        setError("No polling booths found for that search. Try another city or pincode.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load of all booths
    loadBooths();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchCity.trim()) params.city = searchCity.trim();
    if (searchPincode.trim()) params.pincode = searchPincode.trim();
    loadBooths(params);
  };

  return (
    <div className="container section">
      <div className="section-header">
        <h2>Interactive Polling Booth Map</h2>
        <p className="subtitle">Find and explore voting locations near you.</p>
      </div>

      <div className="map-layout">
        <div className="map-sidebar">
          <div className="search-card">
            <h3>Find Your Booth</h3>
            <form onSubmit={handleSearch} className="booth-search-form">
              <div className="form-group">
                <label htmlFor="map-city">City</label>
                <input
                  type="text"
                  id="map-city"
                  placeholder="e.g. Springfield"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="map-pincode">Pincode / ZIP Code</label>
                <input
                  type="text"
                  id="map-pincode"
                  placeholder="e.g. 62701"
                  value={searchPincode}
                  onChange={(e) => setSearchPincode(e.target.value)}
                />
              </div>
              
              <button type="submit" className="btn btn-primary search-btn" disabled={loading}>
                {loading ? 'Searching...' : 'Find Nearby Booths'}
              </button>
            </form>
            
            {error && (
              <div className="error-message mt-4">
                {error}
              </div>
            )}
            
            <div className="map-sidebar-info">
              <h4>About Polling Locations</h4>
              <p>Polling booths are generally open from 7 AM to 8 PM on Election Day. Click on any marker on the map to see details about that specific location.</p>
            </div>
          </div>
        </div>

        <div className="map-container-wrapper">
          {loading && booths.length === 0 ? (
            <div className="loading-state map-loading">
              <div className="spinner"></div>
              <p style={{ color: 'var(--text-light)' }}>Loading map data...</p>
            </div>
          ) : (
            <div className="leaflet-map-wrapper">
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-lg)' }}
              >
                <ChangeView center={mapCenter} zoom={mapZoom} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {booths.map(booth => (
                  <Marker 
                    key={booth.id} 
                    position={[booth.latitude, booth.longitude]}
                  >
                    <Popup>
                      <div className="map-popup">
                        <strong>{booth.boothName}</strong><br/>
                        <em>{booth.address}</em><br/>
                        Area: {booth.area}, {booth.city}<br/>
                        Booth Number: <span className="booth-number-badge">{booth.boothNumber}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
