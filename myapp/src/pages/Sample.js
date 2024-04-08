import { Button, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';

const Sample = () => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const firstTableData = { account_id: 123, account_name: 'hoge123aaa', campaign_id: 456, campaign_name: 'fuga3333'};
  const secondTableData = [
    { key: 1111, URL: 'https://hoge.com/234', cv1: 5, cv2: 1, cv3: 0 },
    { key: 2222, URL: 'https://hoge.com/123', cv1: 51, cv2: 0, cv3: 0 },
    { key: 3333, URL: 'https://hoge.com/567', cv1: 23, cv2: 0, cv3: 2 },
  ];
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // const handleButtonClick = () => {
  //   setOpenSnackbar(true);
  // };

  const handleSelectChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const [decomposed, setDecomposed] = useState(false);
  const [decomposedHeaders, setDecomposedHeaders] = useState([]);
  const [decomposedData, setDecomposedData] = useState({});

  const filteredData = selectedColumn
  ? secondTableData.filter(data => Object.values(data).some(value => value.toString().includes(decomposed ? decomposedData[selectedColumn] : firstTableData[selectedColumn])))
  : secondTableData;

  const [decomposeMode, setDecomposeMode] = useState(1);
  const [decomposeParam, setDecomposeParam] = useState('');

  const handleDecomposeClick = () => {
    const newHeaders = [];
    const newData = {};

    Object.entries(firstTableData).forEach(([key, value]) => {
      let parts;
      switch (decomposeMode) {
        case 1:
          parts = value.toString().match(/\d+|\D+/g);
          break;
        case 2:
          const index = parseInt(decomposeParam, 10);
          parts = [value.toString().slice(0, index), value.toString().slice(index)];
          break;
        case 3:
          const splitIndex = value.toString().indexOf(decomposeParam);
          parts = splitIndex !== -1
            ? [value.toString().substring(0, splitIndex + decomposeParam.length), value.toString().substring(splitIndex + decomposeParam.length)]
            : [value.toString()];
          break;
        default:
          return;
      }
      parts.forEach((part, index) => {
        newHeaders.push(`${key}_${index + 1}`);
        newData[`${key}_${index + 1}`] = part;
      });
    });

    setDecomposedHeaders(newHeaders);
    setDecomposedData(newData);
    setDecomposed(true);
    setSelectedColumn(null);  // フィルタリングを解除
  };

  const handleButtonClick = () => {
    if (filteredData.length === 1) {
      // 登録処理
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 2000);
    }
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} p={10}>
      <Typography variant="h6" sx={{ mt: 5 }}>マッピングパターン登録</Typography>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Select value={decomposeMode} onChange={(e) => { setDecomposeMode(e.target.value); setDecomposeParam(''); }}>
            <MenuItem value={1}>パターン1: 文字｜数字</MenuItem>
            <MenuItem value={2}>パターン2: 文字数</MenuItem>
            <MenuItem value={3}>パターン3: キーワード</MenuItem>
          </Select>
          {(decomposeMode === 2 || decomposeMode === 3) && (
            <TextField
              type={decomposeMode === 2 ? 'number' : 'text'}
              value={decomposeParam}
              onChange={(e) => setDecomposeParam(e.target.value)}
              InputProps={decomposeMode === 2 ? { inputProps: { min: 0, max: 99 } } : {}}
            />
          )}
          <Button variant="contained" onClick={handleDecomposeClick}>分解</Button>
        </Grid>
        <Grid item>
          <Select value={selectedColumn} onChange={handleSelectChange}>
            {(decomposed ? decomposedHeaders : Object.keys(firstTableData)).map((key) => (
              <MenuItem value={key} key={key}>{key}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" disabled={filteredData.length !== 1} onClick={handleButtonClick}>登録</Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            message="登録しました！"
          />
        </Grid>
      </Grid>
      {decomposed ? (
        <TableContainer component={Paper} sx={{ mt: 5, backgroundColor: 'lightpink' }}>
          <Table>
            <TableHead>
              <TableRow>
                {decomposedHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.values(decomposedData).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 5, backgroundColor: 'lightblue' }}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(firstTableData).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.values(firstTableData).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TableContainer component={Paper} sx={{ mt: 5, backgroundColor: 'lightgreen' }}> {/* マージンを追加 */}
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(secondTableData[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.key}>
                {Object.entries(row).map(([key, value]) => (
                  <TableCell
                    key={key}
                    style={value.toString().includes(decomposed ? decomposedData[selectedColumn] : firstTableData[selectedColumn]) ? { backgroundColor: 'yellow' } : {}}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Sample;