
import {Song,TrendSong} from "./models/song.js";
import mongoose from "mongoose";
import "./db.js";
const Songs = [
//  {
//         title: 'Thalapathy Kacheri',
//         artist: 'Anirudh Ravichander, Thalapathy Vijay, Arivu',
//         audio: 'kacheri.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02e2b41d0e6e8205e913701a42'
    
//     },
//     {
//         title: 'Gehra Hua',
//         artist: 'Shashwat Sachdev, Arijit Singh',
//         audio: 'gehra.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e02c53e5adf9f81693d62f98019'
//     },
//     {
//         title: 'Seet Lehar',
//         artist: 'Filmy, Riyaazi',
//         audio: 'seet.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e0218e0c34df0355a2cf18734c5'
//     },
//     {
//         title: 'Thodi Si Daaru',
//         artist: 'AP Dhillon,Shreya Ghoshal',
//         audio: 'thodi si.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02eb0516ec1c97c3cc97f4cb61'
//     },
//     {
//         title: 'Thalapathy Kacheri',
//         artist: 'Anirudh Ravichander, Thalapathy Vijay, Arivu',
//         audio: 'kacheri.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02e2b41d0e6e8205e913701a42'
//     },
//     {
//         title: 'Gehra Hua',
//         artist: 'Shashwat Sachdev, Arijit Singh',
//         audio: 'gehra.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e02c53e5adf9f81693d62f98019'
//     },
//     {
//         title: 'Seet Lehar',
//         artist: 'Filmy, Riyaazi',
//         audio: 'seet.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e0218e0c34df0355a2cf18734c5'
//     },
//     {
//         title: 'Thodi Si Daaru',
//         artist: 'AP Dhillon,Shreya Ghoshal',
//         audio: 'thodi si.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02eb0516ec1c97c3cc97f4cb61'
//     },
//     {
//         title: 'Thalapathy Kacheri',
//         artist: 'Anirudh Ravichander, Thalapathy Vijay, Arivu',
//         audio: 'kacheri.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02e2b41d0e6e8205e913701a42'
//     },
//     {
//         title: 'Gehra Hua',
//         artist: 'Shashwat Sachdev, Arijit Singh',
//         audio: 'gehra.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e02c53e5adf9f81693d62f98019'
//     },
//     {
//         title: 'Seet Lehar',
//         artist: 'Filmy, Riyaazi',
//         audio: 'seet.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e0218e0c34df0355a2cf18734c5'
//     },
//     {
//         title: 'Thodi Si Daaru',
//         artist: 'AP Dhillon,Shreya Ghoshal',
//         audio: 'thodi si.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02eb0516ec1c97c3cc97f4cb61'
//     },
//     {
//         title: 'Thalapathy Kacheri',
//         artist: 'Anirudh Ravichander, Thalapathy Vijay, Arivu',
//         audio: 'kacheri.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02e2b41d0e6e8205e913701a42'
//     },
//     {
//         title: 'Gehra Hua',
//         artist: 'Shashwat Sachdev, Arijit Singh',
//         audio: 'gehra.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e02c53e5adf9f81693d62f98019'
//     },
//     {
//         title: 'Seet Lehar',
//         artist: 'Filmy, Riyaazi',
//         audio: 'seet.mpeg',
//         image: 'https://i.scdn.co/image/ab67616d00001e0218e0c34df0355a2cf18734c5'
//     },
//     {
//         title: 'Thodi Si Daaru',
//         artist: 'AP Dhillon,Shreya Ghoshal',
//         audio: 'thodi si.mp3',
//         image: 'https://i.scdn.co/image/ab67616d00001e02eb0516ec1c97c3cc97f4cb61'
//     },

{
    title: "Moment of Peace",
    artist: "MickeysCat",
    audio: "https://res.cloudinary.com/cxaan02k/video/upload/v1787938190/mickeyscat-moment-of-peace-mickeyscat-554494.mp3",
    image: "...",
}
];

  await Song.insertMany(Songs);

// const users=[

// ]
 mongoose.connection.close();