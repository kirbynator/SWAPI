import React, { useState, useEffect } from "react";
import { Card, Image } from "semantic-ui-react";

const Example = () => {
  const [people, setPeople] = useState([]);

  useEffect(props => {
    setPeople(props.p);
  }, []);

  const profile = p => {
    debugger;
    return (
      <Card>
        <Image src={`../charaters/${parseInt(p.url)}`} />
        <Card.Content>
          <Card.Header>{p.name}</Card.Header>
          <Card.Description>{`${p.name}'s Home Planet Is ${
            p.home.name
          }`}</Card.Description>
        </Card.Content>
      </Card>
    );
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
