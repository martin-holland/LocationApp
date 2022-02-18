import axios from "axios";

console.log('Location app starts...');

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyAb8LDRqUOhRoxYmH7Oop1F-aIMVKAT4io"
declare let google: any;

// custom type for Google GeoCoding
type GoogleGeoCodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS'
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value

   axios.get<GoogleGeoCodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`).then((response) => {
    if (response.data.status !== 'OK') {
        throw new Error('Could not find location');
    }
    //    console.log(response)
    const coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 8,
      }
      );
      new google.maps.Marker({position: coordinates, map:map})
   }).catch((error) => {
       alert(error.message)
       console.log(`Error: ${error}`)
   })
}

form.addEventListener('submit', searchAddressHandler)
