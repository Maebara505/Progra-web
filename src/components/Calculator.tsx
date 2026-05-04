import { useState } from "react";

function Calculator() {
    const [displayValue, setDisplayValue] = useState<string>("");

    const handleAppend = (value: string): void => {
        setDisplayValue((prev) => prev + value);
    };

    const handleCalculate = (): void => {
        try {
            const result = eval(displayValue);
            setDisplayValue(String(result));
        } catch (error) {
            setDisplayValue("ERROR");
        }
    };

    const handleClear = (): void => {
        setDisplayValue("");
    };

    return (
        <div style={{ maxWidth: '320px', margin: '0 auto' }}>
            <h2>Calculator</h2>
            

            <input
                type="text"
                value={displayValue}
                readOnly
                className="calc-display" 
            />
            

            <div className="calculator-grid">
                
                {/* Fila 1 */}
                <button onClick={() => handleAppend('7')}>7</button>
                <button onClick={() => handleAppend('8')}>8</button>
                <button onClick={() => handleAppend('9')}>9</button>
                <button onClick={() => handleAppend('/')} style={{ backgroundColor: 'var(--calc-clear)' }}>/</button>

                {/* Fila 2 */}
                <button onClick={() => handleAppend('4')}>4</button>
                <button onClick={() => handleAppend('5')}>5</button>
                <button onClick={() => handleAppend('6')}>6</button>
                <button onClick={() => handleAppend('*')} style={{ backgroundColor: 'var(--calc-clear)' }}>*</button>

                {/* Fila 3 */}
                <button onClick={() => handleAppend('1')}>1</button>
                <button onClick={() => handleAppend('2')}>2</button>
                <button onClick={() => handleAppend('3')}>3</button>
                <button onClick={() => handleAppend('-')} style={{ backgroundColor: 'var(--calc-clear)' }}>-</button>

                {/* Fila 4 */}
                <button onClick={handleClear} style={{ backgroundColor: 'var(--poke-red)', color: 'white' }}>C</button>
                <button onClick={() => handleAppend('0')}>0</button>
                <button onClick={handleCalculate} style={{ backgroundColor: 'var(--calc-equal)' }}>=</button>
                <button onClick={() => handleAppend('+')} style={{ backgroundColor: 'var(--calc-clear)' }}>+</button>
            </div>
        </div>
    );
}

export default Calculator;