'use client';

import { useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

// project import
import AddStory from 'components/application/kanban/Backlogs/AddStory';
import UserStory from 'components/application/kanban/Backlogs/UserStory';
import ItemDetails from 'components/application/kanban/Board/ItemDetails';
import { dispatch, useSelector } from 'store';
import { updateStoryOrder, updateStoryItemOrder } from 'store/slices/kanban';
import Container from 'components/application/kanban/Container';

// assets
import AddIcon from '@mui/icons-material/Add';

const getDropWrapper = (isDraggingOver, theme) => ({
  background: isDraggingOver ? alpha(theme.palette.secondary.light, 0.5) : 'transparent'
});

// ==============================|| KANBAN - BACKLOGS ||============================== //

const Backlogs = () => {
  const theme = useTheme();
  const kanban = useSelector((state) => state.kanban);
  const { userStory, userStoryOrder } = kanban;

  const onDragEnd = (result) => {
    let newUserStory;
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'user-story') {
      const newUserStoryOrder = Array.from(userStoryOrder);

      newUserStoryOrder.splice(source.index, 1); // remove dragged column
      newUserStoryOrder.splice(destination?.index, 0, draggableId); // set column new position
      dispatch(updateStoryOrder(newUserStoryOrder));
      return;
    }

    // find dragged item's column
    const sourceUserStory = userStory.filter((story) => story.id === source.droppableId)[0];

    // find dropped item's column
    const destinationUserStory = userStory.filter((story) => story.id === destination.droppableId)[0];

    // if - moving items in the same list
    // else - moving items from one list to another
    if (sourceUserStory === destinationUserStory) {
      const newItemIds = Array.from(sourceUserStory.itemIds);

      // remove the id of dragged item from its original position
      newItemIds.splice(source.index, 1);

      // insert the id of dragged item to the new position
      newItemIds.splice(destination.index, 0, draggableId);

      // updated column
      const newSourceUserStory = {
        ...sourceUserStory,
        itemIds: newItemIds
      };

      newUserStory = userStory.map((story) => {
        if (story.id === newSourceUserStory.id) {
          return newSourceUserStory;
        }
        return story;
      });
    } else {
      const newSourceItemIds = Array.from(sourceUserStory.itemIds);

      // remove the id of dragged item from its original column
      newSourceItemIds.splice(source.index, 1);

      // updated dragged items's column
      const newSourceUserStory = {
        ...sourceUserStory,
        itemIds: newSourceItemIds
      };

      const newDestinationItemIds = Array.from(destinationUserStory.itemIds);

      // insert the id of dragged item to the new position in dropped column
      newDestinationItemIds.splice(destination.index, 0, draggableId);

      // updated dropped item's column
      const newDestinationSourceUserStory = {
        ...destinationUserStory,
        itemIds: newDestinationItemIds
      };

      newUserStory = userStory.map((story) => {
        if (story.id === newSourceUserStory.id) {
          return newSourceUserStory;
        }
        if (story.id === newDestinationSourceUserStory.id) {
          return newDestinationSourceUserStory;
        }
        return story;
      });
    }

    dispatch(updateStoryItemOrder(newUserStory));
  };

  // drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const addStory = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <Container>
      <TableContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="user-story" type="user-story">
            {(provided, snapshot) => (
              <Table
                size="small"
                aria-label="collapsible table"
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={getDropWrapper(snapshot.isDraggingOver, theme)}
              >
                <TableHead sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
                  <TableRow>
                    <TableCell sx={{ pl: 3 }}>
                      <Tooltip title="Add User Story">
                        <Button variant="contained" size="small" color="secondary" onClick={addStory} endIcon={<AddIcon />}>
                          ADD
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell />
                    <TableCell>State</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Due Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
                  {userStoryOrder.map((storyId, index) => {
                    const story = userStory.filter((item) => item.id === storyId)[0];
                    return <UserStory key={story.id} story={story} index={index} />;
                  })}
                  {provided.placeholder}
                </TableBody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
        <AddStory open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
        <ItemDetails />
      </TableContainer>
    </Container>
  );
};

export default Backlogs;
