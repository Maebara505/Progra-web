import { useState, ChangeEvent } from "react";

function Addition() {
    // 1. Tipado de estados: definimos que aceptan strings (del input)
    const [firstNumber, setFirstNumber] = useState<string>("");
    const [secondNumber, setSecondNumber] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    // 2. Función en inglés y con lógica de suma
    const handleAddition = (): void => {
        const sum = Number(firstNumber) + Number(secondNumber);
        setResult(sum);
        alert(`The result is: ${sum}`);
    };

    // 3. Manejadores de eventos tipados (opcional pero recomendado en TS)
    const handleFirstNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstNumber(e.target.value);
    };

    const handleSecondNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSecondNumber(e.target.value);
    };

    return (
        <div>
            <h2>Simple Addition</h2>
            
            <input
                type="number"
                placeholder="Enter number 1"
                value={firstNumber}
                onChange={handleFirstNumberChange}
            />
            <br /><br />
            
            <input
                type="number"
                placeholder="Enter number 2"
                value={secondNumber}
                onChange={handleSecondNumberChange}
            />
            <br /><br />
            
            <button onClick={handleAddition}>Add Numbers</button>

            {result !== null && (
                <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
                    Result: {result}
                </p>
            )}
        </div>
    );
}

export default Addition;