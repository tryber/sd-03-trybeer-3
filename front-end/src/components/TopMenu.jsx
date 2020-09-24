import React from 'react';

function TopMenu(props) {
    return (
        <div >
            <img data-testid="top-hamburguer" /> 
           <h1 data-testid="top-title">{props.title}</h1>           
        </div>
    )
}

export default TopMenu;
