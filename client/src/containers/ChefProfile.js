import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Rating } from 'material-ui-rating';
import { fetchMealsByChef, fetchChefDetails, getChefsRequests, orderRequestedMeal } from '../actions/index';
import HorizontalGrid from '../components/HorizontalGrid';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import RequestCard from '../components/RequestCard';
import MealGridElement from '../components/MealGridElement';
import RequestGridElementChef from '../components/RequestGridElementChef';
import { getTopRequests } from '../utils/RequestHelper';

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
    const topRequests = requests && getTopRequests(requests, 3);
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
            leftAvatar={<Avatar src={chef.image} size={200} />}
          />
          <div className="chef-info">
            <h3 id="chef-username">{chef.username}</h3>
            <Rating value={Math.ceil(chef.rating)} max={5} readOnly={true} />
            <a href={`mailto:${chef.email}`}>
              <RaisedButton className="request" label="Contact" primary={true} />
            </a>
          </div>
        </List>
        <div className="requestcontainer">
          <h2>Requests</h2>
          <div>
            {Object.keys(topRequests).length > 0 &&
              <HorizontalGrid orderRequestedMeal={this.props.orderRequestedMeal} gridObject={topRequests} GridComponent={RequestGridElementChef}/>
            }
          </div>
        </div>
        <div className="mealscontainer">
            <h2 id="mealhistory">Meal History</h2>
            {dates.length !== 0 && _.map(dates, (date) => (
              <div key={date}>
                <p id="date">{new Date(date).toString().substr(0, 15)}</p>
                <HorizontalGrid gridObject={meals[date]} GridComponent={MealGridElement}/>
              </div>
            ))}
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
