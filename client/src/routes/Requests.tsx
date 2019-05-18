import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useStore } from 'stores';
import { Value } from 'stores/categories.store';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
        },
    })
);

export const Requests = observer(({ match: { params: { categoryName } } }: any) => {
    const classes = useStyles();
    const { categoriesStore, routerStore } = useStore();
    const { categories, isLoading } = categoriesStore

    useEffect(() => {
        if (!isLoading && categories === null) {
            categoriesStore.load('categories');
        }
    }, [categoriesStore, isLoading, categories])

    let requests: any = []
    if (!isLoading && categories !== null) {
        const selectedCategory = categories.find((category) => category.category === categoryName);
        requests = selectedCategory ? selectedCategory.values : [];
    }

    const handleClick = useCallback((categoryId: string) => {
        routerStore.push(`/request/create/${categoryId}`);
    }, [routerStore])

    return (
        <div className={classes.root}>
            {requests.map((request: Value) => (
                <Card
                    key={request.id}
                >
                    <CardActionArea
                        onClick={() => handleClick(request.id)}
                    >
                        <CardContent>
                            {request.data}
                            <Divider />
                            <div>
                                {`${request.cost} BYN`}
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
});
