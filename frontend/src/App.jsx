import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
 const [file, setFile] = useState();
 const [image, setImage] = useState()


 useEffect(() => {
  axios.get('http://localhost:5003/getImage')
     .then((res) =>{
      setImage(res.data[3].image)
     })
     .catch(err => console.log(err))
 }, [])

  const handleUpload =(e) =>{
    const formdata = new FormData()
    formdata.append('file', file)
     axios.post('http://localhost:5003/upload',formdata)
     .then((res) =>{
      console.log(res)
     })
     .catch(err => console.log(err))

  }
  return (
    <>
      <div>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={handleUpload}>upload</button>
        <br />
        <img src={`http://localhost:5003/images/${image}`} alt="" />
      </div>
    </>
  )
}

export default App;
