import { useSelector } from "react-redux";
import ReactDataTables from "./ReactDataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

const columns = [
  { data: "name", title: "Name" },
  { data: "age", title: "Age" },
  { data: "gender", title: "Gender" },
  { data: "mobile", title: "Mobile" },
  { data: "govIdType", title: "Gov Id Type" },
  { data: "govtId", title: "Gov Id" },
  { data: "userAddress", title: "Full Address" },
];

const EmployeeTable = () => {
  const { formData } = useSelector((state: any) => state.formReducer)

  console.log(formData, 'formData');

  return (
    <>
      <div className="mt-5">
        <ReactDataTables data={formData} columns={columns} />
      </div>
    </>
  );
};

export default EmployeeTable;