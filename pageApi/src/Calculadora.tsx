import { useState } from "react";

function Calculadora() {

    const [pantalla, setPantalla] = useState("");

    const agregar = (valor: string) => {
        setPantalla(pantalla + valor);
    };

    const calcular = () => {
        try {
            const resultado = eval(pantalla);
            setPantalla(resultado.toString());
        } catch (error) {
            setPantalla("ERROR");
        }
    };

    const limpiar = () => {
        setPantalla("");
    }

    const estiloBoton = { padding: '15px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px' };

    return (
        <div style={{ width: '260px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h2>Calculadora</h2>
            <input
                type="text"
                value={pantalla}
                readOnly
                style={{ width: '100%', padding: '15px', fontSize: '24px', textAlign: 'right', marginBottom: '10px', boxSizing: 'border-box' }}

            />
            {/* El Teclado */}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>

                {/* Fila 1 */}
                <button onClick={() => agregar('7')} style={estiloBoton}>7</button>
                <button onClick={() => agregar('8')} style={estiloBoton}>8</button>
                <button onClick={() => agregar('9')} style={estiloBoton}>9</button>
                <button onClick={() => agregar('/')} style={{ ...estiloBoton, backgroundColor: '#e0e0e0' }}>/</button>

                {/* Fila 2 */}
                <button onClick={() => agregar('4')} style={estiloBoton}>4</button>
                <button onClick={() => agregar('5')} style={estiloBoton}>5</button>
                <button onClick={() => agregar('6')} style={estiloBoton}>6</button>
                <button onClick={() => agregar('*')} style={{ ...estiloBoton, backgroundColor: '#e0e0e0' }}>*</button>

                {/* Fila 3 */}
                <button onClick={() => agregar('1')} style={estiloBoton}>1</button>
                <button onClick={() => agregar('2')} style={estiloBoton}>2</button>
                <button onClick={() => agregar('3')} style={estiloBoton}>3</button>
                <button onClick={() => agregar('-')} style={{ ...estiloBoton, backgroundColor: '#e0e0e0' }}>-</button>

                {/* Fila 4 */}
                <button onClick={limpiar} style={{ ...estiloBoton, backgroundColor: '#ffb3b3' }}>C</button>
                <button onClick={() => agregar('0')} style={estiloBoton}>0</button>
                <button onClick={calcular} style={{ ...estiloBoton, backgroundColor: '#b3ffb3' }}>=</button>
                <button onClick={() => agregar('+')} style={{ ...estiloBoton, backgroundColor: '#e0e0e0' }}>+</button>
            </div>
        </div>
    )
}
export default Calculadora;