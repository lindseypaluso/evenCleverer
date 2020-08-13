import React, { Component } from "react";
//pass topics into category components to render assignments by category
import AssignmentCategory from "./AssignmentCategory.js";
//dropdpwn topics filter at top of table
import AssignmentsFilter from "./AssignmentsFilter.js";
//dropdown topics selector within create modal
import TopicOptions from "./TopicOptions";
import AssignmentsAPI from '../utils/API-assignments';
import AssignmentCreate from './AssignmentCreate';
import CreateCard from "./CreateCard.js";


class Assignments extends Component {
    //initialize state with array for each class's assignment topics
    state = {
        topics : [],
    };
    
    componentDidMount() {
        //call the util that accesses the controller for getting all topics
        AssignmentsAPI.getTopics().then(res => {
            this.setState({
                //match the state with the array of topics
                topics: res.data
            });
        })
        
    }

    render() {
        return (
            <div className="container main my-5 text-black text-center rounded">
                <div className="row">
                
                    <AssignmentCreate 
                        topics = {this.state.topics}
                    />
                
                    <div className="col-8 text-center">
                        <h5 className="mt-2">Assignments for <span id="class-name">Miss P's 1st Grade</span></h5>
                    </div>
                    <div className="col-2 mt-2">
                        <a className="dropdown-toggle sort-toggle" data-toggle="dropdown" href="#">Sort</a>
                        <ul className="dropdown-menu text-white">
                            <li>All Topics</li>
                            { this.state.topics.map( element => (
                              <AssignmentsFilter 
                                topic = {element.topic}
                                key = {element.topic}
                              />  
                            ))}
                        </ul>
                    </div>
                </div>
                { this.state.topics.map( element =>
                    <AssignmentCategory 
                        topic = {element.topic}
                        key = {element.topic}
                    />
                )}

                
            </div>
        )
    }
}

export default Assignments;
