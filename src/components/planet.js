import React from "react";
import { Image, Header } from "semantic-ui-react";

class World extends React.Component {
  imgrab = y => {
    if ((y >= 2 && y <= 19) || y === 21) {
      return require(`./planets/${y}.jpg`);
    } else {
      return "https://image.flaticon.com/icons/svg/71/71768.svg";
    }
  };

  render() {
    const { cd, v } = this.props.avacado;
    let z = this.imgrab(Number(cd));
    return (
      <div>
        <Image rounded src={z} />
        <Header style={{ fontSize: "100px" }}>{v.home.name}</Header>
      </div>
    );
  }
}
export default World;
