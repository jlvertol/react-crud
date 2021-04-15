import React, {useState, useEffect} from "react";

// Function components and hooks to achieve a more streamlined inventory compared to InventoryMvp

const InventoryHooks = (model) => {
    return (
        <div>
            <h1>Inventory based on Hooks</h1>
            {model.map((container) => Container(container))}
        </div>
    )
}

const Container = (container) => {
    const [name, setName] = useState(container.name)
    const [editing, setEditing] = useState(container.editing)
    const [contents, setContents] = useState(container.contents)

    return (
        <table key={container.id}>
            <thead>
            <tr>
                <th>
                    {editing ? (
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    ) : name}
                </th>
                <th>Weight</th>
                <th>
                    <button onClick={() => setEditing(!editing)}>{editing ? "Save" : "Edit"}</button>
                </th>
            </tr>
            </thead>
            <tbody>
                {contents.map((item) => Item(item))}
            </tbody>
        </table>
    )
}

const Item = (item) => {
    const id = item.id
    const [name, setName] = useState(item.name)
    const [weight, setWeight] = useState(item.weight)
    const [editing, setEditing] = useState(item.editing)
    const [deleted, setDeleted] = useState(false)

    return (
        !deleted &&
        <tr key={id}>
            <td>
                {editing ? (
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                ) : name}
            </td>
            <td>
                {editing ? (
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}/>
                ) : weight}
            </td>
            <td>
                <button onClick={() => setEditing(!editing)}>{editing ? "Save" : "Edit"}</button>
                <button onClick={() => setDeleted(true)}>Deleted</button>
            </td>
        </tr>
    )
}

export default InventoryHooks
