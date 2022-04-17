import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from "react-router-dom";
import "./styles/DonateGive.css";


const DonateGive = () => {
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [file, setFile] = useState();
  const [imgUploadErr, setImgUploadErr] = useState("");

  const userEmail = useSelector(state => state.email);
  console.log("Users email: " + userEmail);

  const handleFoodNameChange = (event) => {
    setFoodName(event.target.value);
  }

  const handleFoodDescChange = (event) => {
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
            email: userEmail,
            data: imageData,
            startTime: startTime,
            endTime: endTime
          })
        }).then(res => {
          console.log("Res ok: " + res.ok)
          if(!res.ok){
            setImgUploadErr("Image uploaded is too large!");
            throw res;
          }
          setImgUploadErr("Success!");
          return res.json();
        }).then(data => {
          navigate("/donate/view");
          console.log("Post data: " + data["_id"]);
        });
    };
    reader.onerror = (err) => {
      setImgUploadErr("Image uploaded is too large!");
      console.log("Error: err");
    };

    reader.readAsDataURL(file);
  }
  /*
    <Form.Group className="mb-3">
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" placeholder="Food Name" onChange={handleFoodNameChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Food Description</Form.Label>
                <Form.Control type="text" placeholder="Food Description" onChange={handleFoodDescChange} />
            </Form.Group>
  */
  return (
    <form>
      <h1>Donate Food</h1>
      <div className="form-group">
          <label>Food Name</label>
          <input type="text" className="form-control" placeholder="Food Name" onChange={handleFoodNameChange}/>
      </div>
      <div className="form-group">
          <label>Food Description</label>
          <input type="text" className="form-control" placeholder="Food Description" onChange={handleFoodDescChange}/>
      </div>
      <input type="file" name="file" id="fileUploadButton" onChange={fileSelected}/>
      <Button onClick={uploadImage} id = "submitButton"> Upload Food </Button> 
      <p> {imgUploadErr} </p>
  </form>
  );
}


/*const DonateGive = () => {
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [file, setFile] = useState();
  const [imgUploadErr, setImgUploadErr] = useState("");

  const userEmail = useSelector(state => state.email);
  console.log("Users email: " + userEmail);

  const handleFoodNameChange = (event) => {
    setFoodName(event.target.value);
  }

  const handleFoodDescChange = (event) => {
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
            email: userEmail,
            data: imageData,
            startTime: startTime,
            endTime: endTime
          })
        }).then(res => {
          console.log("Res ok: " + res.ok)
          if(!res.ok){
            setImgUploadErr("Image uploaded is too large!");
            throw res;
          }
          setImgUploadErr("Success!");
          return res.json();
        }).then(data => {
          navigate("/donate/view");
          console.log("Post data: " + data["_id"]);
        });
    };
    reader.onerror = (err) => {
      setImgUploadErr("Image uploaded is too large!");
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
            <Form.Label>Start Time (DD.MM.YYYY HH:mm)</Form.Label>
            <DateTimePicker
                  renderInput={(props) => <p {...props} />}
                  label="DateTimePicker"
                  value={startTime}
                  onChange={(newStartTime) => {
                    console.log("New start time: " + newStartTime)
                    setStartTime(newStartTime);
                  }}
            />
            <Form.Label>End Time (DD.MM.YYYY HH:mm)</Form.Label>
            <DateTimePicker
                  renderInput={(props) => <p {...props} />}
                  label="DateTimePicker"
                  value={endTime}
                  onChange={(newEndTime) => {
                    console.log("New end time: " + newEndTime);
                    setEndTime(newEndTime);
                  }}
            />
            <input type="file" name="file" id="fileUploadButton" onChange={fileSelected}/>
            <Button onClick={uploadImage} id = "submitButton"> Upload Food </Button> 
            <p> {imgUploadErr} </p>
        </div>
      </Form>
    </div>
  );
}*/

export default DonateGive;