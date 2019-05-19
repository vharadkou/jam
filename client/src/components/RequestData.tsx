import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MaterialUIPickers } from './MaterialUIPickers';
import { AddressInput } from './AdressInput';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {},
        field: {
            marginLeft: theme.spacing(2),
            '& .MuiFormControl-root': {
                width: '100%',
            },
        },
    })
);

export const RequestData = ({
    handleChange,
    requestName,
    description,
    preferredTime,
    apartmentNumber,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.field}>
                <TextField
                    key='request'
                    label={requestName.value && requestName.disabled ? '' : 'Услуга'}
                    rowsMax="2"
                    multiline
                    value={requestName.value}
                    disabled={requestName.disabled}
                    onChange={handleChange('requestName')}
                />
            </div>
            <div className={classes.field}>
                <TextField
                    key='description'
                    label="Описание"
                    variant="outlined"
                    rowsMax="5"
                    multiline
                    value={description.value}
                    disabled={description.disabled}
                    onChange={(e) => handleChange('description')(e.target.value)}
                />
            </div>
            <div className={classes.field}>
                <MaterialUIPickers
                    key='endDate'
                    dateLabel="Ожидаямая дата"
                    timeLabel="Ожидаемое время"
                    handleDateChange={handleChange('preferredTime')}
                    selectedDate={preferredTime}
                ></MaterialUIPickers>
            </div>
            <div className={classes.field}>
                <AddressInput onChange={handleChange('address')}
                ></AddressInput>
            </div>
            <div className={classes.field}>
                <TextField
                    key='apartmentNumber'
                    label="Номер квартиры"
                    variant="outlined"
                    value={apartmentNumber}
                    onChange={(e) => handleChange('apartmentNumber')(e.target.value)}
                />
            </div>
        </div >
    );
};
