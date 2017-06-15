import React from 'react';

import RequestCard from './RequestCard';

const RequestGridElementChef = function({ gridItem, orderRequestedMeal }) {
  return (
    <RequestCard
      requestId={gridItem.requestId}
      numRequired={gridItem.numRequired}
      numOrdered={gridItem.numOrdered}
      orderRequestedMeal={orderRequestedMeal}
      deadline={gridItem.deadline}
      meal={gridItem.meal}
    />
  );
}

export default RequestGridElementChef;