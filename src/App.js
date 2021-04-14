import './App.css';
import uuid from 'react-uuid'
import React from "react";

const model = [
        {
            id: uuid(),
            name: "Rucksack",
            editing: false,
            contents: [
                {
                    id: uuid(),
                    name: "Apples",
                    weight: "3",
                    editing: false,
                },
                {
                    id: uuid(),
                    name: "Oranges",
                    weight: "2",
                    editing: false,
                },
                {
                    id: uuid(),
                    name: "Bananas",
                    weight: "1",
                    editing: false,
                }
            ]
        },
        {
            id: uuid(),
            name: "Tool crate",
            editing: false,
            contents: [
                {
                    id: uuid(),
                    name: "Hammer",
                    weight: "1",
                    editing: false,
                },
                {
                    id: uuid(),
                    name: "Nails",
                    weight: "0.3",
                    editing: false,
                }
            ]
        }
    ]

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {model: props.model}
    }

    addItem(id) {
        const selectedContainer = this.state.model.find(x => x.id === id)
        selectedContainer.contents.push({
            id: uuid(),
            name: "new item",
            weight: 0,
            editing: false
        })
        this.setState({model: this.state.model})
    }

    addContainer() {
        this.state.model.push({
            id: uuid(),
            name: "New Container",
            contents: [],
            editing: false,
        })
        this.setState({model: this.state.model})
    }

    deleteItem(containerId, itemId) {
        const containerIndex = this.state.model.findIndex(x => x.id === containerId)
        const selectedContainer = this.state.model[containerIndex]
        selectedContainer.contents = selectedContainer.contents.filter(i => i.id !== itemId)
        this.setState({model: this.state.model})
    }

    deleteContainer(id) {
        const newModel = this.state.model.filter(cont => cont.id !== id)
        this.setState({model: newModel})
    }

    updateItem(containerId, itemId, fieldName, event) {
        const containerIndex = this.state.model.findIndex(x => x.id === containerId)
        const selectedContainer = this.state.model[containerIndex]
        const itemIndex = selectedContainer.contents.findIndex(x => x.id === itemId)
        if (fieldName === "editing") {
            selectedContainer.contents[itemIndex][fieldName] = !selectedContainer.contents[itemIndex][fieldName]
        } else {
            selectedContainer.contents[itemIndex][fieldName] = event.target.value
        }
        this.setState({model: this.state.model})
    }

    updateContainer(id, fieldName, event) {
        const containerIndex = this.state.model.findIndex(x => x.id === id)
        const newModel = this.state.model
        if (fieldName === "editing") {
            newModel[containerIndex][fieldName] = !newModel[containerIndex][fieldName]
        } else {
            newModel[containerIndex][fieldName] = event.target.value
        }

        this.setState({model: newModel})
    }



    render() {
        return (
            <div>
                {this.state.model.map(container => (
                    <table key={"full_table" + container.id}>
                        <thead>
                        {container.editing
                            ?
                            <tr key={container.id}>
                                <th><input type="text" value={container.name} onChange={(event) => this.updateContainer(container.id, "name", event)}/></th>
                                <th>Weight (kg)</th>
                                <th>
                                    <button onClick={() => this.updateContainer(container.id, "editing")}>Save</button>
                                    <button onClick={() => this.deleteContainer(container.id)}>Delete</button>
                                </th>
                            </tr>
                            :
                            <tr key={container.id}>
                                <th>{container.name}</th>
                                <th>Weight (kg)</th>
                                <th>
                                    <button onClick={() => this.updateContainer(container.id, "editing")}>Edit</button>
                                    <button onClick={() => this.deleteContainer(container.id)}>Delete</button>
                                </th>
                            </tr>
                        }
                        </thead>
                        <tbody>
                        {container.contents.map(item => (
                            item.editing
                                ?
                                <tr key={item.id}>
                                    <td>
                                        <input type="text" value={item.name} onChange={(event) => this.updateItem(container.id, item.id, "name", event)}/>
                                    </td>
                                    <td>
                                        <input type="number" value={item.weight} onChange={(event) => this.updateItem(container.id, item.id, "weight", event)}/>
                                    </td>
                                    <td>
                                        <button onClick={() => this.updateItem(container.id, item.id, "editing")}>Save</button>
                                        <button onClick={() => this.deleteItem(container.id, item.id)}>Delete</button>
                                    </td>
                                </tr>
                                :
                                <tr key={item.id}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.weight}
                                    </td>
                                    <td>
                                        <button onClick={() => this.updateItem(container.id, item.id, "editing")}>Edit</button>
                                        <button onClick={() => this.deleteItem(container.id, item.id)}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                        <tr>
                            <td>
                                <button onClick={() => this.addItem(container.id)}>+ New Item</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                ))}
                <button onClick={() => this.addContainer()}>+ New Container</button>
            </div>
        )
    }
}

function App() {
  return (
      <div>
          <h1>Inventory</h1>
          <Inventory model={model}/>
      </div>
  );
}

export default App;
