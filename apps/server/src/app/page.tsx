'use client';

import { useState, useEffect } from 'react';

interface Equipment {
  id: string;
  title: string;
  description: string;
  category: string;
  dailyPriceILS: number;
  city: string;
  images: string[];
  owner: {
    name: string;
    verified: boolean;
  };
}

export default function HomePage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setEquipment(data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchCity) params.append('city', searchCity);
      if (searchCategory) params.append('category', searchCategory);
      
      const response = await fetch(`/api/items?${params.toString()}`);
      const data = await response.json();
      setEquipment(data);
    } catch (error) {
      console.error('Error searching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>🇮🇱 Lendly Israel - השכרת ציוד מקצועי</h1>
      
      {/* Search Section */}
      <div className="search-section">
        <h2>חיפוש ציוד להשכרה</h2>
        <div className="search-form">
          <input
            type="text"
            placeholder="עיר / מיקום"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="search-input"
          />
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="search-select"
          >
            <option value="">כל הקטגוריות</option>
            <option value="DRONE">מל"טים</option>
            <option value="CAMERA">ציוד צילום</option>
            <option value="POWER_TOOL">כלי עבודה</option>
            <option value="EVENTS">ציוד אירועים</option>
            <option value="OTHER">אחר</option>
          </select>
          <button onClick={handleSearch} className="search-button">
            חיפוש
          </button>
        </div>
      </div>

      {/* Equipment Listings */}
      <div className="equipment-section">
        <h2>ציוד זמין להשכרה</h2>
        
        {loading ? (
          <div className="loading">טוען...</div>
        ) : equipment.length === 0 ? (
          <div className="no-results">לא נמצא ציוד</div>
        ) : (
          <div className="equipment-grid">
            {equipment.map((item) => (
              <div key={item.id} className="equipment-card">
                <div className="equipment-image">
                  {item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} />
                  ) : (
                    <div className="no-image">אין תמונה</div>
                  )}
                </div>
                <div className="equipment-info">
                  <h3 className="equipment-title">{item.title}</h3>
                  <p className="equipment-description">{item.description}</p>
                  <div className="equipment-details">
                    <div className="equipment-price">₪{item.dailyPriceILS}/יום</div>
                    <div className="equipment-location">📍 {item.city}</div>
                    <div className="equipment-owner">
                      👤 {item.owner.name} {item.owner.verified ? '✅' : ''}
                    </div>
                  </div>
                  <button className="book-button">
                    הזמן עכשיו
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>למה לבחור ב-Lendly?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>אבטחה מלאה</h3>
            <p>אימות זהות לשוכרים ולמפרסמים</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>ערבון בטוח</h3>
            <p>ערבון בהקפאת כרטיס או מזומן באיסוף</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>ביטוח נזקים</h3>
            <p>כיסוי נזקים תאונתיים עד תקרה בסיסית</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>תשלום מהיר</h3>
            <p>תשלום ידני פשוט ומהיר</p>
          </div>
        </div>
      </div>
    </>
  );
}
