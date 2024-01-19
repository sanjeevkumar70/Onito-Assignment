import './datatable.css'
import { homePattern } from '../../route';
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "datatables.net-dt/css/jquery.dataTables.css";
import DataTables, { Config } from "datatables.net-dt";

export function ReactDataTables({ ...props }: Config) {
  const navigate = useNavigate();
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const dt = new DataTables(tableRef.current!, props);
    return () => {
      dt.destroy();
    };
  }, []);

  return (
    <div className="mx-4 border py-5 px-3 table-box">
        <div className='personal-form-btn1'>
          <button onClick={() => navigate(homePattern)}>
            <i className="fa-solid fa-house"></i>
          </button>
        </div>
      <table ref={tableRef}>
      </table>
     
    </div>);
}

export default ReactDataTables;