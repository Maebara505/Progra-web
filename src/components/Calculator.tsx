import { useState } from "react";

function Calculator() {
    // State in English with explicit string typing
    const [displayValue, setDisplayValue] = useState<string>("");

    // Typed functions
    const handleAppend = (value: string): void => {
        setDisplayValue((prev) => prev + value);
    };

    const handleCalculate = (): void => {
        try {
            // eslint-disable-next-line no-eval
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
            
            {/* Pantalla de la calculadora con su clase CSS */}
            <input
                type="text"
                value={displayValue}
                readOnly
                className="calc-display" 
            />
            
            {/* El Teclado con la clase CSS mágica que arma la cuadrícula */}
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