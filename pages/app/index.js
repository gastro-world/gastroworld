import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const HomeApp = ({ google, markers }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [addPlace, setAddPlace] = useState({});
  const [isMonetized, setIsMonetized] = useState(false);
  useEffect(() => {
    if (document.monetization) {
      setIsMonetized(true);
    }
  }, [isMonetized]);
  const onMarkerClick = (props, marker, e) => {
    setShowInfo(true);
    setSelectedPlace(props);
  };
  const onClose = () => {
    if (showInfo) {
      setShowInfo(false);
    }
  };
  const handleClick = (e) => {
    if (isMonetized) {
      const data = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setAddPlace(data);
    }
  };
  const InfoContent = ({ message, position, image, place, id }) => {
    console.log(message, position, image, place);
    if (message == "Add this place") {
      return (
        <div>
          <Link href={"/app/add/" + position.lat + "/" + position.lng}>
            <a className="text-blue-600 underline text-xl font-bold">
              Add this place
            </a>
          </Link>
        </div>
      );
    } else {
      console.log(message);
      return (
        <>
          <img src={image} alt={message} width="200px" />
          <h1 className="font-bold text-center">{message}</h1>
          <h2 className="font-bold text-center">{place}</h2>
          <Link href={"/app/food/" + id}>
            <a className="text-center m-2 text-blue-400 font-bold underline">
              View how to cook this recipe
            </a>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="">
      <Map
        google={google}
        zoom={3}
        onClick={(a, b, c) => handleClick(c)}
        style={mapStyles}
      >
        {addPlace && (
          <Marker
            name={"Add this place"}
            onClick={onMarkerClick}
            title={"Add place"}
            position={addPlace}
          />
        )}
        {markers.map((n) => (
          <Marker
            key={n.key}
            id={n.key}
            position={{ lat: n.lat, lng: n.lng }}
            name={n.name}
            image={n.image}
            place={n.place}
            onClick={onMarkerClick}
          />
        ))}
        <InfoWindow
          position={selectedPlace.position}
          visible={showInfo}
          onClose={onClose}
        >
          <InfoContent
            message={selectedPlace.name}
            position={selectedPlace.position}
            image={selectedPlace.image}
            place={selectedPlace.place}
            id={selectedPlace.id}
          />
        </InfoWindow>
      </Map>
    </div>
  );
};

export const getServerSideProps = async () => {
  withPageAuthRequired();
  const res = await fetch(process.env.AUTH0_BASE_URL + "/api/data");
  const markers = await res.json();

  return {
    props: {
      markers,
    },
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAMU8Eys5iJyxvpJxQ17Vp-51U8rJHs-ik",
})(HomeApp);
