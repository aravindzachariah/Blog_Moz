import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

const CardI = (props) => {
  return (
    <div>
      <Card >
        <CardImg top width="50%" src={props.post.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.post.title}</CardTitle>
          <CardSubtitle>{props.post.sub}</CardSubtitle>
          <CardText>{props.post.body}</CardText>
          <a href='#9'>Read More</a>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardI;