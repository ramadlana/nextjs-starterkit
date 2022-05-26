import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Modal from "../../components/Modal";
import EditUser from "../../components/form/EditUser";
import { useStore } from "../../state/globalState";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import utc from "dayjs/plugin/utc";
import GeneratePayment from "../../components/form/GeneratePayment";
import PaymentHistory from "../../components/form/PaymentHistory";
import ModalNoFooter from "../../components/ModalNoFooter";
import LayoutCustomer from "../../components/LayoutCustomer";
dayjs.extend(utc);
dayjs.extend(timezone);

// Fethcer Axios
const fetcherAxios = async (...args) =>
  axios
    .get(...args)
    .then((res) => res)
    .catch((err) => (err.response ? err.response : err));

export default function Me() {
  const { back } = useRouter();
  // Zustand state consume
  const formData = useStore((state) => state.addSubsFormState);
  // backup form data, in case failur, set state to this backup
  const backup_form_data = { ...formData };
  const setFormData = useStore((state) => state.setAddSubsFormState);

  // Payment History State

  const set_payment_history = useStore((state) => state.set_payment_history);

  // Load localstorage key from next JS is unique
  // Because is server rendered component in first , to localstorage is not available, because localstorage is browser only
  let access_token;
  let queryID;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    access_token = localStorage.getItem("access_token");
    const decoded = jwt_decode(access_token);
    queryID = decoded.id;
  }

  console.log(queryID);
  // Get data using SWR
  const { data, error } = useSWR(
    [
      `${process.env.BACKEND_SERVER}/dashboard/radiususer_me/${queryID}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access_token": access_token,
        },
      },
    ],
    fetcherAxios
  );

  // setFormData(data?.data?.user);

  // If data not received yet (loading in fetch)
  if (!data)
    return (
      <>
        <div className="container">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm mx-3 "
              role="status"
              aria-hidden="true"
            />
            Loading data...
          </button>
        </div>
      </>
    );

  // If error Syntax and SWR
  if (error) return <h1>another error happen: {JSON.stringify(error)}</h1>;

  // If return status code 401 Unauthorized
  if (data.status === 401)
    return (
      <>
        <div className="container">
          <div className="alert alert-warning" role="alert">
            You dont have permission to access this page: {data.data.message}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/user/login")}
          >
            Sign in to Access
          </button>
        </div>
      </>
    );

  // If not have status code. for Ex: network error / Others Error
  if (!data.status)
    return (
      <div>
        <div className="container">
          <h2>
            Failed {data.message} {data.config.url}
          </h2>
        </div>
      </div>
    );

  // If data.user not found
  if (!data.data.user) return <h4>user not found</h4>;

  // handleSubmit Form
  const handleSubmitEditUser = async () => {
    const editedData = {
      id: formData.id,
      username: formData.username,
      email: formData.email,
      address: formData.address,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      services_id: formData.services_id,
    };
    toast.info("Editing Data.. Please wait");
    try {
      const resp = await axios.patch(
        `${process.env.BACKEND_SERVER}/dashboard/radiususer`,
        { editedData },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access_token": access_token,
          },
        }
      );
      toast.success(resp.data.message);
    } catch (error) {
      setFormData(backup_form_data);
      toast.error(error.response.data.message);
    }
  };

  // handle button init payment history
  const handlePaymentHistoryInit = async () => {
    try {
      const resp = await axios.get(
        `${process.env.BACKEND_SERVER}/dashboard/payment-history/${queryID}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access_token": access_token,
          },
        }
      );

      set_payment_history(resp.data);
    } catch (error) {
      setFormData(backup_form_data);
      toast.error(error.response.data.message);
    }
  };

  // If return status code 200 Authorized
  if (data.status === 200) {
    const date_str = dayjs(data.data.user.expirydate).format(
      "DD-MM-YYYY HH:mm:ss WIB"
    );

    return (
      <>
        <LayoutCustomer></LayoutCustomer>
        <div className="page-wrapper">
          <div className="container-xl"></div>
          <div className="page-body">
            <div className="container-xl d-flex flex-column justify-content-center">
              <ToastContainer />
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title">User details</h1>
                </div>

                <div className="card-body">
                  <table className="table table-hover">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>Username</td>
                        <td>{data.data.user.username} </td>
                      </tr>
                      <tr>
                        <td>First Name</td>
                        <td>{data.data.user.first_name} </td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{data.data.user.last_name} </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{data.data.user.email} </td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{data.data.user.address} </td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{data.data.user.phone} </td>
                      </tr>
                      <tr>
                        <td>Service Name</td>
                        <td>{data.data.user?.services_id} </td>
                      </tr>
                      <tr>
                        <td>Service Status</td>
                        <td>{data.data.user.service_status} </td>
                      </tr>

                      <tr>
                        <td>Service Radius Group</td>
                        <td>{data.data.user?.radusergroup?.groupname}</td>
                      </tr>

                      <tr>
                        <td>Service Ammount</td>
                        <td>
                          IDR {data.data.user?.app_service?.service_ammount}
                        </td>
                      </tr>

                      <tr>
                        <td>Service Expiry Date</td>
                        <td>{date_str} </td>
                      </tr>
                    </tbody>
                  </table>
                  <Modal
                    modal_id="edit-data"
                    button_name="Edit Data"
                    modal_title="Edit Data"
                    modal_content={<EditUser data={data.data.user}></EditUser>}
                    onClickAction={() => handleSubmitEditUser()}
                  ></Modal>

                  <ModalNoFooter
                    modal_id="payment-history"
                    button_name="Payment History"
                    modal_title="Payment History"
                    modal_content={<PaymentHistory></PaymentHistory>}
                    button_init_click={handlePaymentHistoryInit}
                  ></ModalNoFooter>

                  <Modal
                    modal_id="generate-payment"
                    button_name="Generate Payment"
                    modal_title="Generate Payment"
                    modal_content={
                      <GeneratePayment
                        cid={queryID}
                        access_token={access_token}
                      ></GeneratePayment>
                    }
                  ></Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Get context. get req.query
// export async function getServerSideProps(context) {

//   const data = axios.post;
//   // Pass data to the page via props
//   return { props: { queryID: queryID } };
// }