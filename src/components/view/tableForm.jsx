import React from 'react'
import styled from 'styled-components';
import TableNameInput from './tableNameInput';
import TableField from './tableField';
import TableInput from './tableInput';
import Draggable from 'react-draggable';
import { tablesState } from '../../state/initialState';

const CustomTable = styled.div`
  height: auto;
  margin: 0 auto;
  min-width: 550px;
  max-width: 1000px;
  position: relative;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 50%;
  left: 18%;
`;

const TableFooter = styled.div`
  border-top: 1px solid rgba(0,0,0,0.2);
  height: auto;
  margin: 0 auto;
  min-width: 700px;
  max-width: 1000px;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;


const TableHeader = styled.div`
  height: 15px;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
  background: rgba(50,67,83,1);
`;

const FadeThePage = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(90, 90, 90, 0.5);
`;

const Button = styled.span`
  height: auto;
  font-size: .85em;
  font-weight: 300;
  margin: 8px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 10px 0px;
  border-radius: 5px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  background-color: rgba(50, 67, 83, 0.85);
  color: white;
  width: 30%;
  text-align: center;
  &:hover {
    background-color: #DD399C;
  }
`;

const CloseButton = styled.span`
  font-size: 1em;
  margin: 5px;
  padding: 5px;
  color: white;
  &:hover {
    color: #DD399C;
    cursor: pointer;
  }
`;

const Buttons = styled.span`
  float: right;
  margin-right: 5px;
`;

function TableForm({
  setPopUp,
  setTables,
  setSelectedTable,
  selectedTable,
  tableIndexState,
  setTableIndexState,
  tables
}) {

  //Creating Table Inputs (these are fields)
  const fieldInputs = [];
  const createTableInputs = () => {
    const fields = Object.keys(selectedTable.fields);
    for (let i = 0; i < fields.length; i++) {
      const currentFieldKey = fields[i];
      fieldInputs.push(
        <TableInput
          field={selectedTable.fields[currentFieldKey]}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          fieldIndex={selectedTable.fieldIndex}
          key={i}
        />);
    }
  }
  createTableInputs();

  return (
    <FadeThePage>
      <Draggable handle="#header">
        <CustomTable>
          <TableHeader id="header" style={{ cursor: "move" }} setPopUp={setPopUp}>
            <Buttons>
              <CloseButton onClick={() => { setPopUp('') }}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </Buttons>
          </TableHeader>
          <TableNameInput
            name={selectedTable.type}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
          <Table id='table' >
            <tbody>
              <TableField />
              {fieldInputs}
            </tbody>
          </Table>
          <TableFooter>
            <Button>
              <i className="fas fa-plus" /> Add Field
            </Button>
            <Button
              onClick={e => {
                setTables({ ...tables, [selectedTable.tableID]: selectedTable });
                setTableIndexState(tableIndexState + 1);
              }}>
              <i className="far fa-save" color="black" /> Save
            </Button>
          </TableFooter>
        </CustomTable>
      </Draggable >
    </FadeThePage>
  )
}


export default TableForm;