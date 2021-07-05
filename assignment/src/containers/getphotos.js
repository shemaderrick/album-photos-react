import React, { useState } from 'react'
import axios from 'axios'
import Loading from '../components/loading'
const GetPhotos = () => {
 const [load, setLoad] = useState(false)
 const [albumid, setAlbum] = useState('')
 const [data, setData] = useState([])
 const [url, setUrl] = useState('')
 const handleSubmit = async (e) => {
  e.preventDefault()

  if (albumid < 1 || isNaN(albumid)) {
   setAlbum('')
   return alert(`Cant load Images for album ID "${albumid}" Please enter a number greater than 1`)

  }
  setLoad(true)
  setData([])
  try {
   const data = await axios.get(url)
   console.log(data.data)
   setAlbum('')
   setData(data.data)
   setLoad(false)

  } catch (error) {

  }

 }

 return <>
  <form onSubmit={handleSubmit}>
   <div className="form-container mx-auto" style={{ width: 600 }}>
    <div className="d-flex flex-row justify-content-between">
     <label htmlFor=""> Enter Album ID</label>
     <input type="text" onChange={(e) => {
      setAlbum(e.target.value);
      setUrl(`https://jsonplaceholder.typicode.com/albums/${e.target.value}/photos`);
     }} value={albumid} disabled={load} />
     <button type="submit" className="btn btn-primary" disabled={load}> Get Album Photos By Id</button>
    </div>
   </div>
  </form>

  <div className="gridContainer">
   {load ? <Loading /> : ('')}
   {data.map((element) => {
    const { thumbnailUrl, title } = element
    return (
     <div class="card" style={{ width: 288 }}>
      <img src={thumbnailUrl} class="card-img-top" alt="..." />
      <div class="card-body">
       <p class="card-text">{title}</p>
      </div>
     </div>)

   })}


  </div>




 </>


}
export default GetPhotos