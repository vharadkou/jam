import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
        },
    })
);

export const Popular = observer(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    );
});
