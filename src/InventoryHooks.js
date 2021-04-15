import uuid from 'react-uuid'
import React, {useState} from "react";

// Function components and hooks to achieve a more streamlined inventory compared to InventoryMvp

const InventoryHooks = ({defaultModel}) => {
    const [model, setModel] = useState(defaultModel)

    const addContainer = () => {
        const newContainer = {
            id: uuid(),
            name: "New Container",
            contents: [],
            editing: false
        }
        setModel([...model, newContainer])
    }

    const removeContainer = (id) => {
        setModel(model.filter(container => container.id !== id))
    }

    return (
        <div className="content-block">
            <h1>Inventory based on Hooks</h1>
            {model.map((container) => <Container container={container} key={container.id} remove={removeContainer}/>)}
            <table>
                <tbody>
                <tr>
                    <td>
                        <button className="btn btn-large" onClick={addContainer}>+ New Container</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const Container = (props) => {
    const container = props.container
    const [name, setName] = useState(container.name)
    const [editing, setEditing] = useState(container.editing)
    const [contents, setContents] = useState(container.contents)

    const selfDelete = () => props.remove(container.id)

    const addItem = () => {
        const newItem = {
            id: uuid(),
            name: "new item",
            weight: 0,
            editing: false
        }
        setContents([...contents, newItem])
    }

    const removeItem = (id) => {
        setContents(contents.filter(item => item.id !== id))
    }

    return (
        <table>
            <thead>
            <tr>
                <th>
                    {editing ?
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        : name}
                </th>
                <th>Weight (kg)</th>
                <th>
                    <button className="btn btn-main" onClick={() => setEditing(!editing)}>{editing ? "Save" : "Edit"}</button>
                    <button className="btn btn-delete" onClick={selfDelete}>Delete</button>
                </th>
            </tr>
            </thead>
            <tbody>
            {contents.map((item) => <Item item={item} key={item.id} remove={removeItem}/>)}
            <tr>
                <td>
                    <button className="btn btn-large" onClick={addItem}>+ New Item</button>
                </td>
            </tr>
            </tbody>
        </table>
    )
}

const Item = (props) => {
    const item = props.item
    const [name, setName] = useState(item.name)
    const [weight, setWeight] = useState(item.weight)
    const [editing, setEditing] = useState(item.editing)

    const selfDelete = () => props.remove(item.id)

    return (
        <tr>
            <td>
                {editing ?
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    : name}
            </td>
            <td>
                {editing ?
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}/>
                    : weight}
            </td>
            <td>
                <button className="btn btn-main" onClick={() => setEditing(!editing)}>{editing ? "Save" : "Edit"}</button>
                <button className="btn btn-delete" onClick={selfDelete}>Delete</button>
            </td>
        </tr>
    )
}

export default InventoryHooks
