import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const [city, setCity] = useState("Islamabad");
  const navigate = useNavigate();
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
        }}
      >
        <select
          value={city}
          onChange={handleCityChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            // border: "1px solid #D7A7AA",
            marginBottom: "20px",
            width: "100%",
            border: city === "" ? "#D7A7AA" : "#D7A7AA", // Default color if no selection
          }}
        >
          <option value="" disabled>
            Select Your City
          </option>
          <option value="Islamabad">Islamabad</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Peshawar">Peshawar</option>
        </select>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #D7A7AA",
            backgroundColor: "#D7A7AA",
            cursor: "pointer",
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
