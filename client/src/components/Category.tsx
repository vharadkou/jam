import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { Category as CategoryDate } from 'stores/categories.store';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: 0,
            '& .MuiExpansionPanel-root.Mui-expanded': {
                margin: 0,
            }
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    })
);


export const Category = ({ category, onSelectValue }: { category: CategoryDate, onSelectValue: (valueID: string) => void }) => {
    const classes = useStyles();

    return (
        <ListItem
            className={classes.root}
            key={category.category}
            button
        >
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{category.category}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {category.values.map((value) => (
                            <React.Fragment>
                                <ListItem
                                    button
                                    key={value.id}
                                    onClick={() => onSelectValue(value.id)}// replase on id
                                >
                                    <Typography  >{value.data}</Typography>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </ListItem>
    );
};

