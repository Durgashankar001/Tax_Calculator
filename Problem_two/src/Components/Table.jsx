import { useToast } from '@chakra-ui/react'
import React from 'react'

const Table = ({ data, getTax }) => {

    const toast = useToast()
    const handleGet = (i) => {
        if (data[i].item_type >= 3) {
            toast({
                title: 'You are Clicking a Amount which has item type more than or equal to 3',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"top",
            })

            return
        }
        const x = data[i].item_type == 0 ? 0.05 : data[i].item_type == 1 ? 0.08 : data[i].item_type == 2 ? 0.12 : null
        if (x) {
            const tax = Number(data[i].amount * x)
            getTax(tax)
        }
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Amount</th>
                        <th>Item_Type</th>
                        <th>Tax_rate</th>
                        <th>Calculate</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((e, i) => {
                            return <tr data-cy="row">
                                <td>{e.sno}</td>
                                <td data-cy="amount">{e.amount}</td>
                                <td data-cy="item-type">{e.item_type}</td>
                                <td>{e.item_type == 0 ? "5%" : e.item_type == 1 ? "8%" : e.item_type == 2 ? "12%" : "NA"}</td>
                                <td><button className='btn' data-cy="submit-btn" onClick={() => handleGet(i)}>Calculate</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table