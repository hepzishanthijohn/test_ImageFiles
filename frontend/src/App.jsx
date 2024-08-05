import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
 const [file, setFile] = useState();
 const [image, setImage] = useState()


 useEffect(() => {
  axios.get('https://test-imagefiles.onrender.com/getImage')
     .then((res) =>{
      setImage(res.data[3].image)
     })
     .catch(err => console.log(err))
 }, [])

  const handleUpload =(e) =>{
    const formdata = new FormData()
    formdata.append('file', file)
     axios.post('https://test-imagefiles.onrender.com/upload',formdata)
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
        <img src={`https://test-imagefiles.onrender.com/images/${image}`} alt="" />
      </div>
    </>
  )
}

export default App;
