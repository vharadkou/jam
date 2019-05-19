import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MaterialUIPickers } from './MaterialUIPickers';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            // display: 'flex',
            // justifyContent: 'space-between',
            // flexDirection: 'row',
        },
        field: {
            marginLeft: theme.spacing(2),
            '& .MuiFormControl-root': {
                width: '320px',
            },
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
    console.log('FFFF', requestName)

    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <TextField
                    key='request'
                    label="Услуга"
                    value={requestName.value}
                    disabled={requestName.disabled}
                    onChange={handleChange('requestName')}
                />
            </div>
            <div className={classes.field}>
                <TextField
                    key='description'
                    label="Описание"
                    rowsMax="5"
                    multiline
                    value={description.value}
                    disabled={description.disabled}
                    onChange={handleChange('description')}
                />
            </div>
            <div>
                <MaterialUIPickers
                    key='endDate'
                    dateLabel="Ожидаямая дата"
                    timeLabel="Ожидаемое время"
                    handleDateChange={handleChange('preferredTime')}
                    selectedDate={preferredTime}
                ></MaterialUIPickers>
            </div>
        </div >
    );
};
