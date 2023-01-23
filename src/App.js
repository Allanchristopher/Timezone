import React, { useState } from "react";
import { Row, Col, Card, Typography, Button, Input, Form } from "antd";
const { Title } = Typography;

function App() {
  const [input, setinput] = useState("");
  const [livelocationtime, setlivelocationtime] = useState("");
  const [time, settime] = useState("");
  const [timezonee, settimezonee] = useState("");

  let value, timezone;

  const timefun = () => {
    setInterval(() => {
      const data = new Date();
      setlivelocationtime(data.toLocaleTimeString());
    });
  };
  const gettime = async () => {
    let apikey = "238fc375db844255858e5c3680125079";
    const res = await fetch(
      `https://api.ipgeolocation.io/timezone?apiKey=${apikey}&location=${input}`
    );
    const data = await res.json();
    timezone = data.timezone;
    settimezonee(timezone);
    setInterval(() => {
      value = new Date().toLocaleTimeString("en-us", {
        timeZone: `${timezone}`,
      });
      settime(value);
    });
  };
  timefun(); 
  const clear=()=>{
    window.location.reload(false);
  }
  return (
    <div className="App">
      <Row justify="center">
        <Col span={24}>
          <Card style={{ height: 100 }}>
            <Title level={1}>Time Zone</Title>
          </Card>
        </Col>
      </Row>
      <br />
     
      <Row>
        <Col>
        <h3>Current location time: {livelocationtime}</h3> 
        </Col>
      </Row>
      <br/>
      <Row justify="center">
        <Col><h2>{timezonee}</h2></Col>
      </Row>
      <Row justify="center"> 
        <Col><h1>{time}</h1></Col>
      </Row>
      <Form>
        <Row justify="center" style={{ marginTop: 50 }}>
          <Col span={6}>
            <Input
              placeholder="Enter the city name......"
              size="large"
              onChange={(e) => setinput(e.target.value)}
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row justify="center">
          <Col span={2}>
            <Button type="primary" onClick={gettime}>
              Search
            </Button>
          </Col>
          <Col span={1}>
            <Button type="primary" onClick={clear}>
              reset
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default App;
