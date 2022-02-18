import axios from "axios";

console.log('Location app starts...');

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyAb8LDRqUOhRoxYmH7Oop1F-aIMVKAT4io"

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value

   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`).then((response) => {
       console.log(response)
   }).catch((error) => {
       console.log(`Error: ${error}`)
   })
}

form.addEventListener('submit', searchAddressHandler)
