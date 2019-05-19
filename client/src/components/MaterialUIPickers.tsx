import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
    grid: {
        width: '60%',
    },
};

class MaterialUIPickersComponent extends React.PureComponent<{
    classes?, handleDateChange, selectedDate, dateLabel, timeLabel,
}, any> {
    render() {
        const { classes, handleDateChange, selectedDate, dateLabel, timeLabel } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                    <DatePicker
                        key={'datePicker1'}
                        margin="normal"
                        format="yyyy-MM-dd"
                        label={dateLabel}
                        variant="outlined"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <TimePicker
                        key={'datePicker2'}
                        margin="normal"
                        variant="outlined"
                        ampm={false}
                        label={timeLabel}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

export const MaterialUIPickers = withStyles(styles)(MaterialUIPickersComponent);