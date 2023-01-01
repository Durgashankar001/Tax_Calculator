import React, { useState, useRef, useEffect } from 'react';
import { CSVLink } from "react-csv";
import { GrFormUpload } from "react-icons/gr"
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import { IconContext } from "react-icons";

import {
    useCSVReader,
    lightenDarkenColor,
    formatFileSize,
} from 'react-papaparse';


const styles = {
    zone: {
        width: '250px',
        marginTop: '15px',
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 10,
        cursor: "pointer",
        backgroundColor: "rgb(7, 78, 154)",
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
        border: '1px solid rgb(4, 123, 250)',
        color: "white",
    },
    remove: {
        borderRadius: 0,
        padding: '0 20px',
    },
};

export default function CSVReader() {

    //All States Manage here
    const { CSVReader } = useCSVReader();
    const [myData, setMydata] = useState([])
    const [loading, setLoading] = useState(false)
    const fileRef = useRef(null)

    useEffect(() => {
        setLoading(false)
    }, [fileRef])

    //Main function to add the tax on the data
    const convertJSON = (data) => {
        setLoading(false)
        let res = []
        res.push(["s.no", "amount", "item_type", "tax"])
        if (data) {
            for (let i = 1; i < data.length; i++) {
                if (data[i].length == 3) {
                    if (data[i][2] == 0) {
                        res.push([...data[i], Math.floor(Number(data[i][1]) * 0.05)])
                    } else if (data[i][2] == 1) {
                        res.push([...data[i], Math.floor(Number(data[i][1]) * 0.08)])
                    }
                    else if (data[i][2] == 2) {
                        res.push([...data[i], Math.floor(Number(data[i][1]) * 0.12)])
                    } else {
                        res.push([...data[i], "NA"])
                    }
                }
            }
        }
        setMydata(res)
        setLoading(true)

    }
    // Handle remove function to remove file from the csv upload
    const handleRemove = () => {
        setLoading(false)
        setMydata([])
    }
    return (
        <div>
            <div className='flex_item'>
                <CSVReader
                    innerRef={fileRef}
                    onUploadAccepted={(results) => {
                        convertJSON(results.data)
                    }}
                    noDrag
                >
                    {({
                        getRootProps,
                        acceptedFile,
                        getRemoveFileProps,
                    }) => (
                        <>
                            <div
                                {...getRootProps()}
                                style={styles.zone}
                            >
                                {acceptedFile ? (
                                    <>
                                        <div className='flex_text'>
                                            <span style={styles.name}>{acceptedFile.name}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p>Click to upload <IconContext.Provider value={{ className: 'react-icons' }}> <BsFillArrowUpCircleFill size={25} color={"white"}/></IconContext.Provider> </p>
                                )}
                            </div>
                            {acceptedFile && <button {...getRemoveFileProps()} className="btn2"
                                onClick={(event) => {
                                    getRemoveFileProps().onClick(event);
                                    setLoading(false)
                                    setMydata([])
                                }}
                            >
                                upload new
                            </button>}
                        </>
                    )}

                </CSVReader>
            </div>
            <div className='download'>
                {loading && <CSVLink filename={"result.csv"}
                    className="btn"
                    target="_blank" data={myData}>Download file  <IconContext.Provider value={{ className: 'react-icons' }}> <BsFillArrowDownCircleFill size={25} color={"white"}/></IconContext.Provider></CSVLink>}
            </div>
        </div>
    );
}