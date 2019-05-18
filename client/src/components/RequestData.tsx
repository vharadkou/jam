import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { MaterialUIPickers } from './MaterialUIPickers';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
    })
);

export const RequestData = ({
    handleChange,
    requestName,
    description,
    preferredTime,
}) => {
    const classes = useStyles();

    return (
        <form className={classes.root}>
            <TextField
                key={'request'}
                label="Услуга"
                value={requestName.value}
                disabled={requestName.disabled}
                onChange={handleChange('requestName')}
            ></TextField>
            <TextField
                key={'description'}
                label="Описание"
                rowsMax="5"
                multiline
                value={description.value}
                disabled={description.disabled}
                onChange={handleChange('description')}
            ></TextField>
            <MaterialUIPickers
                key={'endDate'}
                dateLabel="Ожидаямая дата"
                timeLabel="Ожидаемое время"
                handleDateChange={handleChange('preferredTime')}
                selectedDate={preferredTime}
            ></MaterialUIPickers>
        </form >
    );
};
