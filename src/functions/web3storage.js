import { Web3Storage } from 'web3.storage';

// use environment variables to store your api key and use it here
// I have used my api key here directly just for simplicity and to make it easy to understand.

export const client = new Web3Storage({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVCMEVGZDZCRDliMUNFOTk2OUFBNjYyZEYwNzU2NjA1QTM1ZTMxOUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQyODI1OTg0NTYsIm5hbWUiOiJ0ZXN0In0.Bb9NYoQuO5YoHJDuf-m0DU0rq7TTLBZ7Le8Zm9Y7AX8',
   // Replace with your actual API key
   // i have used my api key here 
   // make sure to use .env file to store your api key
});
