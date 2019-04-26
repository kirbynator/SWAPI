import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Image } from "semantic-ui-react";

const Example = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    axios.get("https://swapi.co/api/people/?page=1").then(res => {
      setPeople(res.data.results);
    });
  }, []);

  const profile = q => {
    let p = q;

    if (planets.filter(w => w.url === p.homeworld).length === 0) {
      debugger;
      axios
        .get(p.homeworld)
        .then(res => {
          const x = [res.data, ...planets];
          setPlanets(x);
          let g = { ...res.data };
          return (
            <Card>
              <Image src={`../charaters/${parseInt(p.url)}`} />
              <Card.Content>
                <Card.Header>{p.name}</Card.Header>
                <Card.Description>{`${p.name}'s Home Planet Is ${
                  g.name
                }`}</Card.Description>
              </Card.Content>
            </Card>
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      debugger;
      let g = planets.filter(w => w.url == p.homeworld);
      return (
        <Card>
          <Image src={`../charaters/${parseInt(p.url)}`} />
          <Card.Content>
            <Card.Header>{p.name}</Card.Header>
            <Card.Description>{`${p.name}'s Home Planet Is ${
              g[0].name
            }`}</Card.Description>
          </Card.Content>
        </Card>
      );
    }
  };

  return (
    <div>
      <Card.Group>
        {people.map(p => {
          profile(p);
        })}
      </Card.Group>
    </div>
  );
};

export default Example;
