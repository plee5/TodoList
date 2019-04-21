import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items : [],
      nextItemId : 0,
      sessionIsRunning : false,
      itemIdRunning : null
      
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id : nextItemId,
      description : description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId : nextItemId + 1,
      items : prevState.items.concat(newItem)
    })));
  }

  clearCompletedItems() {
    // TODO 6
    this.state.items.filter((it) => {
      it.isCompleted = false;
    });
    this.setState({items : this.state.items, areItemsMarkedAsCompleted : false});
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    // var count = 0;
    var it = null;
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id==itemId) {
        // count = this.state.items[i].sessionsCompleted;
        it = this.state.items[i];
        this.state.items[i].sessionsCompleted += 1
      }
    }
    
    this.setState({items : this.state.items});
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    var it = null;
    var completed = false;
    for (var i = 0; i < this.state.items.length; i++) {
      
        it = this.state.items[i];
        if (this.state.items[i].id==itemId) {
          it.isCompleted = !it.isCompleted;
        }
        if (it.isCompleted) {
          completed = true;
        }
    }
    this.setState({items : this.state.items, areItemsMarkedAsCompleted : completed});
  }

  startSession(id) {
    // TODO 4
    this.setState({sessionIsRunning: true, itemIdRunning:id})
  }

  render() {
    // areItemsMarkedAsCompleted = false;
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    var empty = items.length == 0;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
            { (sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning) }
              autoPlays
              key= {itemIdRunning}
            /> )}
            <div className="items-container">
            {/* TODO 3:  display todo items */
              empty ? (<EmptyState/>) : 
            (
              items.map((it) => (
                <TodoItem description={it.description} sessionsCompleted = {it.sessionsCompleted} 
                isCompleted = {it.isCompleted} key={it.id} startSession={() => this.startSession(it.id)}
                toggleIsCompleted = {() => this.toggleItemIsCompleted(it.id)}/>
              ))
            )
          }
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
