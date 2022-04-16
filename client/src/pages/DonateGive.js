import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
const DonateGive = () => {
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");

  const handleFoodNameChange = (event) => {
    console.log("Food Name: " + foodName)
    setFoodName(event.target.value);
  }

  const handleFoodDescChange = (event) => {
    console.log("Food Name: " + foodDesc)

    setFoodDesc(event.target.value);
  }


  const fileSelected = (event) => {
    const file = event.target.files[0];
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
            throw res;
          }
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
          </div>
          <div class = "FormInput">
            <Form.Group className="mb-3">
                <Form.Label>Food Description</Form.Label>
                <Form.Control type="text" placeholder="Food Description" onChange={handleFoodDescChange} />
            </Form.Group>
          </div>
          <input type="file" name="file" id="upload" onChange={fileSelected}/>
      </Form>
    </div>
  );
}

export default DonateGive;