import { LoadingButton } from '@mui/lab';
import {
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Spinner, TableRowEmpty } from 'components';
import Container from 'containers/Container';
import { useSearch } from 'hooks';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { systemSelector } from 'reducers/system';
import { dashboardService, queryClient } from 'services';

const Dashboard = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState('');
  const { id, nftContractAddress } = useSelector(systemSelector);
  const [dataSearch, onSearchChange] = useSearch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsDisabled(!value);
  };

  const { data, isFetching, refetch } = useQuery(['dashboardService.fetchUsers', dataSearch], () =>
    dashboardService.fetchUsers(dataSearch),
  );
  const { items = [], total, currentPage, pages: totalPage } = data ?? {};

  const { mutate: updateSystem, isLoading } = useMutation(dashboardService.updateSystem, {
    onSuccess: () => {
      enqueueSnackbar('Update system successfully', { variant: 'success' });
      setIsDisabled(true);
    },
  });

  const handleClick = () => {
    updateSystem({ id, nftContractAddress: value });
  };

  const { mutate: updateUser } = useMutation(dashboardService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('dashboardService.fetchUsers');
      refetch();
    },
  });

  return (
    <>
      <Container>
        <div className='flex items-center gap-5'>
          <TextField
            id='outlined-basic'
            label='Contract Address'
            variant='outlined'
            defaultValue={nftContractAddress}
            onChange={handleChange}
          />
          <LoadingButton
            className='text-sm'
            variant='contained'
            color='primary'
            disabled={isDisabled}
            onClick={handleClick}
            loading={isLoading}
          >
            Update
          </LoadingButton>
        </div>
      </Container>

      <TableContainer component={Paper}>
        <Spinner loading={isFetching}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>IsAdmin</TableCell>
                <TableCell>Deactivated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell className='text-center'>
                    <Switch
                      checked={user.isAdmin}
                      onClick={() => {
                        updateUser({ id: user.id, isAdmin: !user.isAdmin });
                      }}
                    />
                  </TableCell>
                  <TableCell className='text-center'>
                    <Switch
                      color='error'
                      checked={user.deactivated}
                      onClick={() => {
                        updateUser({ id: user.id, deactivated: !user.deactivated });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isFetching && items.length === 0} />
            </TableBody>
            <caption className='font-bold border-t'>{total ?? 0} Accounts</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <div className='flex justify-center'>
        <Pagination
          page={currentPage ?? 1}
          count={totalPage}
          onChange={(event, value) => onSearchChange({ page: value })}
        />
      </div>
    </>
  );
};

export default Dashboard;
