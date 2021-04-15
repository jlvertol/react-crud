import './App.css';
import uuid from 'react-uuid'
import React from "react";
import InventoryMvp from "./InventoryMvp";
import InventoryHooks from "./InventoryHooks";

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

function App() {
    return (
        <div>
            <InventoryHooks defaultModel={model}/>
            <InventoryMvp model={model}/>
        </div>
    );
}

export default App;
