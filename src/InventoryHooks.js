import React, {useState} from "react";

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
                {container.contents.map((item) => Item(item.id, item.name, item.weight, item.editing))}
            </tbody>
        </table>
    )
}

const Item = (id, name_, weight_, editing_) => {
    const [name, setName] = useState(name_)
    const [weight, setWeight] = useState(weight_)
    const [editing, setEditing] = useState(editing_)

    return (
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
            </td>
        </tr>
    )
}

export default InventoryHooks
