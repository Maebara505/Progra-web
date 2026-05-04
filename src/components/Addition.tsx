import { useState, ChangeEvent } from "react";

function Addition() {
    const [firstNumber, setFirstNumber] = useState<string>("");
    const [secondNumber, setSecondNumber] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    const handleAddition = (): void => {
        const sum = Number(firstNumber) + Number(secondNumber);
        setResult(sum);
        alert(`The result is: ${sum}`);
    };

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