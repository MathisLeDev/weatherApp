import React, { Component } from 'react'

function SuggestionComponents(suggestion) {
   const test = () => {
       let test = "";
       console.log(suggestion);
       for (const suggestionKey of suggestion.suggestion) {
           console.log(suggestionKey.name)

       }
   }
    return (
        <>
            <div>SuggestionComponents</div>
            {suggestion.suggestion.map(value => (
                <li key={value.name} value={value.name} >
                    {value.name}
                </li>
            ))}
        </>
    )
  
}

export default SuggestionComponents