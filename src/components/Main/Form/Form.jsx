import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment';
import { useSpeechContext } from '@speechly/react-client';

import { incomeCategories, expenseCategories } from '../../../constants/categories'

import useStyles from './style';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: moment(new Date()).format('yyyy-MM-DD')
}

function Form() {

    const classes = useStyles();
    const [formData, setFormData] = useState(initialState)

    const { addTransaction  } = useContext(ExpenseTrackerContext);

    const { segment } = useSpeechContext();

    const createTransaction = () => {
        const transaction = {...formData, amount: Number(formData.amount), id: uuidv4() }
        addTransaction(transaction);
        setFormData(initialState);
    }

    const selectedCategorie = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && (
                        <>
                            {segment.words.map((word) => word.value).join(" ")}
                        </>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategorie.map((item, index) => (
                            <MenuItem value={item.type} key={index}>{item.type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })} value={formData.amount} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth onChange={(e) => setFormData({ ...formData, date: moment(e.target.value).formData('yyyy-MM-DD') })} value={formData.date} />
            </Grid>
            <Button 
                className={classes.button} 
                variant="outlined" 
                color="primary" 
                fullWidth
                onClick={createTransaction}
            >Create</Button>
        </Grid>
    )
}

export default Form
