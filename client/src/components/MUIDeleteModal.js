import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import { Box, Button, Grid, Typography  } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography component='h1' variant='h4'>
                            Are you sure you would like to permanently delete the playlist: {name}?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            component='span'
                            m={1}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Button variant='contained' onClick={handleDeleteList}>
                                Confirm
                            </Button>{' '}
                            <Button variant='contained' onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}