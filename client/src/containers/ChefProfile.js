import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Rating } from 'material-ui-rating';
import { fetchMealsByChef, fetchChefDetails, getChefsRequests } from '../actions/index';
import HorizontalGrid from '../components/HorizontalGrid';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import RequestCard from '../components/RequestCard';

import './ChefProfile.css';

class ChefProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.params)
    this.props.fetchChefDetails(id);
    this.props.fetchMealsByChef();
    this.props.getChefsRequests(id);
  }

  render() {
    const { meals, chef, requests } = this.props;
    {console.log(this.props.requests)}
    if (!meals) {
      return <p>Loading.....</p>;
    }
    let dates = Object.keys(this.props.meals).sort(function(a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return (
      <div>
        <List>
          <ListItem
            disabled={true}
            leftAvatar={<Avatar src={chef.image} size={300} />}
          />
          <div className="chef-info">
            <h3>{chef.username}</h3>
            <Rating value={Math.ceil(chef.rating)} max={5} readOnly={true} />
            <RaisedButton className="request" label="Request a Meal" primary={true} />
          </div>
        </List>
        <div className="flex-grid">
          <div className="mealscontainer">
            <Card className="card">
              <h2>Meal History</h2>
              {dates.length !== 0 && _.map(dates, (date) => (
                <Card>
                  <p id="date">{new Date(date).toString().substr(0, 15)}</p>
                  <HorizontalGrid key={date} meals={this.props.meals[date]}/>
                </Card>
              ))}
            </Card>
          </div>
          <div className="col">
            <h1 className="purchase-title">Requests</h1>
            <div>
            <Card className="card">
              {_.map(requests, (request) => (
                <Card key={request.requestId} >
                  <RequestCard
                    requestId={request.requestId}
                    numRequired={request.numRequired}
                    numOrdered={request.numOrdered}
                    deadline={request.deadline}
                    meal={request.meal}
                  />
                </Card>
              ))}
            </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meals, chef, requests }) {
  return {
    meals: meals,
    chef: chef,
    requests: requests
  };
}

export default connect(mapStateToProps, { fetchMealsByChef, fetchChefDetails, getChefsRequests })(ChefProfile);
