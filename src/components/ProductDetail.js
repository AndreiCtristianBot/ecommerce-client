// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const { data } = await axios.get(`${apiUrl}/api/products/${id}`);
        // Dacă nu există specificații, setăm valori implicite
        if (!data.specifications) {
          if (data.name === 'Apple iPhone 14') {
            data.specifications = `Display: 6.1-inch OLED
Processor: A15 Bionic
Storage: 128GB / 256GB / 512GB
Camera: Dual 12MP system
Battery: Up to 19 hours video playback
OS: iOS 16`;
          } else if (data.name === 'Samsung Galaxy S22') {
            data.specifications = `Display: 6.1-inch Dynamic AMOLED 2X, 120Hz
Processor: Exynos 2200 / Snapdragon 8 Gen 1
Storage: 128GB / 256GB
Camera: Triple camera system (50MP main, 12MP ultra-wide, 10MP telephoto)
Battery: 3700 mAh
OS: Android 12, One UI 4`;
          } else if (data.name === 'Dell XPS 13') {
            data.specifications = `Display: 13.4-inch FHD+ InfinityEdge
Processor: Intel Core i7 (11th Gen)
RAM: 16GB LPDDR4x
Storage: 512GB SSD
OS: Windows 10/11
Battery: Up to 12 hours`;
          } else if (data.name === 'Sony WH-1000XM4') {
            data.specifications = `Type: Wireless Noise Cancelling Headphones
Battery Life: Up to 30 hours
Connectivity: Bluetooth 5.0, NFC
Features: Adaptive Sound Control, Touch Sensor Controls
Voice Assistant: Compatible with Google Assistant & Alexa`;
          } else if (data.name === 'iPhone 16 Pro Max') {
            data.specifications = `Caracteristici generale
Retea:	5G
An lansare:	2024
Model:	IPHONE 16 PRO MAX
Incarcator inclus:	Nu
Sloturi Sim:	Dual SIM
Putere incarcator necesar:	20-45W USB PD
SIM:	Nano SIM + eSIM
Sistem de operare:	iOS
Interfata utilizator:	iOS
Ecran:
Tip ecran:	Super Retina XDR
Dimensiune ecran:	6.9 inch
Rezolutie ecran (pixeli):	2868 x 1320
Alte specificatii ecran:	OLED, 460ppi, Dynamic Island, Always-On display, ProMotion technology, HDR, True Tone, Wide color (P3), Haptic Touch, Contrast ratio 2,000,000:1, Luminozitate: 1000 - 2000 nits
Memorie:
Capacitate stocare:	1 TB
Memorie RAM:	N/A
Procesor:
Tip procesor:	Hexa Core
Procesor:	A18 Pro
Procesor grafic:	6‑core GPU
Foto video
Camera principala:	Tripla
Rezolutie (Mp):	48MP 24 mm, ƒ/1.78 aperture, second‑generation sensor‑shift optical image stabilization, 100% Focus Pixels + 48MP Ultra Wide: 13 mm, ƒ/2.2 aperture and 120° field of view, Hybrid Focus Pixels + 12MP Telephoto: 120 mm, ƒ/2.8 aperture and 20° field of view
Rezolutie video:	4K
Zoom:	Zoom in optic 5x, Zoom out optic 2x, Optical Zoom Range 10x, Zoom digital pana la 25x
Selfie Camera:	12MP ƒ/1.9 aperture, Autofocus with Focus Pixels, Retina Flash, Photonic Engine, Deep Fusion, Smart HDR 5, Night mode, Photographic Styles, Lens correction, Auto image stabilization, Burst mode, Inregistrare video 4K/1080P
Camere Main/Selfie: (MP)	48+48+12/12
Facilitati:	Photonic Engine, Deep Fusion, Smart HDR 5, Iluminare Portret, Mod Noapte, Panorama, Fotografie macro, Apple ProRAW, Stabilizare automata a imaginii
Date:
WLAN:	Wi‑Fi 7 (802.11be) with 2x2 MIMO
Bluetooth:	5.3
GPS:	GPS, GLONASS, Galileo, QZSS, BeiDou, and NavIC
USB:	USB-C
NFC:	Da
`
          } else if (data.name === 'Macbook Air 15 M3') {
            data.specifications = `
            Ecran:
            Tip ecran:	LED
            Rezolutie:	2880 x 1864
            Dimensiune ecran:	15.3 inch
            Ecran Touch:	Nu
            Finisaj ecran:	Lucios
            Format ecran:	2.8K
            Alte caracteristici display:	IPS; 224 ppi; 500 nits; Wide color (P3); True Tone technology
            Procesor:
            Tip procesor:	Apple M3
            Producator procesor:	Apple
            Model procesor:	M3
            Numar nuclee:	8
            Procesor grafic integrat:	10-core GPU
            `
          } else if (data.name === 'Televizor OLED Smart SAMSUNG 77S95D, Ultra HD 4K, 195cm') {
            data.specifications = `Tip TV Smart TV
Procesor:	NQ4 AI Gen2 Processor
Ecran:	Plat
Tip Display:	OLED
Diagonala:	195 cm
Dimensiune ecran (inch):	77
Rezolutie ecran (pixeli):	3840 x 2160
Rezolutie:	4K
Aspect imagine:	16:9
Rata refresh (Hz):	100 (Up to 144)
Unghi de vizualizare (grade):	178 / 178
Alte caracteristici video:	Procesor NQ4 AI Gen2, OLED Glare Free, Oled HDR PRO, Motion Xcelerator 144Hz, Expert Calibration, 4K AI Upscale, Real Depth Enhancer, EyeComfort Mode, Ultra Viewing Angle,Filmmaker Mode
`
          } else {
            data.specifications = 'Specificații disponibile curând.';
          }
        }
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAdd = () => {
    onAddToCart(product);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} className="inapoi">Înapoi</button>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <img
          src={product.image_url || ''}
          alt={product.name || 'Produs fără nume'}
          style={{ width: '400px', objectFit: 'cover' }}
        />
        <div>
          <h2>{product.name || 'Fără nume'}</h2>
          <p>{product.description || 'Fără descriere'}</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {product.specifications}
          </pre>
          <p>Preț: ${Number(product.price).toFixed(2)}</p>
          <button onClick={handleAdd} className="important" >
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

