import React from "react";
import "../App.css";

const Fetch = () => {
    const [lista, setLista] = React.useState([])

    React.useEffect(() => {
        document.title = 'Pokedex'
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        const pokemones = await data.json()
        console.log(pokemones)
        setLista(pokemones)
    }

    return (
        <div>
            <h1>Pokemones</h1>
            <ul>
                {lista.map(item => (
                    <li></li>
                ))}
            </ul>
        </div>
    )
}
export default Fetch;