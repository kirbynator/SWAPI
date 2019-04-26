import React from "react";
import { Card, Image, Header } from "semantic-ui-react";
import axios from "axios";
import Planets from "./planet";

class Home extends React.Component {
  state = {
    info: [],
    pfo: { v: { home: { name: "" } }, cp: 0 },
    count: 1
  };
  componentDidMount() {
    axios.get("https://swapi.co/api/people/?page=1").then(q => {
      q.data.results.map(p => {
        axios.get(p.homeworld).then(res => {
          this.setState({
            info: [...this.state.info, { ...p, home: res.data }]
          });
        });
      });
    });
  }

  LoadMore = () => {
    axios
      .get(`https://swapi.co/api/people/?page=${this.state.count + 1}`)
      .then(q => {
        q.data.results.map(p => {
          axios.get(p.homeworld).then(res => {
            this.setState({
              info: [...this.state.info, { ...p, home: res.data }]
            });
          });
        });
      });
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    document.body.style =
      "background-image: url('http://chandra.harvard.edu/photo/2009/galactic/galactic.jpg'); background-position: center; background-size: cover; background-repeat: no-repeat;";
    return (
      <div
        style={{
          display: "flex",
          overflowY: "auto",
          height: window.innerHeight
        }}
      >
        <Card.Group style={{ width: "48%", marginLeft: "1%", marginTop: "1%" }}>
          {this.state.info.map(p => (
            <Card
              key={p.name}
              onMouseEnter={() =>
                this.setState({
                  pfo: { v: p, cd: p.home.url.split("/")[5] }
                })
              }
            >
              <Image src={require(`./characters/${p.url.split("/")[5]}.jpg`)} />
              <Card.Content>
                <Card.Header>{p.name}</Card.Header>
                <Card.Description>{`${p.name}'s Home Planet Is ${
                  p.home.name
                }`}</Card.Description>
              </Card.Content>
            </Card>
          ))}
          <Card onClick={this.LoadMore} fluid style={{ textAlign: "center" }}>
            <Header>
              {this.state.count < 9
                ? "Click To Load More"
                : "There Is No More To Load"}
            </Header>
          </Card>
        </Card.Group>
        <div style={{ width: "35%", position: "fixed", right: "0" }}>
          <Planets avacado={this.state.pfo} />
        </div>
      </div>
    );
  }
}

export default Home;
