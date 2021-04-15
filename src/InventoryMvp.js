import uuid from "react-uuid";
import React from "react";

// This is an example of a CRUD class prototype. It's not an elegant solution, but it gets
// the job done. InventoryHooks tries to streamline this into a cleaner component.
// I'm keeping this class as a way to document the process by which the system evolved.
// The "Mvp" part stands for "minimally viable product"

class InventoryMvp extends React.Component {
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
            <div className="content-block">
                <h1>Minimally viable inventory, using a class</h1>
                {this.state.model.map(container => (
                    <table key={"full_table" + container.id}>
                        <thead>
                        {container.editing
                            ?
                            <tr key={container.id}>
                                <th><input type="text" value={container.name} onChange={(event) => this.updateContainer(container.id, "name", event)}/></th>
                                <th>Weight (kg)</th>
                                <th>
                                    <button className="btn btn-main" onClick={() => this.updateContainer(container.id, "editing")}>Save</button>
                                    <button className="btn btn-delete" onClick={() => this.deleteContainer(container.id)}>Delete</button>
                                </th>
                            </tr>
                            :
                            <tr key={container.id}>
                                <th>{container.name}</th>
                                <th>Weight (kg)</th>
                                <th>
                                    <button className="btn btn-main" onClick={() => this.updateContainer(container.id, "editing")}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => this.deleteContainer(container.id)}>Delete</button>
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
                                        <button className="btn btn-main" onClick={() => this.updateItem(container.id, item.id, "editing")}>Save</button>
                                        <button className="btn btn-delete" onClick={() => this.deleteItem(container.id, item.id)}>Delete</button>
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
                                        <button className="btn btn-main" onClick={() => this.updateItem(container.id, item.id, "editing")}>Edit</button>
                                        <button className="btn btn-delete" onClick={() => this.deleteItem(container.id, item.id)}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                        <tr>
                            <td>
                                <button className="btn btn-large" onClick={() => this.addItem(container.id)}>+ New Item</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                ))}
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <button className="btn btn-large" onClick={() => this.addContainer()}>+ New Container</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default InventoryMvp
