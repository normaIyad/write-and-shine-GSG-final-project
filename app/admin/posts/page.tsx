"use client";
import { useRouter } from "next/navigation.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Link from "next/link.js";
import { AiFillDelete } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import { PinchOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";

const Page = () => {
  const [data, setData] = useState([]);
  const navigate = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const imageBodyTemplate = (rowData: any) => (
    <Avatar alt={rowData.author_name} src={rowData.author_image} />
  );

  const actionTemplate = (rowData: any) => (
    <div className="flex gap-2">
      <Link href={`/posts/${rowData.id}/edit`}>
        <Button
          icon={<PinchOutlined />}
          className="p-button-text p-button-info"
          label="Edit"
        />
      </Link>
      <Button
        icon={<AiFillDelete size={16} />}
        className="p-button-text p-button-danger"
        label="Delete"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  const handleDelete = async (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/posts/${id}`, {});
          Swal.fire("Deleted!", "Pharmacy has been deleted.", "success");
          fetchData(); // Refresh data after deletion
        } catch (error) {
          console.error("Error deleting pharmacy:", error);
        }
      }
    });
  };
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Posts</h1>
      <DataTable
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        emptyMessage="No Post found."
      >
        <Column field="id" header="#ID" sortable />
        <Column field="title" header="Title" sortable />
        <Column field="content" header="Content" />
        <Column header="User Image" body={imageBodyTemplate} />
        <Column field="author_name" header="Username" sortable />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default Page;
