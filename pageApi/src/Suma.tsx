import { useState } from "react";

function Suma() {

    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");

    const sumar = () => {
        const resultado = Number(number1) + Number(number2);
        alert("La suma es: " + resultado);

    };

    return (
        <div>
            <input
                type="number"
                placeholder="Pon el número 1"
                onChange={(e) => setNumber1(e.target.value)}
            />
            <br />
            <br />
            <input
                type="number"
                placeholder="Pon el número 2"
                onChange={(e) => setNumber2(e.target.value)}
            />
            <br />
            <br />
            <button onClick={sumar}>Sumar</button>
        </div>

    );

}

export default Suma;