import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const cities = [
    "Islamabad",
    "Lahore",
    "Karachi",
    "Peshawar",
    "Quetta",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sukkur",
    "Larkana",
    "Sheikhupura",
    "Jhang",
    "Mardan",
    "Gujrat",
    "Kasur",
    "Dera Ghazi Khan",
    "Okara",
    "Mirpur Khas",
    "Nawabshah",
    "Mingora",
    "Kotri",
    "Rahim Yar Khan",
    "Bannu",
    "Abbottabad",
    "Zhob",
    "Dadu",
    "Chiniot",
    "Khuzdar",
    "Kohat",
    "Muzaffargarh",
    "Sahiwal",
    "Jacobabad",
    "Shikarpur",
    "Jhelum",
    "Ghotki",
    "Mandi Bahauddin",
    "Tando Allahyar",
    "Vehari",
    "Attock",
    "Nowshera",
    "Khairpur",
    "Swabi",
    "Kandhkot",
    "Dera Ismail Khan",
    "Thatta",
    "Chaman",
    "Lodhran",
    "Turbat",
    "Mansehra",
    "Charsadda",
    "Hafizabad",
    "Badin",
    "Layyah",
    "Hangu",
    "Tando Adam",
    "Gojra",
    "Sanghar",
    "Pakpattan",
    "Kharian",
    "Khanewal",
    "Bhakkar",
    "Shahdadkot",
    "Bhalwal",
    "Mianwali",
    "Tando Muhammad Khan",
    "Jaranwala",
    "Muzaffarabad",
    "Mirpur",
    "Gilgit",
    "Skardu",
  ];

  const [city, setCity] = useState(localStorage.getItem("selectedCity") || "");

  useEffect(() => {
    // Save selected city to localStorage
    localStorage.setItem("selectedCity", city);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src="/images/20250118_1733_Pakistani Fashion Fusion_simple_compose_01jhwpdrhvfn98c5waydw09crm.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          zIndex: 1,
          width: "300px",
        }}
      >
        <select
          value={city}
          onChange={handleCityChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            width: "100%",
            border: "1px solid #D7A7AA",
            marginBottom: "10px",
          }}
        >
          <option value="" disabled>
            Select Your City
          </option>
          {cities.map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
          <option value="other">Other (Enter Manually)</option>
        </select>

        {city === "other" && (
          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={handleCityChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #D7A7AA",
              marginBottom: "10px",
              fontSize: "16px",
            }}
          />
        )}

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #D7A7AA",
            backgroundColor: "#D7A7AA",
            cursor: "pointer",
            width: "100%",
          }}
          onClick={() => navigate("/landingpage")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Splash;
