import React from 'react'
import CSVReader from './CsvReader'

const Body = () => {
    return (
        <div className='flex'>
            <div className='main'>
                <div>
                    <h1>Calculate Your <span className='big'>TAX</span>  </h1>
                    <h1>in one click !</h1>
                    <h3>STEPS:</h3>
                    <ul>
                        <li>You have to UPLOAD your .csv tax file by clicking the button.</li>
                        <li>Then we process your data and give you the same .csv file as OUTPUT with your TAX.</li>
                        <li>You are welcome ! Now you can download your file.</li>
                    </ul>
                    
                </div>
            </div>
            <div className='right'>
            <CSVReader/>
            </div>
        </div>
    )
}

export default Body