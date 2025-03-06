// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const countries = ["Romania", "SUA", "Canada", "Germania", "Elveția"];

const locationMapping = {
  Romania: {
    label: "Județ/*Municipiul București",
    data: {
      'Alba': ['Alba Iulia', 'Aiud', 'Cugir', 'Ocna Mureș'],
      'Arad': ['Arad', 'Lipola', 'Nădlac', 'Ineu'],
      'Argeș': ['Pitești', 'Câmpulung', 'Curtea de Argeș', 'Mioveni'],
      'Bacău': ['Bacău', 'Onești', 'Dărmănești', 'Comănești'],
      'Bihor': ['Oradea', 'Beiuș', 'Salonta', 'Marghita'],
      'Bistrita-Nasaud': ['Beclean', 'Bistrita', 'Cosbuc', 'Dumitra', 'Feldru', 'Năsăud', 'Parva', 'Rebrisoara', 'Rodna', 'Salva', 'Maieru', 'Telciu'],
      'Brașov': ['Brașov', 'Râșnov', 'Făgăraș', 'Săcele'],
      'Cluj': ['Cluj-Napoca', 'Turda', 'Dezmir', 'Câmpia Turzii'],
      'Constanța': ['Constanța', 'Eforie Nord', 'Eforie Sud', 'Mangalia', 'Olimp', 'Medgidia', 'Techirghiol'],
      'Giurgiu': ['Giurgiu', 'Bolintin-Vale', 'Călugăreni'],
      'Iași': ['Iași', 'Pașcani', 'Hârlău', 'Târgu Frumos'],
      'Ilfov': ['Buftea', 'Bragadiru', 'Chitila', 'Otopeni', 'Snagov'],
      'Maramureș': ['Baia Mare', 'Sighetu Marmației', 'Târgu Lăpuș', 'Tăuții-Măgherăuș'],
      'Sibiu': ['Sibiu', 'Mediaș', 'Avrig', 'Cisnădie'],
      'Timis': ['Timișoara', 'Lugoj', 'Făget'],
      '*Municipiul București': ['Sectorul 1', 'Sectorul 2', 'Sectorul 3', 'Sectorul 4', 'Sectorul 5', 'Sectorul 6'],
    },
  },
  SUA: {
    label: "Stat sau *Districtul Columbia(D.C.)",
    data: {
      "Alabama": ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
      "Alaska": ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"],
      "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler", "Glendale"],
      "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
      "California": ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno"],
      "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
      "Connecticut": ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"],
      "Delaware": ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"],
      "Florida": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg"],
      "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
      "Hawaii": ["Honolulu", "Hilo", "Kailua", "Kapaa", "Kaneohe"],
      "Idaho": ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello"],
      "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville"],
      "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
      "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Waterloo"],
      "Kansas": ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"],
      "Kentucky": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
      "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
      "Maine": ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
      "Maryland": ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie"],
      "Massachusetts": ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
      "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"],
      "Minnesota": ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
      "Mississippi": ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"],
      "Missouri": ["Kansas City", "Saint Louis", "Springfield", "Independence", "Columbia"],
      "Montana": ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte"],
      "Nebraska": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
      "Nevada": ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"],
      "New Hampshire": ["Manchester", "Nashua", "Concord", "Dover", "Rochester"],
      "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"],
      "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
      "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
      "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
      "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
      "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
      "Oklahoma": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton"],
      "Oregon": ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro"],
      "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
      "Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"],
      "South Carolina": ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill"],
      "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
      "Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
      "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
      "Utah": ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
      "Vermont": ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"],
      "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News"],
      "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
      "West Virginia": ["Charleston", "Huntington", "Parkersburg", "Morgantown", "Wheeling"],
      "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
      "Wyoming": ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
      "*D.C.": ["*Washington D.C."],
    },
  },
  Canada: {
    label: "Provincie sau Teritoriu",
    data: {
      "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat", "Grande Prairie", "Airdrie"],
      "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Kelowna", "Abbotsford"],
      "Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie"],
      "New Brunswick": ["Fredericton", "Moncton", "Saint John", "Miramichi", "Bathurst"],
      "Newfoundland and Labrador": ["St. John's", "Conception Bay South", "Mount Pearl", "Corner Brook", "Grand Falls-Windsor"],
      "Nova Scotia": ["Halifax", "Sydney", "Dartmouth", "Truro", "New Glasgow", "Glace Bay", "Kentville"],
      "Ontario": ["Toronto", "*Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Kitchener"],
      "Prince Edward Island": ["Charlottetown", "Summerside", "Stratford"],
      "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay"],
      "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current", "Yorkton", "North Battleford"],
    },
  },
  Germania: {
    label: "Land",
    data: {
      "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg im Breisgau", "Heidelberg", "Ulm"],
      "Bayern": ["München", "Nürnberg", "Augsburg", "Regensburg", "Würzburg"],
      "Berlin": ["Berlin"],  // Pentru Berlin, se va folosi zona administrativă
      "Brandenburg": ["Potsdam", "Cottbus", "Brandenburg an der Havel"],
      "Bremen": ["Bremen", "Bremerhaven"],
      "Hamburg": ["Hamburg"], // Pentru Hamburg, se va folosi zona administrativă
      "Hessen": ["Frankfurt am Main", "Wiesbaden", "Kassel"],
      "Mecklenburg-Vorpommern": ["Rostock", "Schwerin", "Neubrandenburg"],
      "Niedersachsen": ["Hannover", "Braunschweig", "Oldenburg"],
      "Nordrhein-Westfalen": ["Köln", "Düsseldorf", "Dortmund"],
      "Rheinland-Pfalz": ["Mainz", "Ludwigshafen am Rhein", "Koblenz"],
      "Saarland": ["Saarbrücken", "Neunkirchen"],
      "Sachsen": ["Dresden", "Leipzig", "Chemnitz"],
      "Sachsen-Anhalt": ["Magdeburg", "Halle (Saale)"],
      "Schleswig-Holstein": ["Kiel", "Lübeck", "Flensburg"],
      "Thüringen": ["Erfurt", "Jena", "Gera"],
    },
  },
  "Elveția": {
    label: "Canton",
    data: {
      "Zürich": ["Zürich", "Winterthur", "Uster", "Dübendorf", "Dietikon"],
      "Bern": ["Bern", "Thun", "Biel/Bienne", "Köniz", "Ostermundigen"],
      "Luzern": ["Luzern", "Emmen", "Kriens", "Horw", "Ebikon"],
    },
  },
};

// Mapping pentru zone administrative (adminAreas)
const adminAreas = {
  "New York City": ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
  "Berlin": ["Mitte", "Friedrichshain-Kreuzberg", "Pankow", "Charlottenburg-Wilmersdorf"],
  "Hamburg": ["Altona", "Eimsbüttel", "Hamburg-Mitte", "Wandsbek", "Harburg"],
};

// Extindem phonePrefixOptions cu requiredDigits pentru validare
const phonePrefixOptions = {
  Romania: { prefix: "+40", flag: "🇷🇴", requiredDigits: 9 },
  SUA: { prefix: "+1", flag: "🇺🇸", requiredDigits: 10 },
  Canada: { prefix: "+1", flag: "🇨🇦", requiredDigits: 10 },
  Germania: { prefix: "+49", flag: "🇩🇪", requiredDigits: 10 },
  "Elveția": { prefix: "+41", flag: "🇨🇭", requiredDigits: 9 },
};

// Definim un obiect pentru opțiunile de cod postal
const postalCodeOptions = {
  SUA: { label: "ZIP Code", requiredLength: 5 },
  Germania: { label: "Postleitzahl", requiredLength: 5 },
  "Elveția": { label: "Cod postal", requiredLength: 4 },
  Canada: { label: "Postal Code", requiredLength: 6 },
  Romania: { label: "Cod postal", requiredLength: 6 }
};

function Checkout({ cart, total, setCart }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // State pentru formular
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [adminArea, setAdminArea] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState(''); // câmp pentru cod postal
  const [phonePrefix, setPhonePrefix] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ramburs');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Resetăm regiunea, orașul, zona administrativă și codul postal când se schimbă țara
  useEffect(() => {
    setRegion('');
    setCity('');
    setAdminArea('');
    setPostalCode('');
    if (country && phonePrefixOptions[country]) {
      setPhonePrefix(country);
    } else {
      setPhonePrefix('');
    }
  }, [country]);

  // Resetăm orașul, zona administrativă și codul postal când se schimbă regiunea
  useEffect(() => {
    setCity('');
    setAdminArea('');
    setPostalCode('');
  }, [region]);

  // Resetăm zona administrativă când se schimbă orașul
  useEffect(() => {
    setAdminArea('');
  }, [city]);

  // Condiție pentru afișarea selectului de zonă administrativă:
  // Pentru SUA: dacă regiunea este "New York" și orașul este "New York City"
  // Pentru Germania: dacă regiunea este "Berlin" sau "Hamburg"
  const isAdminAreaRequired = (
    (country === "SUA" && region === "New York" && city === "New York City") ||
    (country === "Germania" && (region === "Berlin" || region === "Hamburg"))
  );

  const isFormValid =
    country.trim() &&
    region.trim() &&
    city.trim() &&
    (!isAdminAreaRequired || adminArea.trim()) &&
    street.trim().length >= 5 && // asigură că adresa are cel puțin 5 caractere
    // Dacă țara are opțiuni de cod postal, asigură că codul postal nu este gol
    ((postalCodeOptions[country] && postalCode.trim().length > 0) || !postalCodeOptions[country]) &&
    phonePrefix.trim() &&
    phoneNumber.trim() &&
    email.trim() &&
    paymentMethod.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Coșul este gol.');
      return;
    }
    if (!isFormValid) {
      setError('Vă rugăm completați toate câmpurile corect.');
      return;
    }
    // Validare pentru numărul de telefon: verificăm dacă lungimea numărului de telefon corespunde cu requiredDigits
    const requiredDigits = phonePrefixOptions[phonePrefix]?.requiredDigits;
    if (!requiredDigits || phoneNumber.length !== requiredDigits) {
      setError(`Numărul de telefon trebuie să conțină exact ${requiredDigits} cifre. Ai introdus ${phoneNumber.length}.`);
      return;
    }
    // Validare pentru codul postal, dacă există opțiuni pentru țara selectată
    if (postalCodeOptions[country]) {
      const { requiredLength, label } = postalCodeOptions[country];
      if (postalCode.trim().length !== requiredLength) {
        setError(`${label} trebuie să aibă exact ${requiredLength} caractere. Ai introdus ${postalCode.trim().length}.`);
        return;
      }
      // Validare că codul postal conține doar cifre
      if (!/^\d+$/.test(postalCode.trim())) {
        setError(`${label} trebuie să conțină doar cifre.`);
        return;
      }
    }

    const orderData = {
      country,
      county: region,
      city,
      admin_area: isAdminAreaRequired ? adminArea : '',
      address: street,
      postal_code: postalCode, // includem codul postal
      phone: `${phonePrefixOptions[phonePrefix].prefix} ${phoneNumber}`,
      email,
      paymentMethod,
      total,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    console.log("Datele trimise:", orderData);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

      const response = await axios.post('axios.get(`${apiUrl}/api/products`)', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Răspuns de la server:", response.data);
      alert('Comanda a fost trimisă cu succes!');
      setCart([]);
      navigate('/');
    } catch (err) {
      console.error('Order submission error:', err.response ? err.response.data : err);
      setError('Eroare la trimiterea comenzii: ' + (err.response?.data?.message || ''));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Checkout</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Select pentru țară */}
        <div className="form-group">
          <label>Țara:</label>
          <select
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Selectează țara</option>
            {countries.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Select pentru regiune */}
        {country && locationMapping[country] && (
          <div className="form-group">
            <label>{locationMapping[country].label}:</label>
            <select
              className="form-control"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="">
                Selectează {locationMapping[country].label.toLowerCase()}
              </option>
              {Object.keys(locationMapping[country].data).map((r, index) => (
                <option key={index} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {/* Select pentru oraș */}
        {country && region && locationMapping[country] && locationMapping[country].data[region] && (
          <div className="form-group">
            <label>Oraș:</label>
            <select
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Selectează orașul</option>
              {locationMapping[country].data[region].map((cityName, index) => (
                <option key={index} value={cityName}>{cityName}</option>
              ))}
            </select>
          </div>
        )}

        {/* Select pentru zona administrativă, dacă este necesar */}
        {isAdminAreaRequired && (
          <div className="form-group">
            <label>Zona administrativă:</label>
            <select
              className="form-control"
              value={adminArea}
              onChange={(e) => setAdminArea(e.target.value)}
              required
            >
              <option value="">Selectează zona</option>
              {(() => {
                let key;
                if (country === "SUA") {
                  key = city; // pentru SUA, folosim orașul (ex.: New York City)
                } else if (country === "Germania") {
                  key = region; // pentru Germania, folosim regiunea (ex.: Berlin sau Hamburg)
                }
                return adminAreas[key]?.map((area, index) => (
                  <option key={index} value={area}>{area}</option>
                )) || null;
              })()}
            </select>
          </div>
        )}

        {/* Câmp pentru adresă (stradă) */}
        <div className="form-group">
          <label>Stradă:</label>
          <input
            type="text"
            className="form-control"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        {/* Câmp pentru cod postal */}
        {country && postalCodeOptions[country] && (
          <div className="form-group">
            <label>{postalCodeOptions[country].label}:</label>
            <input
              type="text"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
        )}

        {/* Câmp pentru numărul de telefon */}
        <div className="form-group">
          <label>Număr de telefon:</label>
          <select
            className="form-control"
            value={phonePrefix}
            onChange={(e) => setPhonePrefix(e.target.value)}
            required
            style={{ maxWidth: '100px' }}
          >
            {Object.entries(phonePrefixOptions).map(([ctry, { prefix, flag }]) => (
              <option key={ctry} value={ctry}>
                {flag} {prefix}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        {/* Câmp pentru email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Select pentru metoda de plată */}
        <div className="form-group">
          <label>Modalitate de plată:</label>
          <select
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="ramburs">Ramburs la livrare</option>
            <option value="card">Card</option>
          </select>
        </div>

        {/* Total */}
        <div className="form-group">
          <p>Total: ${Number(total).toFixed(2)}</p>
        </div>

        <button type="submit" className="trimit" disabled={!isFormValid}>
          Trimite Comanda
        </button>
      </form>
    </div>
  );
}

export default Checkout;




















