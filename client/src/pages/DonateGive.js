import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./styles/DonateGive.css";

const DonateGive = () => {
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [file, setFile] = useState();
  const [imgErr, setImgErr] = useState("");

  const handleFoodNameChange = (event) => {
    console.log("Food Name: " + foodName)
    setFoodName(event.target.value);
  }

  const handleFoodDescChange = (event) => {
    console.log("Food Name: " + foodDesc)

    setFoodDesc(event.target.value);
  }

  const fileSelected = (event) => {
    setFile(event.target.files[0]); 
  }

  const uploadImage = (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        let imageData = event.target.result;
        
        fetch('http://localhost:5000/food', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: foodName,
            description: foodDesc,
            email: "sai@gmail.com",
            data: imageData
          })
        }).then(res => {
          console.log("Res ok: " + res.ok)
          if(!res.ok){
            setImgErr("Image uploaded is too large!");
            throw res;
          }
          setImgErr("");
          return res.json();
        }).then(data => {
          console.log("Post data: " + data["_id"]);
        });
    };
    reader.onerror = (err) => {
        console.log("Error: err");
    };

    reader.readAsDataURL(file);
  }
  return (
    <div className="DonateGive">
      <Form>
        <div class = "FormInput">
            <Form.Group className="mb-3">
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" placeholder="Food Name" onChange={handleFoodNameChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Food Description</Form.Label>
                <Form.Control type="text" placeholder="Food Description" onChange={handleFoodDescChange} />
            </Form.Group>
            <p>{imgErr}</p> 
          <input type="file" name="file" id="upload" onChange={fileSelected}/>
          <Button onClick={uploadImage} id = "uploadButton"> Upload Image </Button>
        </div>
      </Form>
    </div>
  );
}

export default DonateGive;