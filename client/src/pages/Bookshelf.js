import React, { useEffect, useState} from "react";
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@material-ui/icons/Close";
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Bookshelf() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [listOfShelves, setListOfShelves] = useState([]);
    const [currentShelf, setCurrentShelf] = useState("All");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios.get(`http://localhost:3001/shelves/${id}`).then((response) => {
                setListOfShelves(response.data);
                setFilteredData(response.data);
            });
        }
    }, [id]);

    const changeShelf = (shelf) => {
        if (shelf === "All") {
            setCurrentShelf(shelf)
            axios.get(`http://localhost:3001/shelves/${id}`).then((response) => {
                setListOfShelves(response.data);
                setFilteredData(response.data);
            });
        } else if (shelf === "Want to read") {
            setCurrentShelf(shelf)
            shelf = "want"
            axios.get(`http://localhost:3001/shelves/userrows/${id}/${shelf}`).then((response) => {
                setListOfShelves(response.data);
                setFilteredData(response.data);
            });
        } else {
            setCurrentShelf(shelf)
            axios.get(`http://localhost:3001/shelves/userrows/${id}/${shelf}`).then((response) => {
                setListOfShelves(response.data);
                setFilteredData(response.data);
            });
        }
    }

    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = filteredData.filter((value) => {
            return value.Book.title.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.Book.author.toLowerCase().includes(searchWord.toLowerCase());

        });

        if (searchWord === "") {
            setFilteredData(listOfShelves);
        } else {
            filteredData.slice(0, 15).map((value, key) => {
                return (
                    <a className="dataItem" href={`/books/byId/${value.id}`} target="_blank" rel="noreferrer">
                        <p>{value.title} </p>
                    </a>
                );
            })
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData(listOfShelves);
        setWordEntered("");
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    function TableSearch() {
        return (
            <>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={wordEntered}
                        onChange={handleFilter}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div className="searchIcon">
                    {filteredData.length === listOfShelves.length ? (
                        <></>
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </>
        );
    }

    function createData(id, coverPhoto, title, author, rating, personalRating, shelf, createdAt, bookId) {
        return {
            id,
            coverPhoto,
            title,
            author,
            rating,
            personalRating,
            shelf,
            createdAt,
            bookId,
        };
    }

    const rows = filteredData.map((value) => (
        createData(value.id, value.Book.coverPhoto, value.Book.title, value.Book.author, value.Book.rating, value.personalRating, value.shelf, value.createdAt, value.Book.id)
    ))

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: '',
        },
        {
            id: 'cover',
            numeric: false,
            disablePadding: true,
            label: 'Cover',
        },
        {
            id: 'title',
            numeric: true,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'author',
            numeric: true,
            disablePadding: false,
            label: 'Author',
        },
        {
            id: 'avgRating',
            numeric: true,
            disablePadding: false,
            label: 'Avg rating',
        },
        {
            id: 'rating',
            numeric: true,
            disablePadding: false,
            label: 'My rating',
        },
        {
            id: 'shelf',
            numeric: false,
            disablePadding: true,
            label: 'Shelf',
        },
        {
            id: 'dateAdded',
            numeric: true,
            disablePadding: false,
            label: 'Date Added',
        },
        {
            id: 'actions',
            numeric: true,
            disablePadding: false,
            label: 'Actions',
        },
    ];

    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all books',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align='left'
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const EnhancedTableToolbar = (props) => {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {currentShelf}
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const getBookShelves = () => {
        axios.get(`http://localhost:3001/shelves/${id}`).then((response) => {
                setListOfShelves(response.data);
                setFilteredData(response.data);
            });
    }

    const handleDelete = () => {
        selected.map((shelfId) => (

            axios.delete(`http://localhost:3001/shelves/delete/${shelfId}`, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then(() => {
                getBookShelves();

                setSelected(
                    selected.filter((val) => {
                        return val.id !== shelfId;
                    })
                );
            })
        ));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <main className="w-100">
            <Container sx={{ minHeight: "100vh", maxWidth: '100%' }}>
                <Box sx={{ display: 'flex', p: 8, my: 5, minWidth: 'fit-content' }} className='contentBox rounded-3'>
                    <CssBaseline />
                    <Box flexDirection="column">
                        <Toolbar position="static">
                            <Typography
                                align='left'
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                My Books:
                            </Typography>
                            <TableSearch />
                        </Toolbar>
                        <Divider />
                        <Box sx={{ display: 'flex', minHeight: "100vh" }} maxWidth={"100%"}>
                            <List sx={{ pt: 3 }} >
                                <Typography variant='h6'>Bookshelves</Typography>
                                {['All', 'Read', 'Reading', 'Want to read'].map((text) => (
                                    <ListItem
                                        button
                                        key={text}
                                        onClick={
                                            () => {
                                                changeShelf(text)
                                            }
                                        }
                                    >
                                        <LocalLibraryIcon sx={{ mr: 2 }} />
                                        <ListItemText secondary={text} />
                                    </ListItem>
                                ))}
                            </List>
                            <Box
                                component="main"
                                sx={{ flexGrow: 1, p: 3 }}
                            >
                                <Paper sx={{ width: '100%', mb: 2 }}>
                                    <EnhancedTableToolbar numSelected={selected.length} />
                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size='medium'
                                        >
                                            <EnhancedTableHead
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onSelectAllClick={handleSelectAllClick}
                                                onRequestSort={handleRequestSort}
                                                rowCount={rows.length}
                                            />
                                            <TableBody>
                                                {rows.slice().sort(getComparator(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => {
                                                        let reviewPath = `/review/${row.bookId}/${row.id}/${id}`;
                                                        const isItemSelected = isSelected(row.id);
                                                        const labelId = `enhanced-table-checkbox-${row.id}`;
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                aria-checked={isItemSelected}
                                                                tabIndex={-1}
                                                                key={row.id}
                                                                selected={isItemSelected}
                                                            >
                                                                <TableCell
                                                                    onClick={(event) => handleClick(event, row.id)}
                                                                    padding="checkbox">
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={isItemSelected}
                                                                        inputProps={{
                                                                            'aria-labelledby': labelId,
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left"></TableCell>
                                                                <TableCell
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    <CardMedia
                                                                        component="img"
                                                                        sx={{
                                                                            // 16:9
                                                                            py: 2,
                                                                        }}
                                                                        image={row.coverPhoto}
                                                                        alt="random"
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <Button
                                                                        size="small"
                                                                        onClick={
                                                                            () => {
                                                                                navigate(`/books/byId/${row.bookId}`)
                                                                            }
                                                                        }
                                                                    >{row.title}</Button>
                                                                </TableCell>
                                                                <TableCell align="left">{row.author}</TableCell>
                                                                <TableCell align="left">{row.rating}</TableCell>
                                                                <TableCell align="left">
                                                                    <Rating
                                                                        sx={{ pl: 0, ml: 0 }}
                                                                        name="read-only"
                                                                        value={row.personalRating}
                                                                        readOnly
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left">{row.shelf}</TableCell>
                                                                <TableCell align="left">{moment(row.createdAt).format('DD/MM/YYYY - HH:MM')}</TableCell>
                                                                <TableCell align="left">
                                                                    <Button size="small"
                                                                        onClick={
                                                                            () => {
                                                                                navigate(reviewPath)
                                                                            }
                                                                        }
                                                                    >Review/Rate</Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow
                                                        style={{
                                                            height: 53 * emptyRows,
                                                        }}
                                                    >
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </main>
    );
}


export default Bookshelf;