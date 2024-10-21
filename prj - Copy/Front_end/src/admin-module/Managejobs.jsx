import Navigation from "./Navadmin";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { useSelector } from "react-redux";
import useGetallAdminJobs from "../hooks/useGetAllAdminJobs";
import JobUpdate from "../components/JobUpdate";
import JobAdd from "../components/JobAdd";
import axios from "axios";
import { setAllAdminJobs } from "../redux/jobSlice";

const Managejobs = () => {
  useGetallAdminJobs();

  const { allAdminJobs } = useSelector((store) => store.job);
  let i = 0;

  const handleDelete = async (itemId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/jobs/remove/${itemId}`);
      if (res.data.success) {
        console.log(res.data);
        setAllAdminJobs(allAdminJobs.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <section>
          <JobAdd />
        </section>

        <section style={{ margin: "1rem auto" }}>
          <h2 align="center" style={{ padding: "1rem" }}>
            JobTable
          </h2>
          {allAdminJobs.length >= 0 && (
            <Table
              sx={{
                margin: "0 auto",
                width: "100%",
                fontFamily: "Poppins,Verdana,Arial,sans-serif",
                fontSize: "2.5rem"
              }}
            >
              <TableHead
                sx={{
                  fontWeight: "bold"
                }}
              >
                <TableRow>
                  <TableCell align="left">
                    <b>S.No</b>
                  </TableCell>
                  <TableCell>
                    <b>Creation Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Job Position</b>
                  </TableCell>
                  <TableCell>
                    <b>Company</b>
                  </TableCell>
                  <TableCell>
                    <b>Location</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAdminJobs.map((allAdminJob) => {
                  i++;
                  return (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>
                        {allAdminJob?.createdAt.split("T")[0]}
                      </TableCell>
                      <TableCell>{allAdminJob?.title}</TableCell>
                      <TableCell>{allAdminJob?.company?.name}</TableCell>
                      <TableCell>{allAdminJob?.location}</TableCell>
                      <TableCell>
                        <Stack spacing={1} direction="row">
                          <JobUpdate job={allAdminJob} />
                          <Button
                            onClick={() => {
                              if(window.confirm("Are you sure you want to delete this job?")){
                                let jobId = allAdminJob?._id;
                                return handleDelete(jobId);
                              }
                              
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
    </>
  );
};

export default Managejobs;